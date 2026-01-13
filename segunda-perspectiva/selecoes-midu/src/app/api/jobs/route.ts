import { NextRequest, NextResponse } from 'next/server';
import { mockJobs } from '@/data/mock';
import { Job } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const type = searchParams.get('type');
  const modality = searchParams.get('modality');

  let filteredJobs = [...mockJobs];

  if (category && category !== 'Todas') {
    filteredJobs = filteredJobs.filter(job => job.category === category);
  }

  if (type) {
    filteredJobs = filteredJobs.filter(job => job.type === type);
  }

  if (modality) {
    filteredJobs = filteredJobs.filter(job => job.modality === modality);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower)
    );
  }

  filteredJobs = filteredJobs.filter(job => job.isActive);

  return NextResponse.json({
    jobs: filteredJobs,
    total: filteredJobs.length,
    filters: {
      category,
      search,
      type,
      modality
    }
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Here you would normally save to database
  const newJob: Job = {
    ...body,
    id: Date.now().toString(),
    postedAt: new Date(),
    isActive: true
  };

  return NextResponse.json(newJob, { status: 201 });
}