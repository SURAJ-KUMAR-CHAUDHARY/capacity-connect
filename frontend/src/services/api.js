import { users, pendingApprovals, courses, assessments, announcements, libraryResources } from '../mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
  get: async (url) => {
    await delay(300);
    
    // Admin Dashboard
    if (url === '/admin/dashboard') {
      return { data: {
        activeUsers: users.length, 
        totalCourses: courses.length, 
        totalEnrollments: 3890,
        pendingApprovals: pendingApprovals.length,
        enrollmentsChart: [
          { name: 'Jan', count: 120 }, { name: 'Feb', count: 210 }, { name: 'Mar', count: 350 },
          { name: 'Apr', count: 420 }, { name: 'May', count: 510 }, { name: 'Jun', count: 680 }
        ],
        revenueChart: [
          { name: 'Jan', revenue: 4000 }, { name: 'Feb', revenue: 5500 }, { name: 'Mar', revenue: 8000 }
        ]
      }};
    }
    
    // Trainer Dashboard
    if (url === '/trainer/dashboard') {
      return { data: {
        totalCourses: courses.filter(c => c.trainerId === 2).length,
        activeStudents: 245,
        avgRating: 4.8,
        totalHours: 124,
        enrollmentsChart: [
          { name: 'React Basics', enrollments: 120 },
          { name: 'Advanced Node', enrollments: 85 }
        ],
        scoresChart: [
          { name: 'React Basics', average_score: 88 },
          { name: 'Advanced Node', average_score: 75 }
        ]
      }};
    }
    
    // Trainee Courses
    if (url === '/trainee/courses/my') {
      return { data: courses.map(c => ({...c, progress: 45})) };
    }

    // Default fallback
    return { data: [] };
  },
  post: async (url, data) => {
    await delay(300);
    return { data: { success: true } };
  }
};

export default api;
