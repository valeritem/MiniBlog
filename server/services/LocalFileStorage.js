import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

export class LocalFileStorage {
  constructor() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    this.uploadPath = path.join(__dirname, '..', 'uploads');
  }

  async saveFile(fileName, fileData) {
    const filePath = path.join(this.uploadPath, fileName);

    try {
      await fs.access(this.uploadPath);
    } catch {
      await fs.mkdir(this.uploadPath, { recursive: true });
    }

    await fs.writeFile(filePath, fileData);

    return fileName;
  }

  async deleteFile(fileName) {
    if (!fileName) return;
    const filePath = path.join(this.uploadPath, fileName);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Error deleting file ${fileName}:`, error.message);
    }
  }
}
