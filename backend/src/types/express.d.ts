import type { UserRole } from "../modules/auth/auth.service";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: UserRole;
        name: string;
        phone: string | null;
        isVerified: boolean;
        isActive: boolean;
      };
    }
  }
}

export {};
