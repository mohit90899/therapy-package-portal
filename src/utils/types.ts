
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
  participants?: "individual" | "couple" | "family" | "custom"; // Session participant type
  participantDetails?: string; // Custom description of who should attend
}

export interface PackageTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  suggestedSessions: number;
  defaultSessionDetails: TherapySession[];
  samplePrice: number;
  tags: string[];
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
  // New fields based on requirements
  languages: string[]; // Languages package can be conducted in
  mode: "video" | "audio+video"; // Session mode
  category: string; // Package category (pre-wedding, job prep, etc.)
  maxParticipants: number; // Maximum participants per session
  files?: {
    title: string;
    url: string;
    type: "pdf" | "video" | "image" | "link";
  }[];
  // Commission tracking
  platformFeePercentage?: number; // Default 35%
  therapistEarnings?: number; // Calculated amount after commission
  platformEarnings?: number; // Commission amount
  // Analytics
  viewCount?: number;
  saveCount?: number;
  soldCount?: number;
  averageRating?: number;
  reviewCount?: number;
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
  participants?: string[]; // Array of user IDs who should attend this session
  participantType?: "individual" | "couple" | "family" | "custom";
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
  positivtyAgent?: string; // Agent who recommended the package
  // Commission tracking
  platformFee: number; // 35% commission
  therapistEarnings: number; // Amount after commission
  platformEarnings: number; // Commission amount
}

// New B2C booking type for pay-per-session
export interface B2CBooking {
  id: string;
  clientId: string;
  therapistId: string;
  therapistName: string;
  sessionTitle: string;
  sessionDescription?: string;
  duration: number; // in minutes
  price: number;
  scheduledDate: string;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  zoomLink?: string;
  recordingUrl?: string;
  notes?: string;
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: string;
  updatedAt: string;
  // Commission tracking
  platformFee: number; // 35% commission
  therapistEarnings: number; // Amount after commission
  platformEarnings: number; // Commission amount
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
  // Commission tracking
  totalPlatformEarnings: number;
  totalTherapistPayouts: number;
  averageCommissionRate: number;
  // New analytics
  packagesCreatedThisMonth: number;
  therapistsWithPackages: number;
  therapistsWithoutPackages: number;
  packagesByCategory: { [key: string]: number };
  packagePopularity: {
    mostViewed: string[];
    mostSaved: string[];
    bestSelling: string[];
  };
  troubleTickets: {
    open: number;
    inProgress: number;
    resolved: number;
  };
}
