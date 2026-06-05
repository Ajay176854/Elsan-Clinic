"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, HeartPulse } from 'lucide-react';
import { loginSchema, type LoginFormData } from '../../schemas';
import { authService } from '../../services';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      await authService.login(data.email, data.password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-blue-600 p-3 rounded-full text-white mb-4 shadow-lg shadow-blue-200">
            <HeartPulse className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Elsan Clinic</h1>
          <p className="text-slate-500 mt-2">Management System Portal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
          <div className="space-y-1 text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
            <p className="text-slate-500 text-sm">Enter your email and password to sign in</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium leading-none text-slate-700">Email / Username</label>
              <input
                id="username"
                type="text"
                {...register('email')}
                placeholder="name@elsan.com"
                className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none text-slate-700">Password</label>
              <input
                id="password"
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 mt-4"
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
