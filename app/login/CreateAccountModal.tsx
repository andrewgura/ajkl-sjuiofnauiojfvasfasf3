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
import { Section } from "@/components/shared/Section";
import InfoAlert from "@/components/shared/InfoAlert";
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
    setError,
    reset,
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: CreateAccountFormData) => {
    setIsSubmitting(true);

    try {
      // Pass the complete form data to createUserAccount
      const result = await createUserAccount(data);

      if (result.success) {
        reset();

        handleClose();

        toast.success("Account created succesfully! Check your email to verify your account.")
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
      <DialogContent className="max-w-4xl bg-slate-900/95 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col p-0 rounded-lg">
        <DialogHeader className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm border-b border-white/10 px-6 py-3 flex-shrink-0">
          <DialogTitle className="text-lg font-semibold text-white">
            Create New Account
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
          <div className="px-6 py-3 flex-1 overflow-y-auto space-y-3">
            <InfoAlert
              title={
                <>
                  Fields marked with a <span className="text-red-400">*</span>{" "}
                  are required. You will receive an email to verify your account.
                </>
              }
              variant="blue"
            />

            {/* Personal Information Section */}
            <Section title="Personal Information" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFInput
                  label="First Name"
                  register={register("firstName")}
                  error={errors.firstName}
                  required
                  placeholder="Enter first name"
                  autoComplete="given-name"
                  className="col-span-1"
                  labelStyle="text-white"
                />

                <RHFInput
                  label="Middle Name"
                  register={register("middleName")}
                  error={errors.middleName}
                  placeholder="Enter middle name (optional)"
                  autoComplete="additional-name"
                  className="col-span-1"
                  labelStyle="text-white"
                />

                <RHFInput
                  label="Last Name"
                  register={register("lastName")}
                  error={errors.lastName}
                  required
                  placeholder="Enter last name"
                  autoComplete="family-name"
                  className="col-span-1"
                  labelStyle="text-white"
                />
              </div>
            </Section>

            {/* Contact Information Section */}
            <Section title="Contact Information" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFInput
                  label="Primary Email"
                  register={register("primaryEmail")}
                  error={errors.primaryEmail}
                  type="email"
                  required
                  placeholder="Enter primary email"
                  autoComplete="email"
                  className="col-span-1"
                  labelStyle="text-white"
                />

                <RHFInput
                  label="Secondary Email"
                  register={register("secondaryEmail")}
                  error={errors.secondaryEmail}
                  type="email"
                  placeholder="Enter secondary email (optional)"
                  className="col-span-1"
                  labelStyle="text-white"
                />

                <RHFInput
                  label="Mobile Phone"
                  register={register("mobilePhone")}
                  error={errors.mobilePhone}
                  type="tel"
                  placeholder="Enter mobile phone (optional)"
                  autoComplete="mobile tel"
                  className="col-span-1"
                  labelStyle="text-white"
                />

                <RHFInput
                  label="Work Phone"
                  register={register("workPhone")}
                  error={errors.workPhone}
                  type="tel"
                  placeholder="Enter work phone (optional)"
                  autoComplete="work tel"
                  className="col-span-1"
                  labelStyle="text-white"
                />
              </div>
            </Section>

            {/* Security Information Section */}
            <Section title="Security Information" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFInput
                  label="Password"
                  register={register("password")}
                  error={errors.password}
                  type="password"
                  required
                  placeholder="Enter password"
                  autoComplete="new-password"
                  className="col-span-1"
                  labelStyle="text-white"
                />

                <RHFInput
                  label="Confirm Password"
                  register={register("confirmPassword")}
                  error={errors.confirmPassword}
                  type="password"
                  required
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  className="col-span-1"
                  labelStyle="text-white"
                />
              </div>
            </Section>
          </div>

          {/* Footer */}
          <DialogFooter className="px-6 py-3 border-t border-white/10 bg-slate-900/50 backdrop-blur-sm flex-shrink-0 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-sm text-white ${isSubmitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}