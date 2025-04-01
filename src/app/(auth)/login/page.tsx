import LoginForm from "@/components/auth/LoginForm";
import React from "react";

function page() {
  return (
    <div>
      <main className="flex min-h-screen items-center justify-center bg-background p-4">
        <LoginForm />
      </main>
    </div>
  );
}

export default page;
