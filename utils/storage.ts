import fs from "fs/promises";
import path from "path";

const storagePath: string = path.join(process.cwd(), "storage");

export async function ensureStorageExists(): Promise<void> {
  try {
    await fs.access(storagePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await fs.mkdir(storagePath, { recursive: true });
    } else {
      throw error;
    }
  }
}

export { storagePath };
