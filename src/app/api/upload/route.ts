import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { storagePath,ensureStorageExists } from '../../../../utils/storage';

export async function POST(req: Request): Promise<Response> {
  await ensureStorageExists();

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const fileName = formData.get('fileName') as string | null;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(storagePath, fileName || 'uploadedFile');

  try {
    await writeFile(filePath, buffer);
    return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ error: 'Error saving file' }, { status: 500 });
  }
}
