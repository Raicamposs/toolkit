import { promisify } from 'node:util';
import { gunzip, gzip } from 'node:zlib';

const gzipAsync = promisify(gzip);
const gunzipAsync = promisify(gunzip);

export class JsonCompressionError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'JsonCompressionError';
  }
}

export class JsonDecompressionError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'JsonDecompressionError';
  }
}

async function compress(jsonObject: unknown): Promise<string> {
  try {
    const jsonString = JSON.stringify(jsonObject);
    const buffer = Buffer.from(jsonString, 'utf8');
    const compressedBuffer = await gzipAsync(buffer);
    return compressedBuffer.toString('base64');
  } catch (error) {
    throw new JsonCompressionError('Failed to compress JSON object', { cause: error });
  }
}

async function decompress<T = unknown>(compressedData: string): Promise<T> {
  try {
    const compressedBuffer = Buffer.from(compressedData, 'base64');
    const decompressedBuffer = await gunzipAsync(compressedBuffer);
    const jsonString = decompressedBuffer.toString('utf8');
    return JSON.parse(jsonString) as T;
  } catch (error) {
    throw new JsonDecompressionError('Failed to decompress and parse JSON data', { cause: error });
  }
}

export const JsonCompress = { compress, decompress };
