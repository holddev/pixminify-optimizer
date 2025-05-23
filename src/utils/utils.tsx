import { CompressionSettings } from "../types/types";

export const formatFileSize = (sizeInBytes: number) => {
  if (sizeInBytes < 1024) return `${sizeInBytes} bytes`;
  const kb = sizeInBytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
}

export const formatFiles = [
  { name: 'WEBP', value: 'webp' as const },
  { name: 'JPEG', value: 'jpeg' as const },
  { name: 'PNG', value: 'png' as const },
  { name: 'BMP', value: 'bmp' as const },
]

export const getMimeType = (format: CompressionSettings['format']) => {
  switch (format) {
    case 'webp': return 'image/webp';
    case 'jpeg': return 'image/jpeg';
    case 'png': return 'image/png';
    case 'bmp': return 'image/bmp';
    default: return 'image/jpeg';
  }
}


export const MAX_LENGTH_IMAGES = 20