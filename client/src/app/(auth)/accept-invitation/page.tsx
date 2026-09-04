"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Truck, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import {
    Field,
    FieldLabel,
    FieldError,
    FieldGroup,
    FieldContent,
} from "@/components/ui/field";
import { acceptInvitationSchema } from "@/schemas/auth.schema";
import type {
    AcceptInvitationFormData,
    InvitationDetails,
    AcceptInvitationPayload,
} from "@/types/auth";
import type { UserRole } from "@/types/user";

const AcceptInvitationPage = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDetails, setIsLoadingDetails] = useState(true);
    const [invitationDetails, setInvitationDetails] = useState<InvitationDetails | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AcceptInvitationFormData>({
        resolver: zodResolver(acceptInvitationSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        let isActive = true;

        const fetchInvitationDetails = async () => {
            if (!token) {
                if (isActive) {
                    setError("This invitation link is missing a token.");
                    setIsLoadingDetails(false);
                }
                return;
            }

            try {
                // TODO: replace with real API call
                // const response = await fetch(`/api/auth/invitation?token=${token}`);
                // if (!response.ok) throw new Error("Invalid or expired invitation");
                // const data: InvitationDetails = await response.json();
                await new Promise((resolve) => setTimeout(resolve, 800));

                const mockData: InvitationDetails = {
                    id: "inv_123",
                    username: "Yasir Ali",
                    email: "yasir@example.com",
                    role: "FINANCE_OFFICER" as UserRole,
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                };

                if (isActive) {
                    setInvitationDetails(mockData);
                    setError(null);
                }
            } catch (err) {
                if (isActive) {
                    setError("Failed to load invitation details. Please try again.");
                    console.error("Error fetching invitation details:", err);
                }
            } finally {
                if (isActive) {
                    setIsLoadingDetails(false);
                }
            }
        };

        fetchInvitationDetails();

        return () => {
            isActive = false;
        };
    }, [token]);

    const onSubmit = async (data: AcceptInvitationFormData) => {
        if (!token) {
            setError("This invitation link is missing a token.");
            return;
        }

        setIsLoading(true);
        try {
            const payload: AcceptInvitationPayload = {
                token,
                password: data.password,
            };

            // TODO: replace with real API call
            // const response = await fetch("/api/auth/accept-invitation", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(payload),
            // });
            // if (!response.ok) throw new Error("Failed to accept invitation");

            console.log("Accept invitation payload:", payload);
            await new Promise((resolve) => setTimeout(resolve, 1200));
            toast.add({
                type: "success",
                title: "Invitation Accepted",
                description: "Your account has been activated. You can now log in.",
            });
            reset();
            router.push("/login");
        } catch (err) {
            console.error("Accept invitation error:", err);
            setError("Failed to accept invitation. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Loading state
    if (isLoadingDetails) {
        return (
            <div className="flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 h-full">
                <div className="w-full max-w-md mx-auto text-center">
                    <Loader2 className="size-10 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Loading invitation details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !invitationDetails) {
        return (
            <div className="flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 h-full">
                <div className="w-full max-w-md mx-auto text-center">
                    <div className="flex items-center justify-center mb-4">
                        <AlertCircle className="size-12 text-destructive" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Invalid Invitation</h2>
                    <p className="text-sm text-muted-foreground mb-6">
                        {error || "This invitation link is invalid or has expired."}
                    </p>
                    <Link href="/login" className="text-sm text-primary hover:underline">
                        Return to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 w-full">
            <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-3">
                    <div className="flex items-center justify-center gap-3 mb-1">
                        <Truck className="size-8 sm:size-9 text-primary" />
                        <h1 className="text-xl sm:text-2xl font-bold text-foreground">FleetFlow</h1>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium">
                        <CheckCircle className="size-4 text-green-500" />
                        <span>You&apos;ve Been Invited</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup className="space-y-2.5">
                        <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
                            <Field orientation="vertical">
                                <FieldLabel htmlFor="username" className="text-xs sm:text-sm">
                                    Username
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        id="username"
                                        value={invitationDetails.username}
                                        disabled
                                        readOnly
                                        className="h-9 sm:h-10 text-sm bg-muted/50 cursor-not-allowed opacity-80"
                                    />
                                </FieldContent>
                            </Field>
                            <Field orientation="vertical">
                                <FieldLabel htmlFor="role" className="text-xs sm:text-sm">
                                    Role
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        id="role"
                                        value={invitationDetails.role}
                                        disabled
                                        readOnly
                                        className="h-9 sm:h-10 text-sm bg-muted/50 cursor-not-allowed opacity-80"
                                    />
                                </FieldContent>
                            </Field>
                        </div>

                        <Field orientation="vertical">
                            <FieldLabel htmlFor="email" className="text-xs sm:text-sm">
                                Email
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    id="email"
                                    value={invitationDetails.email}
                                    disabled
                                    readOnly
                                    className="h-9 sm:h-10 text-sm bg-muted/50 cursor-not-allowed opacity-80"
                                />
                            </FieldContent>
                        </Field>

                        <Field orientation="vertical">
                            <FieldLabel htmlFor="newPassword" className="text-xs sm:text-sm">
                                Create Password <span className="text-destructive">*</span>
                            </FieldLabel>
                            <FieldContent>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
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
                                {errors.password && <FieldError errors={[errors.password]} />}
                            </FieldContent>
                        </Field>

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
                                {errors.confirmPassword && <FieldError errors={[errors.confirmPassword]} />}
                            </FieldContent>
                        </Field>
                        <Button type="submit" className="w-full h-9 sm:h-10 text-sm" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                    Activating...
                                </>
                            ) : (
                                "Accept Invitation"
                            )}
                        </Button>
                    </FieldGroup>
                </form>
            </div>
        </div>
    );
};

export default AcceptInvitationPage;