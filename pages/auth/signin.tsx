'use client'

import { signIn, getProviders } from 'next-auth/react'
import { Button } from '../../components/ui/Button'

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Sign in to NovagenAI
          </h2>
          <p className="text-gray-600 mb-8">
            Access your AI-powered creative suite
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <Button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full"
          >
            Sign in with Google
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            By signing in, you agree to our terms and privacy policy.
          </p>
        </div>
      </div>
    </div>
  )
}
