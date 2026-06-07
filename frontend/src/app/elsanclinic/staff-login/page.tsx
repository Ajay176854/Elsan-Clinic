"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, ShieldAlert, ArrowLeft, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { loginSchema, type LoginFormData } from '../../../schemas';
import { authService } from '../../../services';

export default function StaffLoginPage() {
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
      
      // Staff Portal checks: RECEPTIONIST, NURSE, ANALYST, PHARMACY
      if (['RECEPTIONIST', 'NURSE', 'ANALYST', 'PHARMACY'].includes(user.role)) {
        queryClient.setQueryData(['user', 'me'], user);
        router.push('/elsanclinic/staff-dashboard');
      } else {
        await authService.logout();
        setError("Access denied: This portal is reserved for Clinic Staff.");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid credentials. Please try again.');
    } finally {
      setCustomLoading(false);
    }
  };

  const loading = isSubmitting || customLoading;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 p-4 font-sans relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto py-4 flex items-center justify-between z-10 relative">
        <Link href="/login" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-950 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-150 shadow-sm">
          <ArrowLeft size={14} /> Back to Portals
        </Link>
      </header>

      {/* Form Container */}
      <div className="w-full max-w-md mx-auto z-10 relative my-auto">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-sky-600 p-3.5 rounded-2xl text-white mb-4 shadow-xl shadow-sky-100 border border-sky-400/20">
            <ClipboardList className="h-7 w-7 text-sky-50" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-serif">Elsan Staff Portal</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium tracking-wide uppercase">Desk & Nurse Station</p>
        </div>

        <Card className="shadow-2xl shadow-slate-200/60 border-slate-150 bg-white/95 backdrop-blur-xl">
          <CardHeader className="text-center pb-6 border-b border-slate-100">
            <CardTitle className="text-xl font-bold text-slate-800">Staff Sign In</CardTitle>
            <CardDescription className="text-slate-500 text-xs mt-1">Enter your receptionist or nurse credentials to proceed</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 flex items-center gap-2 font-medium">
                  <ShieldAlert size={16} className="shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-700 font-medium">Staff Email / Username</Label>
                <Input
                  id="username"
                  type="text"
                  {...register('email')}
                  placeholder="reception@elsan.com"
                  className="bg-white border-slate-250 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500/20 transition-all h-11"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder="••••••••"
                  className="bg-white border-slate-250 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500/20 transition-all h-11"
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-sky-600 hover:bg-sky-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-sky-600/10 transition-all duration-300"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign In to Station
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 border-t border-slate-100 bg-white/20 z-10">
        <p className="text-slate-400 text-[10px] uppercase tracking-widest font-semibold">
          Clinic Staff Gate · Secure Patient Care Portal
        </p>
      </footer>
    </div>
  );
}
