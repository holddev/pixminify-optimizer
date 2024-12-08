export interface Image {
  id: `${string}-${string}-${string}-${string}-${string}`
  image: File
}

export type ImageID = Pick<Image, 'id'>