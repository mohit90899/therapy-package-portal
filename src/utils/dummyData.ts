
import { TherapyPackage, User } from './types';

export const dummyUsers: User[] = [
  {
    id: '1',
    name: 'John Therapist',
    email: 'john@therapy.com',
    role: 'therapist',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@therapy.com',
    role: 'admin',
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: '3',
    name: 'Client User',
    email: 'client@example.com',
    role: 'client',
    profileImage: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
];

export const dummyPackages: TherapyPackage[] = [
  {
    id: '1',
    title: 'Stress Relief Package',
    description: 'A comprehensive package designed to help you manage stress and anxiety through proven therapeutic techniques.',
    price: 299,
    duration: 60,
    sessions: 5,
    therapistId: '1',
    therapistName: 'John Therapist',
    status: 'approved',
    createdAt: '2025-05-10T12:00:00Z',
    updatedAt: '2025-05-10T12:00:00Z',
    image: 'https://images.unsplash.com/photo-1470319149464-1955f33f1b56?q=80&w=1000',
    tags: ['stress', 'anxiety', 'meditation']
  },
  {
    id: '2',
    title: 'Couples Therapy',
    description: 'Strengthen your relationship with your partner through guided sessions focusing on communication and understanding.',
    price: 399,
    duration: 90,
    sessions: 4,
    therapistId: '1',
    therapistName: 'John Therapist',
    status: 'approved',
    createdAt: '2025-05-11T12:00:00Z',
    updatedAt: '2025-05-11T12:00:00Z',
    image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=1000',
    tags: ['couples', 'relationship', 'communication']
  },
  {
    id: '3',
    title: 'Depression Management',
    description: 'Learn effective strategies to manage depressive symptoms and improve your overall mental wellbeing.',
    price: 349,
    duration: 60,
    sessions: 6,
    therapistId: '1',
    therapistName: 'John Therapist',
    status: 'pending',
    createdAt: '2025-05-12T12:00:00Z',
    updatedAt: '2025-05-12T12:00:00Z',
    image: 'https://images.unsplash.com/photo-1475506631979-72412c606f4d?q=80&w=1000',
    tags: ['depression', 'mood', 'wellbeing']
  }
];

export const currentUser: User = {
  id: '1',
  name: 'John Therapist',
  email: 'john@therapy.com',
  role: 'therapist',
  profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
};

export const getPackagesByStatus = (status?: string): TherapyPackage[] => {
  if (!status) return dummyPackages;
  return dummyPackages.filter(pkg => pkg.status === status);
};

export const getPackagesByTherapist = (therapistId: string): TherapyPackage[] => {
  return dummyPackages.filter(pkg => pkg.therapistId === therapistId);
};
