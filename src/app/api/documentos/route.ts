import {  NextResponse } from 'next/server'
import { readdir, stat } from 'fs/promises'
import path from 'path'

export async function GET() {
  const storagePath = path.join(process.cwd(), 'storage')

  try {
    const files = await readdir(storagePath)
    const documentos = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(storagePath, file)
        const stats = await stat(filePath)
        return {
          id: file,
          nome: file,
          status: 'andamento',
          dataCriacao: stats.birthtime.toISOString(),
        }
      })
    )

    return NextResponse.json(documentos)
  } catch (error) {
    console.error('Error reading documents:', error)
    return NextResponse.json({ error: 'Error reading documents' }, { status: 500 })
  }
}