import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB  from "@/lib/db";
import { User } from "@/models/users.model";
import { User as NextUser } from "next-auth";
import bcrypt from "bcrypt";

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<NextUser | null> {
        await connectDB();

        try {
          const user = await User.findOne({
            email: credentials?.email || "",
          });
          if (!user) {
            throw new Error("User not found");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials?.password || "",
            user.password
          );
          if (isPasswordCorrect) {
            return user as unknown as NextUser;
          } else {
            throw new Error("Wrong Password");
          }
        } catch (error: unknown) {
          throw new Error((error as { message: string })?.message || "");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
    async signIn({ account, profile, user }) {
      await connectDB();
      if (account?.provider === "credentials" && user) return true;
      return false;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(AuthOptions);