
export type UserRole = "client" | "therapist" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

export type PackageStatus = "draft" | "pending" | "approved" | "rejected";

export interface TherapyPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number; // in minutes
  sessions: number;
  therapistId: string;
  therapistName: string;
  status: PackageStatus;
  createdAt: string;
  updatedAt: string;
  image?: string;
  tags?: string[];
}

export interface Booking {
  id: string;
  packageId: string;
  clientId: string;
  purchaseDate: string;
  sessionsRemaining: number;
  expiryDate: string;
  status: "active" | "completed" | "expired";
}

export interface Session {
  id: string;
  bookingId: string;
  date: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}
