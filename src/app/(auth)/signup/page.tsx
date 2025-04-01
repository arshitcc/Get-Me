import SignupForm from '@/components/auth/SignupForm'
import React from 'react'

function page() {
  return (
    <div>
        <main className="flex min-h-screen items-center justify-center bg-background p-4">
          <SignupForm/>
        </main>
    </div>
  )
}

export default page