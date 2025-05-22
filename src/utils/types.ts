
export type UserRole = "client" | "therapist" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

export type PackageStatus = "draft" | "pending" | "approved" | "rejected";

export interface TherapySession {
  duration: number; // in minutes
  title?: string;
  description?: string;
}

export interface TherapyPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  sessions: number;
  sessionDetails: TherapySession[]; // Details for each session
  therapistId: string;
  therapistName: string;
  status: PackageStatus;
  createdAt: string;
  updatedAt: string;
  image?: string;
  tags?: string[];
  termsAndConditions?: string;
  documents?: {
    title: string;
    url: string;
  }[];
}

export interface Booking {
  id: string;
  packageId: string;
  clientId: string;
  purchaseDate: string;
  sessionsRemaining: number;
  expiryDate: string;
  status: "active" | "completed" | "expired";
  voucherCode?: string;
  voucherDiscount?: number;
}

export interface Session {
  id: string;
  bookingId: string;
  packageId: string;
  date: string;
  status: "available" | "scheduled" | "completed" | "cancelled";
  notes?: string;
  recordingUrl?: string;
}

export interface Voucher {
  code: string;
  discount: number; // Percentage discount
  expiryDate?: string;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
}
