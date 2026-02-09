'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface AppProps {
  children: ReactNode;
  session?: any;
}

export default function App({ children, session }: AppProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
