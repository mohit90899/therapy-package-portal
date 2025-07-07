
import { PackageTemplate } from "./types";

export const packageTemplates: PackageTemplate[] = [
  {
    id: "pre-wedding-template",
    name: "Pre-Wedding Counseling Package",
    category: "Relationship",
    description: "A comprehensive pre-wedding counseling program to help couples build a strong foundation for marriage.",
    suggestedSessions: 6,
    defaultSessionDetails: [
      {
        duration: 60,
        title: "Initial Assessment",
        description: "Getting to know both partners and understanding relationship dynamics",
        participants: "couple",
        participantDetails: "Both bride and bridegroom"
      },
      {
        duration: 45,
        title: "Individual Session - Bride",
        description: "Individual counseling session focusing on personal concerns and expectations",
        participants: "individual",
        participantDetails: "Bride only"
      },
      {
        duration: 45,
        title: "Individual Session - Bridegroom",
        description: "Individual counseling session focusing on personal concerns and expectations",
        participants: "individual",
        participantDetails: "Bridegroom only"
      },
      {
        duration: 60,
        title: "Communication & Conflict Resolution",
        description: "Learning effective communication and healthy conflict resolution strategies",
        participants: "couple",
        participantDetails: "Both bride and bridegroom"
      },
      {
        duration: 60,
        title: "Family Dynamics & Expectations",
        description: "Addressing family relationships and managing expectations",
        participants: "couple",
        participantDetails: "Both bride and bridegroom"
      },
      {
        duration: 60,
        title: "Future Planning & Goals",
        description: "Creating shared vision and planning for married life",
        participants: "couple",
        participantDetails: "Both bride and bridegroom"
      }
    ],
    samplePrice: 15000,
    tags: ["Marriage", "Couples", "Communication", "Relationships"]
  },
  {
    id: "job-interview-template",
    name: "Job Interview Preparation Package",
    category: "Career",
    description: "Build confidence and reduce anxiety for upcoming job interviews.",
    suggestedSessions: 3,
    defaultSessionDetails: [
      {
        duration: 60,
        title: "Anxiety Assessment & Goal Setting",
        description: "Understanding career goals and identifying interview-related fears and concerns",
        participants: "individual",
        participantDetails: "Individual session"
      },
      {
        duration: 60,
        title: "Confidence Building & Self-Presentation",
        description: "Techniques to boost confidence and improve self-presentation skills",
        participants: "individual",
        participantDetails: "Individual session"
      },
      {
        duration: 90,
        title: "Mock Interviews & Feedback",
        description: "Practice interviews with real-time feedback and improvement strategies",
        participants: "individual",
        participantDetails: "Individual session"
      }
    ],
    samplePrice: 8000,
    tags: ["Career", "Anxiety", "Confidence", "Interview"]
  },
  {
    id: "parenting-support-template",
    name: "Parenting Support Package",
    category: "Family",
    description: "Comprehensive support for parents navigating various parenting challenges.",
    suggestedSessions: 4,
    defaultSessionDetails: [
      {
        duration: 60,
        title: "Parenting Style Assessment",
        description: "Understanding your parenting approach and identifying areas for growth",
        participants: "couple",
        participantDetails: "Both parents (if applicable)"
      },
      {
        duration: 45,
        title: "Communication with Children",
        description: "Effective communication strategies for different age groups",
        participants: "couple",
        participantDetails: "Both parents (if applicable)"
      },
      {
        duration: 45,
        title: "Setting Boundaries & Discipline",
        description: "Healthy boundary setting and positive discipline techniques",
        participants: "couple",
        participantDetails: "Both parents (if applicable)"
      },
      {
        duration: 60,
        title: "Self-Care for Parents",
        description: "Maintaining your wellbeing while caring for children",
        participants: "couple",
        participantDetails: "Both parents (if applicable)"
      }
    ],
    samplePrice: 12000,
    tags: ["Parenting", "Family", "Children", "Communication"]
  },
  {
    id: "exam-anxiety-template",
    name: "Exam Anxiety Support for Adolescents",
    category: "Education",
    description: "Helping students and their families manage exam-related stress and anxiety.",
    suggestedSessions: 6,
    defaultSessionDetails: [
      {
        duration: 45,
        title: "Initial Assessment - Student Only",
        description: "Understanding the student's specific concerns and anxiety triggers",
        participants: "individual",
        participantDetails: "Student only"
      },
      {
        duration: 60,
        title: "Parent Consultation",
        description: "Educating parents about exam anxiety and how to provide support",
        participants: "family",
        participantDetails: "Both parents only"
      },
      {
        duration: 45,
        title: "Stress Management Techniques",
        description: "Teaching practical stress management and relaxation techniques",
        participants: "individual",
        participantDetails: "Student only"
      },
      {
        duration: 45,
        title: "Study Skills & Time Management",
        description: "Developing effective study strategies and time management skills",
        participants: "individual",
        participantDetails: "Student only"
      },
      {
        duration: 45,
        title: "Confidence Building",
        description: "Building self-confidence and positive mindset for exams",
        participants: "individual",
        participantDetails: "Student only"
      },
      {
        duration: 60,
        title: "Family Support Session",
        description: "Bringing everyone together to create a supportive environment",
        participants: "family",
        participantDetails: "Student and both parents"
      }
    ],
    samplePrice: 10000,
    tags: ["Education", "Anxiety", "Adolescents", "Family", "Stress"]
  }
];

export const getTemplatesByCategory = (category?: string) => {
  if (!category) return packageTemplates;
  return packageTemplates.filter(template => 
    template.category.toLowerCase() === category.toLowerCase()
  );
};

export const getTemplateById = (id: string) => {
  return packageTemplates.find(template => template.id === id);
};
