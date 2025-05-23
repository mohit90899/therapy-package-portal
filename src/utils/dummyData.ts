
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
    tags: ["Couples", "Marriage", "Communication"]
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
    tags: ["Career", "Anxiety", "Confidence"]
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
    tags: ["Parenting", "Family", "Children"]
  }
];

export const dummyBookings: Booking[] = [
  {
    id: "book001",
    packageId: "pkg001",
    clientId: "user456",
    purchaseDate: "2023-05-01T09:00:00Z",
    sessionsRemaining: 4,
    expiryDate: "2023-12-01T09:00:00Z",
    status: "active",
    sessions: [
      { duration: 60, title: "Initial Assessment", completed: true, scheduled: true, scheduledDate: "2023-05-15T10:00:00Z", zoomLink: "https://zoom.us/j/123456", notes: "Great session, discussed initial concerns" },
      { duration: 45, title: "Communication Styles", completed: false, scheduled: true, scheduledDate: "2023-05-29T10:00:00Z", zoomLink: "https://zoom.us/j/234567" },
      { duration: 45, title: "Conflict Resolution", completed: false, scheduled: false },
      { duration: 60, title: "Family Dynamics", completed: false, scheduled: false },
      { duration: 45, title: "Financial Planning", completed: false, scheduled: false },
      { duration: 60, title: "Future Planning", completed: false, scheduled: false }
    ]
  },
  {
    id: "book002",
    packageId: "pkg002",
    clientId: "user456",
    purchaseDate: "2023-06-01T14:30:00Z",
    sessionsRemaining: 3,
    expiryDate: "2023-09-01T14:30:00Z",
    status: "active",
    sessions: [
      { duration: 60, title: "Anxiety Assessment", completed: false, scheduled: false },
      { duration: 60, title: "Confidence Building", completed: false, scheduled: false },
      { duration: 60, title: "Mock Interviews", completed: false, scheduled: false }
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
