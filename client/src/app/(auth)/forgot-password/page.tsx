// ForgotPasswordForm.tsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft, Truck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldLabel,
    FieldError,
    FieldGroup,
    FieldContent,
} from "@/components/ui/field";
import { forgotPasswordSchema } from "@/schemas/auth.schema";
import type { ForgotPasswordFormData } from "@/types/auth";

const ForgotPasswordForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true);
        try {
            // API call removed - replace with your logic
            console.log("Forgot password data:", data);
            reset();
        } catch (error) {
            console.error("Forgot password error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 h-full`}>
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
                        {/* Email Field */}
                        <Field orientation="vertical">
                            <FieldLabel htmlFor="email" className="text-xs sm:text-sm">
                                Email Address <span className="text-destructive">*</span>
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    className="h-9 sm:h-10 text-sm"
                                    {...register("email")}
                                    aria-invalid={errors.email ? "true" : "false"}
                                />
                                {errors.email && (
                                    <FieldError errors={[errors.email]} />
                                )}
                            </FieldContent>
                        </Field>

                        {/* Description Text */}
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Enter your email address and we&apos;ll send you a link to reset your password.
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
                                    Sending...
                                </>
                            ) : (
                                "Send Reset Link"
                            )}
                        </Button>
                    </FieldGroup>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;