'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from './ui/Button';

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Button disabled>Loading...</Button>;
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          Signed in as {session.user?.email}
        </span>
        <Button onClick={() => signOut()} variant="outline">
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => signIn('google')}>
      Sign in with Google
    </Button>
  );
}
