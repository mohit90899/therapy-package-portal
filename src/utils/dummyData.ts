
import { TherapyPackage, User, UserRole, Booking } from "./types";

export const currentUser: User = {
  id: "user123",
  name: "Sarah Johnson",
  email: "sarah@example.com",
  role: "therapist" as UserRole,
  profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&dpr=2",
  bio: "Licensed therapist with over 10 years of experience in cognitive behavioral therapy.",
  specialties: ["Anxiety", "Depression", "Stress Management"],
  phone: "555-123-4567"
};

export const dummyUsers: User[] = [
  currentUser,
  {
    id: "user456",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "client",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&dpr=2"
  },
  {
    id: "user789",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "admin",
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=250&dpr=2"
  }
];

export const dummyPackages: TherapyPackage[] = [
  {
    id: "pkg001",
    title: "Pre-Wedding Therapy Package",
    description: "Navigate pre-wedding stress and build communication skills with your partner. Perfect for couples preparing for marriage.",
    price: 15000,
    sessions: 6,
    sessionDetails: [
      { duration: 60, title: "Initial Assessment", description: "Getting to know you and your partner" },
      { duration: 45, title: "Communication Styles", description: "Identifying and improving communication patterns" },
      { duration: 45, title: "Conflict Resolution", description: "Learning healthy conflict resolution skills" },
      { duration: 60, title: "Family Dynamics", description: "Addressing family dynamics and expectations" },
      { duration: 45, title: "Financial Planning", description: "Discussing financial goals and concerns" },
      { duration: 60, title: "Future Planning", description: "Creating a shared vision for your future" }
    ],
    therapistId: "user123",
    therapistName: "Sarah Johnson",
    status: "approved",
    createdAt: "2023-04-15T10:30:00Z",
    updatedAt: "2023-04-17T14:20:00Z",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500",
    tags: ["Couples", "Marriage", "Communication"],
    // Commission tracking
    platformFeePercentage: 35,
    therapistEarnings: 9750, // 65% of 15000
    platformEarnings: 5250 // 35% of 15000
  },
  {
    id: "pkg002",
    title: "Job Interview Preparation",
    description: "Build confidence and reduce anxiety for upcoming job interviews with focused therapy sessions.",
    price: 8000,
    sessions: 3,
    sessionDetails: [
      { duration: 60, title: "Anxiety Assessment", description: "Understanding your career goals and interview fears" },
      { duration: 60, title: "Confidence Building", description: "Techniques to boost confidence and self-presentation" },
      { duration: 60, title: "Mock Interviews", description: "Practice interviews with real-time feedback" }
    ],
    therapistId: "user123",
    therapistName: "Sarah Johnson",
    status: "approved",
    createdAt: "2023-05-20T09:15:00Z",
    updatedAt: "2023-05-21T11:40:00Z",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500",
    tags: ["Career", "Anxiety", "Confidence"],
    // Commission tracking
    platformFeePercentage: 35,
    therapistEarnings: 5200, // 65% of 8000
    platformEarnings: 2800 // 35% of 8000
  },
  {
    id: "pkg003",
    title: "Parenting Support Package",
    description: "Get guidance and support through the challenges of parenting with therapist-led sessions.",
    price: 12000,
    sessions: 4,
    sessionDetails: [
      { duration: 60, title: "Parenting Styles Assessment", description: "Understanding your parenting style and challenges" },
      { duration: 60, title: "Effective Communication", description: "Communicating effectively with children" },
      { duration: 60, title: "Setting Boundaries", description: "Learning to set healthy boundaries" },
      { duration: 60, title: "Self-Care for Parents", description: "Maintaining your wellbeing while parenting" }
    ],
    therapistId: "user456",
    therapistName: "Michael Brown",
    status: "pending",
    createdAt: "2023-06-10T13:45:00Z",
    updatedAt: "2023-06-11T09:30:00Z",
    image: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=500",
    tags: ["Parenting", "Family", "Children"],
    // Commission tracking
    platformFeePercentage: 35,
    therapistEarnings: 7800, // 65% of 12000
    platformEarnings: 4200 // 35% of 12000
  }
];

