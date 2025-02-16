export const formatFileSize = (sizeInBytes: number) => {
  if (sizeInBytes < 1024) return `${sizeInBytes} bytes`;
  const kb = sizeInBytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
}

export const formatFiles = [
  { name: 'WEBP', value: 'image/webp' },
  { name: 'JPEG', value: 'image/jpeg' },
  { name: 'PNG', value: 'image/png' },
  { name: 'BMP', value: 'image/bmp' },
]

export const MAX_LENGTH_IMAGES = 20