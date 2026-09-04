import { z } from "zod";
import type { User } from "./user";
import {
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    acceptInvitationSchema,
} from "@/schemas/auth.schema";

export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type AcceptInvitationFormData = z.infer<typeof acceptInvitationSchema>;

// Read-only data fetched from backend to display on the accept-invitation page.
// Not user input, so it stays separate from the Zod form schema.
export type InvitationDetails = {
    id: string;
    username: string;
    email: string;
    role: User["role"];
    expiresAt: string;
};

export type CurrentSession = {
    user: User;
    session: {
        id: string;
        expiresAt: string;
    };
};

// What actually gets POSTed to the backend: token (from URL) + password
// (from the form). Built manually in onSubmit, not inferred from the schema.
export type AcceptInvitationPayload = {
    token: string;
    password: string;
};