export const dummyBookings: Booking[] = [
  {
    id: "book001",
    packageId: "pkg001",
    packageTitle: "Pre-Wedding Therapy Package",
    clientId: "user456",
    therapistId: "user123",
    therapistName: "Sarah Johnson",
    purchaseDate: "2023-05-01T09:00:00Z",
    totalSessions: 6,
    usedSessions: 2,
    remainingSessions: 4,
    expiryDate: "2023-12-01T09:00:00Z",
    status: "active",
    totalAmount: 15000,
    finalAmount: 13500,
    voucherCode: "WELCOME10",
    voucherDiscount: 10,
    // Commission tracking
    platformFee: 4725, // 35% of 13500
    therapistEarnings: 8775, // 65% of 13500
    platformEarnings: 4725, // Same as platform fee
    sessionCredits: [
      {
        id: "credit1",
        bookingId: "book001",
        packageId: "pkg001",
        sessionIndex: 0,
        status: "completed",
        therapistId: "user123",
        duration: 60,
        title: "Initial Assessment",
        description: "Getting to know you and your partner",
        scheduledDate: "2023-05-15T10:00:00Z",
        recordingUrl: "https://example.com/recording1",
        notes: "Great session, discussed initial concerns",
        createdAt: "2023-05-01T09:00:00Z",
        updatedAt: "2023-05-15T11:00:00Z"
      },
      {
        id: "credit2",
        bookingId: "book001",
        packageId: "pkg001",
        sessionIndex: 1,
        status: "completed",
        therapistId: "user123",
        duration: 45,
        title: "Communication Styles",
        description: "Identifying and improving communication patterns",
        scheduledDate: "2023-05-29T10:00:00Z",
        recordingUrl: "https://example.com/recording2",
        notes: "Worked on communication exercises",
        createdAt: "2023-05-01T09:00:00Z",
        updatedAt: "2023-05-29T11:00:00Z"
      },
      {
        id: "credit3",
        bookingId: "book001",
        packageId: "pkg001",
        sessionIndex: 2,
        status: "scheduled",
        therapistId: "user123",
        duration: 45,
        title: "Conflict Resolution",
        description: "Learning healthy conflict resolution skills",
        scheduledDate: "2023-06-15T14:00:00Z",
        zoomLink: "https://zoom.us/j/234567",
        createdAt: "2023-05-01T09:00:00Z",
        updatedAt: "2023-06-10T09:00:00Z"
      },
      {
        id: "credit4",
        bookingId: "book001",
        packageId: "pkg001",
        sessionIndex: 3,
        status: "available",
        therapistId: "user123",
        duration: 60,
        title: "Family Dynamics",
        description: "Addressing family dynamics and expectations",
        createdAt: "2023-05-01T09:00:00Z",
        updatedAt: "2023-05-01T09:00:00Z"
      },
      {
        id: "credit5",
        bookingId: "book001",
        packageId: "pkg001",
        sessionIndex: 4,
        status: "available",
        therapistId: "user123",
        duration: 45,
        title: "Financial Planning",
        description: "Discussing financial goals and concerns",
        createdAt: "2023-05-01T09:00:00Z",
        updatedAt: "2023-05-01T09:00:00Z"
      },
      {
        id: "credit6",
        bookingId: "book001",
        packageId: "pkg001",
        sessionIndex: 5,
        status: "available",
        therapistId: "user123",
        duration: 60,
        title: "Future Planning",
        description: "Creating a shared vision for your future",
        createdAt: "2023-05-01T09:00:00Z",
        updatedAt: "2023-05-01T09:00:00Z"
      }
    ]
  },
  {
    id: "book002",
    packageId: "pkg002",
    packageTitle: "Job Interview Preparation",
    clientId: "user456",
    therapistId: "user123",
    therapistName: "Sarah Johnson",
    purchaseDate: "2023-06-01T14:30:00Z",
    totalSessions: 3,
    usedSessions: 0,
    remainingSessions: 3,
    expiryDate: "2023-09-01T14:30:00Z",
    status: "active",
    totalAmount: 8000,
    finalAmount: 8000,
    // Commission tracking
    platformFee: 2800, // 35% of 8000
    therapistEarnings: 5200, // 65% of 8000
    platformEarnings: 2800, // Same as platform fee
    sessionCredits: [
      {
        id: "credit7",
        bookingId: "book002",
        packageId: "pkg002",
        sessionIndex: 0,
        status: "available",
        therapistId: "user123",
        duration: 60,
        title: "Anxiety Assessment",
        description: "Understanding your career goals and interview fears",
        createdAt: "2023-06-01T14:30:00Z",
        updatedAt: "2023-06-01T14:30:00Z"
      },
      {
        id: "credit8",
        bookingId: "book002",
        packageId: "pkg002",
        sessionIndex: 1,
        status: "available",
        therapistId: "user123",
        duration: 60,
        title: "Confidence Building",
        description: "Techniques to boost confidence and self-presentation",
        createdAt: "2023-06-01T14:30:00Z",
        updatedAt: "2023-06-01T14:30:00Z"
      },
      {
        id: "credit9",
        bookingId: "book002",
        packageId: "pkg002",
        sessionIndex: 2,
        status: "available",
        therapistId: "user123",
        duration: 60,
        title: "Mock Interviews",
        description: "Practice interviews with real-time feedback",
        createdAt: "2023-06-01T14:30:00Z",
        updatedAt: "2023-06-01T14:30:00Z"
      }
    ]
  }
];

export const dummyVouchers = [
  {
    code: "WELCOME10",
    discount: 10,
    expiryDate: "2023-12-31T23:59:59Z",
    usageLimit: 100,
    usageCount: 45,
    isActive: true
  },
  {
    code: "SUMMER20",
    discount: 20,
    expiryDate: "2023-08-31T23:59:59Z",
    usageLimit: 50,
    usageCount: 32,
    isActive: true
  }
];
