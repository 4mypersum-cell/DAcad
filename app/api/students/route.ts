import { NextRequest, NextResponse } from 'next/server';
import { getAllStudents, getStudent, createOrUpdateStudent } from '@/lib/storage';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username');

  if (username) {
    const student = getStudent(username);
    if (student) {
      return NextResponse.json(student);
    } else {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
  } else {
    const students = getAllStudents();
    return NextResponse.json(students);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, ...updates } = body;

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const student = createOrUpdateStudent(username, updates);
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}


