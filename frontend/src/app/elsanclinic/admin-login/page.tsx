"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, ShieldAlert, ArrowLeft, KeyRound } from 'lucide-react';
import Link from 'next/link';
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { loginSchema, type LoginFormData } from '../../../schemas';
import { authService } from '../../../services';

export default function AdminLoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [customLoading, setCustomLoading] = useState(false);

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
    setCustomLoading(true);
    try {
      await authService.login(data.email, data.password);
      const user = await authService.getMe();
      
      // Admin Portal checks: SUPER_ADMIN or DIRECTOR
      if (['SUPER_ADMIN', 'DIRECTOR'].includes(user.role)) {
        queryClient.setQueryData(['user', 'me'], user);
        router.push('/elsanclinic/admin-dashboard');
      } else {
        await authService.logout();
        setError("Access denied: This portal is reserved for Administrators.");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid credentials. Please try again.');
    } finally {
      setCustomLoading(false);
    }
  };

  const loading = isSubmitting || customLoading;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-900 text-slate-100 p-4 font-sans relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-900 rounded-full blur-[140px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] bg-slate-800 rounded-full blur-[120px] opacity-40 pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto py-4 flex items-center justify-between z-10 relative">
        <Link href="/login" className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
          <ArrowLeft size={14} /> Back to Portals
        </Link>
      </header>

      {/* Form Container */}
      <div className="w-full max-w-md mx-auto z-10 relative my-auto">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-indigo-600 p-3.5 rounded-2xl text-white mb-4 shadow-xl shadow-indigo-900/50 border border-indigo-400/20">
            <KeyRound className="h-7 w-7 text-indigo-100" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-serif">Elsan Admin Portal</h1>
          <p className="text-slate-400 mt-2 text-sm font-medium tracking-wide uppercase">System Control Gateway</p>
        </div>

        <Card className="shadow-2xl shadow-indigo-950/50 border-white/5 bg-slate-950/80 backdrop-blur-xl">
          <CardHeader className="text-center pb-6 border-b border-white/5">
            <CardTitle className="text-xl font-bold text-white">Administrator Login</CardTitle>
            <CardDescription className="text-slate-400 text-xs mt-1">Enter your admin credentials to log into control center</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 text-red-400 text-xs p-3 rounded-lg border border-red-500/20 flex items-center gap-2 font-medium">
                  <ShieldAlert size={16} className="shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-300 font-medium">Admin Email / Username</Label>
                <Input
                  id="username"
                  type="text"
                  {...register('email')}
                  placeholder="admin@elsan.com"
                  className="bg-slate-900/80 border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-slate-300 font-medium">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder="••••••••"
                  className="bg-slate-900/80 border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11"
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Authorize & Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 border-t border-white/5 bg-slate-950/20 z-10">
        <p className="text-slate-500 text-[10px] uppercase tracking-widest font-semibold">
          Restricted Web Portal · Powered by ELSAN AI
        </p>
      </footer>
    </div>
  );
}
