'use client';

import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import AuthButton from '../components/AuthButton';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to NovagenAI
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered creative suite for presentations, images, and content generation
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <AuthButton />
        </div>

        {session && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Slides Generator</h2>
              <p className="text-gray-600">Create professional presentations with AI</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Image Studio</h2>
              <p className="text-gray-600">Enhance images with AI</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Content Creator</h2>
              <p className="text-gray-600">Generate content with AI</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
