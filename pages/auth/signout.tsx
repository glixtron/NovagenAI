import { signOut } from 'next-auth/react'

export default function SignOut() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Signing out...
        </h2>
        <p className="text-gray-600">
          You will be redirected to the home page.
        </p>
      </div>
    </div>
  )
}
