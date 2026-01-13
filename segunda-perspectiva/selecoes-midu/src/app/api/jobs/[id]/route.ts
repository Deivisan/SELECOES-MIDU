import { NextRequest, NextResponse } from 'next/server';
import { mockJobs } from '@/data/mock';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const job = mockJobs.find(j => j.id === params.id);
  
  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json(job);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const job = mockJobs.find(j => j.id === params.id);
  
  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  // Here you would normally update in database
  const updatedJob = { ...job, ...body };
  
  return NextResponse.json(updatedJob);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const jobIndex = mockJobs.findIndex(j => j.id === params.id);
  
  if (jobIndex === -1) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  // Here you would normally delete from database
  return NextResponse.json({ message: 'Job deleted successfully' });
}