
export type UserRole = "client" | "therapist" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  bio?: string;
  specialties?: string[];
  phone?: string;
  address?: string;
}

export type PackageStatus = "draft" | "pending" | "approved" | "rejected";

export interface TherapySession {
  duration: number; // in minutes (required field)
  title?: string;
  description?: string;
  completed?: boolean;
  scheduled?: boolean;
  scheduledDate?: string;
  zoomLink?: string;
  recordingUrl?: string;
  notes?: string;
  sessionIndex?: number; // Track which session this is in the package
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
  benefits?: string[]; // Added for package benefits
}

export interface SessionCredit {
  id: string;
  bookingId: string;
  packageId: string;
  sessionIndex: number;
  status: "available" | "scheduled" | "completed" | "cancelled";
  scheduledDate?: string;
  therapistId: string;
  duration: number;
  title?: string;
  description?: string;
  zoomLink?: string;
  recordingUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  packageId: string;
  packageTitle: string;
  clientId: string;
  therapistId: string;
  therapistName: string;
  purchaseDate: string;
  totalSessions: number;
  usedSessions: number;
  remainingSessions: number;
  expiryDate: string;
  status: "active" | "completed" | "expired";
  voucherCode?: string;
  voucherDiscount?: number;
  sessionCredits: SessionCredit[]; // Track individual session credits
  totalAmount: number;
  finalAmount: number; // After voucher discount
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
  id: string;
  code: string;
  discount: number; // Percentage discount
  expiryDate?: string;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  description?: string;
  minAmount?: number; // Minimum order amount to apply voucher
}

export interface ZoomMeeting {
  id: string;
  topic: string;
  startTime: string;
  duration: number;
  joinUrl: string;
  password: string;
  sessionId: string;
}

export interface NotificationSettings {
  bookingConfirmation: boolean;
  sessionReminder: boolean;
  sessionCompletion: boolean;
  packageExpiry: boolean;
  newPackages: boolean;
}

export interface AdminStats {
  totalBookings: number;
  activePackages: number;
  totalRevenue: number;
  completedSessions: number;
  pendingApprovals: number;
}
