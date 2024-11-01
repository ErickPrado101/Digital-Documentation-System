import { NextResponse } from "next/server";
import { readdir, stat } from "fs/promises";
import path from "path";
import { storagePath, ensureStorageExists } from "../../../../utils/storage";

export async function GET(req: Request): Promise<Response> {
  await ensureStorageExists();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  try {
    const files = await readdir(storagePath);
    const totalDocuments = files.length;
    const totalPages = Math.ceil(totalDocuments / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const documentosPromises = files
      .slice(startIndex, endIndex)
      .map(async (file) => {
        const filePath = path.join(storagePath, file);
        const stats = await stat(filePath);
        return {
          id: file,
          nome: file,
          status: "andamento",
          dataCriacao: stats.birthtime.toISOString(),
        };
      });

    const documentos = await Promise.all(documentosPromises);

    return NextResponse.json({
      documentos,
      currentPage: page,
      totalPages,
      totalDocuments,
    });
  } catch (error) {
    console.error("Error reading documents:", error);
    return NextResponse.json(
      { error: "Error reading documents" },
      { status: 500 }
    );
  }
}
