import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
 

  const storagePath = path.join(process.cwd(), 'storage')
  const filePath = path.join(storagePath, id)

  try {
    await fs.access(filePath)
    
    return NextResponse.json({ message: 'Document status updated successfully' })
  } catch (error) {
    console.error('Error updating document status:', error)
    return NextResponse.json({ error: 'Error updating document status' }, { status: 500 })
  }
}