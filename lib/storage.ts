import fs from 'fs';
import path from 'path';
import { StudentData } from './data';

const DATA_DIR = path.join(process.cwd(), 'data');
const STUDENTS_FILE = path.join(DATA_DIR, 'students.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize students file if it doesn't exist
if (!fs.existsSync(STUDENTS_FILE)) {
  fs.writeFileSync(STUDENTS_FILE, JSON.stringify({ students: {} }, null, 2));
}

export function getAllStudents(): Record<string, StudentData> {
  try {
    const data = fs.readFileSync(STUDENTS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed.students || {};
  } catch (error) {
    return {};
  }
}

export function getStudent(username: string): StudentData | null {
  const students = getAllStudents();
  return students[username] || null;
}

export function saveStudent(username: string, data: StudentData): void {
  const students = getAllStudents();
  students[username] = data;
  fs.writeFileSync(STUDENTS_FILE, JSON.stringify({ students }, null, 2));
}

export function deleteStudent(username: string): boolean {
  const students = getAllStudents();
  if (students[username]) {
    delete students[username];
    fs.writeFileSync(STUDENTS_FILE, JSON.stringify({ students }, null, 2));
    return true;
  }
  return false;
}

export function createOrUpdateStudent(username: string, updates: Partial<StudentData>): StudentData {
  const existing = getStudent(username);
  
  if (existing) {
    // Update existing student
    const updated = {
      ...existing,
      ...updates,
      lastLogin: new Date().toISOString(),
    };
    saveStudent(username, updated);
    return updated;
  } else {
    // Create new student
    const newStudent: StudentData = {
      username,
      studiedTopics: [],
      points: 0,
      level: 1,
      achievements: [],
      perfectQuizStreak: 0,
      totalQuizzesTaken: 0,
      totalCorrectAnswers: 0,
      totalStudyTime: 0,
      purchasedRewards: [],
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      ...updates,
    };
    saveStudent(username, newStudent);
    return newStudent;
  }
}


