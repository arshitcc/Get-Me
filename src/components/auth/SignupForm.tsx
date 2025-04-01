"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignupSchema, signupSchema } from "@/schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SignupForm() {
  const { isLoading, signup, error } = useUserStore();
  const router = useRouter();
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (error) {
      toast.error("Error", {
        description: error,
      });
    }
  }, [error, toast]);

  const handleSignupSubmit = async (data: SignupSchema) => {
    
    const { name, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      toast.error("Error", {
        description: "Passwords do not match",
      });
      return;
    }
    try {
      const res = await signup({ name, email, password });
      if (res) {
        toast.success("Success", {
          description: "Account created successfully. Please Login",
        });
        router.replace("/login");
      }
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong. Please try again",
      });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg p-6">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Get-Me</CardTitle>
        <CardDescription className="text-center">
          Create an account to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignupSubmit)}
            className="space-y-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) =>field.onChange(e.target.value)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.toLowerCase())}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    {...field}
                    onChange={(e) =>field.onChange(e.target.value)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full mt-4">
              {isLoading ? "Signing up..." : "Sign up"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="text-xs text-center text-white">
          Already a member?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
