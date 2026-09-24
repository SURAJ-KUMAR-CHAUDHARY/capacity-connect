export const users = [
  { id: 1, name: 'Admin User', email: 'admin@capacityconnect.com', role: 'Admin', status: 'Approved' },
  { id: 2, name: 'Trainer John', email: 'trainer@capacityconnect.com', role: 'Trainer', status: 'Approved', skills: ['React', 'Node.js'], experience: '5 years' },
  { id: 3, name: 'Trainee Alice', email: 'trainee@capacityconnect.com', role: 'Trainee', status: 'Approved', progress: 45 }
];

export const pendingApprovals = [
  { id: 4, name: 'Pending Trainer', email: 'p.trainer@capacity.com', role: 'Trainer', status: 'Pending' },
  { id: 5, name: 'Pending Trainee', email: 'p.trainee@capacity.com', role: 'Trainee', status: 'Pending' }
];

export const courses = [
  { id: 1, title: 'Full-Stack Web Dev', description: 'Learn MERN stack.', trainerId: 2, materials: 12, category: 'Software', enrolled: 156 },
  { id: 2, title: 'Advanced React', description: 'Deep dive into hooks.', trainerId: 2, materials: 8, category: 'Software', enrolled: 89 }
];

export const announcements = [
  { id: 1, title: 'System Maintenance', date: '2026-09-26', content: '2 hours downtime.' }
];

export const assessments = [
  {
    id: 1,
    courseId: 1,
    title: 'React Fundamentals Quiz',
    questions: [
      { q: 'What is a React Hook?', options: ['A function', 'A class', 'A variable'], answer: 0 },
      { q: 'What does useEffect do?', options: ['Handle state', 'Side effects', 'Render UI'], answer: 1 },
    ],
  }
];

export const libraryResources = [
  { id: 1, title: 'React Best Practices 2026', type: 'PDF', size: '2.4 MB' },
  { id: 2, title: 'Intro to Node.js', type: 'Video', size: '150 MB' },
  { id: 3, title: 'System Design Overview', type: 'PPT', size: '5.1 MB' },
];
