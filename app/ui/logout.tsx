"use client"

import { Button } from './button';
import useAuthStore from '@/app/store/auth-store';
import { useRouter } from 'next/navigation';
import pb from '@/app/lib/pocketbase';


export default function LogoutButton() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    pb.authStore.clear()
    logout();
    router.push('/');
  };

  return (
    <Button onClick={handleLogout}>
      Salir
    </Button>
  );
}