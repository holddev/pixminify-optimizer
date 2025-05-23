export interface CompressionSettings {
  saveMetadata?: boolean
  format?: 'jpeg' | 'png' | 'webp' | 'bmp'
}

export interface Image {
  id: `${string}-${string}-${string}-${string}-${string}`
  image: File
  settings?: CompressionSettings
  compressedImage?: File
}

export type ImageID = Pick<Image, 'id'>