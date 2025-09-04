"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { initiatePasswordReset } from "@/lib/actions/auth/password-reset-actions";
import { Mail, CheckCircle2, AlertTriangle } from "lucide-react";

interface RecoveryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface RecoveryFormProps {
  title: string;
  inputLabel: string;
  inputType: "email" | "text";
  inputPlaceholder: string;
  description: string;
  submitText: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  error?: string;
  success?: string;
}

function RecoveryForm({
  title,
  inputLabel,
  inputType,
  inputPlaceholder,
  description,
  submitText,
  value,
  onChange,
  onSubmit,
  onCancel,
  isSubmitting = false,
  error,
  success,
}: RecoveryFormProps) {
  return (
    <DialogContent className="sm:max-w-md bg-slate-900/95 backdrop-blur-xl border border-white/20 shadow-2xl">
      <DialogHeader>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <DialogTitle className="text-xl text-white font-semibold">
              {title}
            </DialogTitle>
          </div>
        </div>
        <DialogDescription className="text-sm text-blue-200/80">
          {description}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={onSubmit}>
        <div className="space-y-4 py-4">
          {error && (
            <div className="flex items-center p-3 bg-red-500/10 border border-red-400/20 rounded-lg text-red-200 text-sm">
              <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center p-3 bg-green-500/10 border border-green-400/20 rounded-lg text-green-200 text-sm">
              <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" />
              {success}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              {inputLabel}
            </label>
            <input
              type={inputType}
              required
              placeholder={inputPlaceholder}
              value={value}
              onChange={onChange}
              disabled={isSubmitting}
              className="w-full bg-white/5 border border-white/20 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-blue-400/30 h-10 px-3 rounded-lg focus:outline-none focus:ring-2"
            />
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-10 px-4 bg-white border-white/20 text-black hover:border-white/30"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={`h-10 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg transition-all duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </div>
            ) : (
              submitText
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export function ForgotPasswordModal({ open, onOpenChange }: RecoveryModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append('email', email);

      const result = await initiatePasswordReset(formData);

      if (result.success) {
        setSuccess(result.message || "Password reset instructions sent to your email.");
        setEmail("");
        // Close modal after a brief delay
        setTimeout(() => {
          onOpenChange(false);
          setSuccess("");
        }, 2000);
      } else {
        setError(result.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Password reset error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear errors when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleCancel = () => {
    onOpenChange(false);
    setEmail("");
    setError("");
    setSuccess("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <RecoveryForm
        title="Reset Password"
        inputLabel="Email Address"
        inputType="email"
        inputPlaceholder="Enter your email address"
        description="Enter your email and we'll send password reset instructions to your email address."
        submitText="Send Reset Link"
        value={email}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        error={error}
        success={success}
      />
    </Dialog>
  );
}