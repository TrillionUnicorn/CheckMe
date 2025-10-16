/**
 * File Storage Service
 * Supports: AWS S3, Cloudflare R2, Local Storage
 */

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs/promises';

// Storage configuration
const STORAGE_TYPE = process.env.STORAGE_TYPE || 'local'; // 'local', 's3', 'r2'
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

// S3/R2 configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'auto',
  endpoint: process.env.S3_ENDPOINT, // For Cloudflare R2
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'checkme-documents';

/**
 * Upload file to storage
 */
export async function uploadFile(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<{ url: string; key: string }> {
  const fileExtension = path.extname(filename);
  const fileKey = `${crypto.randomUUID()}${fileExtension}`;

  if (STORAGE_TYPE === 'local') {
    // Local storage
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const filePath = path.join(UPLOAD_DIR, fileKey);
    await fs.writeFile(filePath, file);

    return {
      url: `/uploads/${fileKey}`,
      key: fileKey,
    };
  }

  // S3/R2 storage
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
    Body: file,
    ContentType: contentType,
  });

  await s3Client.send(command);

  // Generate public URL
  const url = process.env.S3_PUBLIC_URL
    ? `${process.env.S3_PUBLIC_URL}/${fileKey}`
    : await getSignedUrl(s3Client, new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileKey,
      }), { expiresIn: 3600 });

  return { url, key: fileKey };
}

/**
 * Get file from storage
 */
export async function getFile(key: string): Promise<Buffer> {
  if (STORAGE_TYPE === 'local') {
    const filePath = path.join(UPLOAD_DIR, key);
    return await fs.readFile(filePath);
  }

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  const response = await s3Client.send(command);
  const chunks: Uint8Array[] = [];

  if (response.Body) {
    for await (const chunk of response.Body as any) {
      chunks.push(chunk);
    }
  }

  return Buffer.concat(chunks);
}

/**
 * Delete file from storage
 */
export async function deleteFile(key: string): Promise<void> {
  if (STORAGE_TYPE === 'local') {
    const filePath = path.join(UPLOAD_DIR, key);
    await fs.unlink(filePath);
    return;
  }

  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
}

/**
 * Get signed URL for direct upload
 */
export async function getUploadUrl(
  filename: string,
  contentType: string
): Promise<{ uploadUrl: string; key: string }> {
  const fileExtension = path.extname(filename);
  const fileKey = `${crypto.randomUUID()}${fileExtension}`;

  if (STORAGE_TYPE === 'local') {
    return {
      uploadUrl: `/api/upload/${fileKey}`,
      key: fileKey,
    };
  }

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return { uploadUrl, key: fileKey };
}

/**
 * Validate file
 */
export function validateFile(
  file: { size: number; mimetype: string },
  options: {
    maxSize?: number;
    allowedTypes?: string[];
  } = {}
): { valid: boolean; error?: string } {
  const maxSize = options.maxSize || 10 * 1024 * 1024; // 10MB default
  const allowedTypes = options.allowedTypes || [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${maxSize / 1024 / 1024}MB limit`,
    };
  }

  if (!allowedTypes.includes(file.mimetype)) {
    return {
      valid: false,
      error: `File type ${file.mimetype} not allowed`,
    };
  }

  return { valid: true };
}

export default {
  uploadFile,
  getFile,
  deleteFile,
  getUploadUrl,
  validateFile,
};

