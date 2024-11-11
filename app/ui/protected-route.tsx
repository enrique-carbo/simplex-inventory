"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuthStore from '@/app/store/auth-store';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}