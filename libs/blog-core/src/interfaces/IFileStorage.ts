export interface IFileStorage {
  saveFile(fileName: string, fileData: any): Promise<string>;
  deleteFile(fileName: string): Promise<void>;
}
