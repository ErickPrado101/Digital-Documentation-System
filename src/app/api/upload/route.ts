import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  const fileName = formData.get('fileName') as string

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const storagePath = path.join(process.cwd(), 'storage')
  const filePath = path.join(storagePath, fileName)

  try {
    await writeFile(filePath, buffer)
    return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error saving file:', error)
    return NextResponse.json({ error: 'Error saving file' }, { status: 500 })
  }
}