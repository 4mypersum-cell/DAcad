import { NextRequest, NextResponse } from 'next/server';
import { getStudent, createOrUpdateStudent, deleteStudent } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const student = getStudent(params.username);
  
  if (student) {
    return NextResponse.json(student);
  } else {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const updates = await request.json();
    const student = createOrUpdateStudent(params.username, updates);
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const deleted = deleteStudent(params.username);
  
  if (deleted) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }
}


