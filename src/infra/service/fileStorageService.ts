import { IdAdapter } from "../adapters/idAdapter";

class FileStorageService {
  async insert(body: any): Promise<string> {
    const customId = new Date().toISOString() + IdAdapter.generate();
    const url = `files/${customId}.txt`;

    return url;
  }

  async delete(url: string): Promise<void> {}
}

export { FileStorageService };
