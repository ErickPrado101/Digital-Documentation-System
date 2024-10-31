import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import {  writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const documento = formData.get('documento') as File
  const nomeCompleto = formData.get('nomeCompleto') as string
  const cpf = formData.get('cpf') as string

  if (!documento || !nomeCompleto || !cpf) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const bytes = await documento.arrayBuffer()
  const pdfDoc = await PDFDocument.load(bytes)

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const pages = pdfDoc.getPages()
  const lastPage = pages[pages.length - 1]


  const fontSize = 12
  const text = `Assinado digitalmente por: ${nomeCompleto} - CPF: ${cpf}`

  lastPage.drawText(text, {
    x: 50,
    y: 50,
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
  })

  const pdfBytes = await pdfDoc.save()

  const storagePath = path.join(process.cwd(), 'storage')
  const filePath = path.join(storagePath, `assinado_${documento.name}`)

  try {
    await writeFile(filePath, pdfBytes)
    return NextResponse.json({ message: 'Document signed successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error saving signed document:', error)
    return NextResponse.json({ error: 'Error saving signed document' }, { status: 500 })
  }
}