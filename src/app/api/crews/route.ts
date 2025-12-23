import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('crews')
    .select('id, name')
    .eq('active', true)
    .order('name')

  if (error) {
    console.error('Failed to fetch crews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch crews' },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}
