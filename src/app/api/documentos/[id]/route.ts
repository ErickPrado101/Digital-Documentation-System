import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import { ensureStorageExists, storagePath } from '../../../../../utils/storage'

export async function GET(req: NextRequest) {
  await ensureStorageExists()

  // Decodificar o ID para lidar com espaços e caracteres especiais
  const id = decodeURIComponent(req.nextUrl.pathname.split('/').pop() || '')
  const { searchParams } = req.nextUrl
  const view = searchParams.get('view') === 'true'

  const filePath = path.join(storagePath, id)

  try {
    const fileBuffer = await readFile(filePath)
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': view ? `inline; filename="${id}"` : `attachment; filename="${id}"`,
      },
    })
  } catch (error) {
    console.error('Error reading document:', error)
    return NextResponse.json({ error: 'Error reading document' }, { status: 500 })
  }
}
