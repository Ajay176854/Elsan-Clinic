"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    const shouldMute = args.some(arg => {
      const str = String(arg);
      return str.includes('fdprocessedid') || str.includes('hydration-mismatch');
    });
    if (shouldMute) return;
    originalError(...args);
  };
}

import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
