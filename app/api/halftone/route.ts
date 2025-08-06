import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // Read the pre-generated halftone data
    const halftoneDataPath = join(process.cwd(), 'public', 'assets', 'sandstone.jpg.halftone.json');
    const halftoneData = readFileSync(halftoneDataPath, 'utf-8');
    
    return NextResponse.json(JSON.parse(halftoneData), {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error loading halftone data:', error);
    return NextResponse.json({ error: 'Failed to load halftone data' }, { status: 500 });
  }
} 