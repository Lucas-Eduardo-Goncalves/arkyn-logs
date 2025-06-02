import crypto from "crypto";

class HashAdapter {
  static hashLog(id: string, message: string, metadata: any): string {
    const jsonMetadata = JSON.stringify(metadata || {});
    const contentToHash = `${id}:${message}:${jsonMetadata}`;

    const hash = crypto
      .createHash("sha256")
      .update(contentToHash)
      .digest("hex");

    return hash;
  }
}

export { HashAdapter };
