// ResetPasswordForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { Eye, EyeOff, Truck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast"
import {
    Field,
    FieldLabel,
    FieldError,
    FieldGroup,
    FieldContent,
} from "@/components/ui/field";
import { resetPasswordSchema } from "@/schemas/auth.schema";
import type { ResetPasswordFormData } from "@/types/auth";

const ResetPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const password = watch("password");

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!token) {
            setError("Reset token is missing. Please use the link from your email.");
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            // TODO: replace with real API call
            // const response = await fetch("/api/auth/reset-password", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ token, password: data.password }),
            // });
            // if (!response.ok) throw new Error("Failed to reset password");

            console.log("Reset password data:", { token, password: data.password });
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.add({
                type: "success",
                title: "Password Reset",
                description: "Your password has been successfully reset.",
            })

            reset();
            router.push("/login");
        } catch (err) {
            console.error("Reset password error:", err);
            setError("Failed to reset password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 h-full">
            <div className="w-full max-w-md mx-auto">
                {/* Header - Centered */}
                <div className="text-center mb-6 lg:mb-8">
                    <div className="flex items-center justify-center gap-3 mb-1">
                        <Truck className="size-8 sm:size-9 text-primary" />
                        <h1 className="text-xl sm:text-2xl font-bold text-foreground">FleetFlow</h1>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground font-medium">
                        Logistics & Courier Operations Management Platform
                    </p>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup className="space-y-2.5 lg:space-y-3">
                        {error && (
                            <p className="text-sm text-destructive text-center">{error}</p>
                        )}

                        {/* New Password Field */}
                        <Field orientation="vertical">
                            <FieldLabel htmlFor="password" className="text-xs sm:text-sm">
                                New Password <span className="text-destructive">*</span>
                            </FieldLabel>
                            <FieldContent>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="••••••"
                                        className="h-9 sm:h-10 pr-10 text-sm"
                                        {...register("password")}
                                        aria-invalid={errors.password ? "true" : "false"}
                                    />
                                    <button
                                        type="button"
                                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                                        onClick={() => setShowNewPassword((prev) => !prev)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 
                             min-h-6 min-w-6 flex items-center justify-center
                             text-muted-foreground hover:text-foreground transition-colors
                             focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
                                    >
                                        {showNewPassword ? (
                                            <EyeOff size={18} className="sm:size-5" />
                                        ) : (
                                            <Eye size={18} className="sm:size-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <FieldError errors={[errors.password]} />
                                )}
                            </FieldContent>
                        </Field>

                        {/* Confirm Password Field */}
                        <Field orientation="vertical">
                            <FieldLabel htmlFor="confirmPassword" className="text-xs sm:text-sm">
                                Confirm Password <span className="text-destructive">*</span>
                            </FieldLabel>
                            <FieldContent>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••"
                                        className="h-9 sm:h-10 pr-10 text-sm"
                                        {...register("confirmPassword")}
                                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                                    />
                                    <button
                                        type="button"
                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 
                             min-h-6 min-w-6 flex items-center justify-center
                             text-muted-foreground hover:text-foreground transition-colors
                             focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={18} className="sm:size-5" />
                                        ) : (
                                            <Eye size={18} className="sm:size-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <FieldError errors={[errors.confirmPassword]} />
                                )}
                            </FieldContent>
                        </Field>
                        {/* Description Text */}
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Enter your new password. It must be at least 6 characters long.
                        </p>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-9 sm:h-10 text-sm mt-1"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                    Resetting...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </Button>
                    </FieldGroup>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;