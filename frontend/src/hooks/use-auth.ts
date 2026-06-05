import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '../services';

export function useUser() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: authService.getMe,
    retry: false,
  });
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: () => {
      router.push('/admin');
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return () => {
    authService.logout();
    queryClient.clear();
    router.push('/');
  };
}
