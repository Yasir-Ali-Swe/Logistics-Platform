export const USER_ROLES = [
    "SUPER_ADMIN",
    "OPERATIONS_MANAGER",
    "FLEET_COORDINATOR",
    "HR_COMPLIANCE",
    "FINANCE_OFFICER",
    "FINANCE_APPROVER",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const USER_STATUSES = [
    "INVITED",
    "ACTIVE",
    "SUSPENDED",
    "DEACTIVATED",
] as const;

export type UserStatus = (typeof USER_STATUSES)[number];

export type User = {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
};