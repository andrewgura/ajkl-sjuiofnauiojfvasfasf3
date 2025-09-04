"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Plane } from "lucide-react";
import { ForgotPasswordModal } from "./RecoveryModals";
import CreateAccountModal from "./CreateAccountModal";
import MaintenanceBanner from "./MaintenanceBanner";
import InformationPanels from "./InformationPanels";
import { AppBanner } from "@/components/AppBanner";
import {
  loginSchema,
  type LoginFormData
} from "@/lib/validation/auth-validate";

export default function LoginPage() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("root", {
          type: "manual",
          message: "Invalid email or password"
        });
      } else {
        // Successful login - redirect to dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError("root", {
        type: "manual",
        message: "An error occurred during login. Please try again."
      });
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden flex flex-col">
      {/* Header */}
      <AppBanner isLoginPage={true} />

      {/* Maintenance Banner */}
      <MaintenanceBanner />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-4">
        <div className="w-full max-w-7xl grid grid-cols-12 gap-6 items-start h-full">

          {/* Login Card */}
          <div className="col-span-5">
            <div className="bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-6">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Plane className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">Welcome Back</h2>
                <p className="text-blue-200">Sign in to access your dashboard</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label className="text-white text-sm font-medium mb-2 block">
                    Email Address <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className={`bg-white/5 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/30 h-10 ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/30' : ''
                      }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-300 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label className="text-white text-sm font-medium mb-2 block">
                    Password <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="Enter your password"
                    className={`bg-white/5 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/30 h-10 ${errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-400/30' : ''
                      }`}
                  />
                  {errors.password && (
                    <p className="text-xs text-red-300 mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Errors */}
                {errors.root && (
                  <div className="flex items-center p-3 bg-red-500/10 border border-red-400/20 rounded-lg text-red-200 text-sm">
                    <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{errors.root.message}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-10 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                <div className="flex flex-col space-y-2 pt-3 border-t border-white/10">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForgotPassword(true)}
                    className="w-full h-9 bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-white/30"
                  >
                    Forgot Password?
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateAccount(true)}
                    className="w-full h-9 bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-white/30"
                  >
                    Create Account
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Information Panels */}
          <div className="col-span-7">
            <InformationPanels />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ForgotPasswordModal
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
      />
      <CreateAccountModal
        open={showCreateAccount}
        onOpenChange={setShowCreateAccount}
      />
    </div>
  );
}