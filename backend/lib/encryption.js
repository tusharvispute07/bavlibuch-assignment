import crypto from "crypto";

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export function encrypt(buffer) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encryptedBuffer = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return encryptedBuffer;
}