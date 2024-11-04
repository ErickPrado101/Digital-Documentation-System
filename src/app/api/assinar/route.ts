import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb } from 'pdf-lib'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { ensureStorageExists,storagePath } from '../../../../utils/storage'

export async function POST(req: NextRequest) {
  await ensureStorageExists()

  const formData = await req.formData()
  const documento = formData.get('documento') as string
  const assinatura = formData.get('assinatura') as File
  const nomeCompleto = formData.get('nomeCompleto') as string
  const cpf = formData.get('cpf') as string

  if (!documento || !assinatura || !nomeCompleto || !cpf) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const documentoPath = path.join(storagePath, documento)
    const pdfBytes = await readFile(documentoPath)
    const pdfDoc = await PDFDocument.load(pdfBytes)

    const pages = pdfDoc.getPages()
    const lastPage = pages[pages.length - 1]
    const { width } = lastPage.getSize()

    const assinaturaBuffer = await assinatura.arrayBuffer()
    const resizedAssinatura = await sharp(assinaturaBuffer)
      .resize({ width: 200 })
      .toBuffer()

    const assinaturaImage = await pdfDoc.embedPng(resizedAssinatura)
    const assinaturaDims = assinaturaImage.scale(0.5)

    lastPage.drawImage(assinaturaImage, {
      x: width - assinaturaDims.width - 50,
      y: 100,
      width: assinaturaDims.width,
      height: assinaturaDims.height,
    })

    const font = await pdfDoc.embedFont('Helvetica')
    lastPage.drawText(`Assinado por: ${nomeCompleto}`, {
      x: 50,
      y: 80,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    })

    lastPage.drawText(`CPF: ${cpf}`, {
      x: 50,
      y: 60,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    })

    const pdfBytesAssinado = await pdfDoc.save()

    const novoNome = documento.replace('.pdf', '_assinado.pdf')
    const novoPath = path.join(storagePath, novoNome)

    await writeFile(novoPath, pdfBytesAssinado)

    return NextResponse.json({ message: 'Document signed successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error signing document:', error)
    return NextResponse.json({ error: 'Error signing document' }, { status: 500 })
  }
}