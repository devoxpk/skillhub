export type Role = 'admin' | 'instructor' | 'student';

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const HARDCODED_USERS = [
  {
    id: '1',
    email: 'admin@gmail.com',
    password: 'password',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: '2', 
    email: 'instructor@gmail.com',
    password: 'password',
    role: 'instructor',
    name: 'Instructor User'
  },
  {
    id: '3',
    email: 'student@gmail.com', 
    password: 'password',
    role: 'student',
    name: 'Student User'
  }
] as const;