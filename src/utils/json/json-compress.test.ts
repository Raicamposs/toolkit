import { describe, expect, it } from 'vitest';
import { promisify } from 'node:util';
import { gzip } from 'node:zlib';
import { JsonCompress, JsonCompressionError, JsonDecompressionError } from './json-compress';

const rawGzip = promisify(gzip);

describe('JsonCompress', () => {
  const sampleObject = {
    id: 1,
    name: 'Raian Campos',
    email: 'raian@example.com',
    nested: {
      active: true,
      tags: ['typescript', 'node', 'vitest'],
      specialChars: 'Ações e Citações com acentuação, ç, ã e caracteres 🚀',
    },
  };

  describe('Integration: compress and decompress', () => {
    it('should successfully compress and then decompress back to the original object', async () => {
      const compressed = await JsonCompress.compress(sampleObject);
      expect(typeof compressed).toBe('string');
      expect(compressed.length).toBeGreaterThan(0);

      const decompressed = await JsonCompress.decompress(compressed);
      expect(decompressed).toEqual(sampleObject);
    });

    it('should handle array structures', async () => {
      const arrayData = [1, 'string', { key: 'value' }, [true, false]];
      const compressed = await JsonCompress.compress(arrayData);
      const decompressed = await JsonCompress.decompress(compressed);

      expect(decompressed).toEqual(arrayData);
    });

    it('should handle primitive values', async () => {
      const primitives = ['simple string', 12345, true, null];

      for (const primitive of primitives) {
        const compressed = await JsonCompress.compress(primitive);
        const decompressed = await JsonCompress.decompress(compressed);
        expect(decompressed).toBe(primitive);
      }
    });
  });

  describe('compress', () => {
    it('should throw JsonCompressionError when object contains a circular reference', async () => {
      const circularObj: any = { name: 'Circular' };
      circularObj.self = circularObj;

      await expect(JsonCompress.compress(circularObj)).rejects.toThrow(JsonCompressionError);
      await expect(JsonCompress.compress(circularObj)).rejects.toThrow(
        'Failed to compress JSON object'
      );
    });
  });

  describe('decompress', () => {
    it('should throw JsonDecompressionError when inputs are not valid base64 or not compressed with gzip', async () => {
      const invalidData = 'not-a-valid-base64-compressed-string';

      await expect(JsonCompress.decompress(invalidData)).rejects.toThrow(JsonDecompressionError);
      await expect(JsonCompress.decompress(invalidData)).rejects.toThrow(
        'Failed to decompress and parse JSON data'
      );
    });

    it('should throw JsonDecompressionError when decompressed payload is not a valid JSON string', async () => {
      // We simulate compressed invalid JSON by compressing raw non-JSON text directly (not via JSON.stringify)
      // using node:zlib directly to craft the payload.
      const compressedRawTextBuffer = await rawGzip(Buffer.from('not a json string', 'utf8'));
      const base64Data = compressedRawTextBuffer.toString('base64');

      await expect(JsonCompress.decompress(base64Data)).rejects.toThrow(JsonDecompressionError);
      await expect(JsonCompress.decompress(base64Data)).rejects.toThrow(
        'Failed to decompress and parse JSON data'
      );
    });

    it('should support generic types for type safety', async () => {
      interface User {
        id: number;
        name: string;
      }

      const user: User = { id: 42, name: 'Douglas Adams' };
      const compressed = await JsonCompress.compress(user);

      // Act & Assert type parameter compile check (implicitly validated by TS compilation)
      const decompressedUser = await JsonCompress.decompress<User>(compressed);
      expect(decompressedUser.id).toBe(42);
      expect(decompressedUser.name).toBe('Douglas Adams');
    });
  });
});
