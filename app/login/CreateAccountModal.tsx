import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RHFInput } from "@/components/shared/RHFInput";
import { createUserAccount } from "@/lib/actions/auth/auth-actions";
import {
  createAccountSchema,
  type CreateAccountFormData
} from "@/lib/validation/auth-validate";
import toast from "react-hot-toast";

interface CreateAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateAccountModal({
  open,
  onOpenChange,
}: CreateAccountModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: CreateAccountFormData) => {
    setIsSubmitting(true);

    try {
      const result = await createUserAccount(data);

      if (result.success) {
        reset();
        handleClose();
        toast.success("Account created successfully! Check your email to verify your account.")
      }
    } catch (error) {
      console.error("Account creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl bg-slate-900/95 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col p-0 rounded-2xl">
        <DialogHeader className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex-shrink-0 rounded-t-2xl">
          <DialogTitle className="text-xl font-bold text-white">
            Create New Account
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
          <div className="px-6 py-4 flex-1 overflow-y-auto space-y-6">

            {/* Info Alert */}
            <div className="flex items-start p-3 bg-blue-500/10 border border-blue-400/20 rounded-lg text-blue-200 text-sm">
              <div className="w-4 h-4 rounded-full bg-blue-400 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div>
                Fields marked with a <span className="text-red-400">*</span> are required.
                You will receive an email to verify your account.
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <div className="border-l-4 border-blue-400 pl-3">
                <h3 className="text-white font-medium">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFInput
                  label="First Name"
                  register={register("firstName")}
                  error={errors.firstName}
                  required
                  placeholder="Enter first name"
                  autoComplete="given-name"
                />

                <RHFInput
                  label="Middle Name"
                  register={register("middleName")}
                  error={errors.middleName}
                  placeholder="Enter middle name (optional)"
                  autoComplete="additional-name"
                />
              </div>

              <RHFInput
                label="Last Name"
                register={register("lastName")}
                error={errors.lastName}
                required
                placeholder="Enter last name"
                autoComplete="family-name"
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="border-l-4 border-blue-400 pl-3">
                <h3 className="text-white font-medium">Contact Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFInput
                  label="Primary Email"
                  register={register("primaryEmail")}
                  error={errors.primaryEmail}
                  required
                  type="email"
                  placeholder="Enter primary email"
                  autoComplete="email"
                />

                <RHFInput
                  label="Secondary Email"
                  register={register("secondaryEmail")}
                  error={errors.secondaryEmail}
                  type="email"
                  placeholder="Enter secondary email (optional)"
                  autoComplete="email"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFInput
                  label="Mobile Phone"
                  register={register("mobilePhone")}
                  error={errors.mobilePhone}
                  type="tel"
                  placeholder="Enter mobile phone (optional)"
                  autoComplete="tel"
                />

                <RHFInput
                  label="Work Phone"
                  register={register("workPhone")}
                  error={errors.workPhone}
                  type="tel"
                  placeholder="Enter work phone (optional)"
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Security Information */}
            <div className="space-y-4">
              <div className="border-l-4 border-blue-400 pl-3">
                <h3 className="text-white font-medium">Security Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFInput
                  label="Password"
                  register={register("password")}
                  error={errors.password}
                  type="password"
                  required
                  placeholder="Enter password"
                  autoComplete="new-password"
                />

                <RHFInput
                  label="Confirm Password"
                  register={register("confirmPassword")}
                  error={errors.confirmPassword}
                  type="password"
                  required
                  placeholder="Confirm password"
                  autoComplete="new-password"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="px-6 py-4 border-t border-white/10 flex-shrink-0 flex justify-end space-x-3 rounded-b-2xl">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}