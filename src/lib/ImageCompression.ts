import imageCompression from 'browser-image-compression'
import { Image } from '../types/types';

export interface OptionsImage {
  imageFile: File,
  fileType?: string
}

export const compressImage = async ({ imageFile, fileType }: OptionsImage) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType
  }

  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile
  } catch (error) {
    console.log('algo salio mal: ', error);
  }
}

interface ImageSettings {
  images: Image[]
  fileType?: string
}

export const compressAllImages = async ({ images, fileType }: ImageSettings) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType
  }
  try {
    const results = await Promise.allSettled(images.map(({ image }) => imageCompression(image, options)))
    results.forEach(result => {
      if (result.status === "rejected") {
        console.log('Error al comprimir: ', result.reason)
      }
    });
    return results.filter(result => result.status === "fulfilled").map(result => result.value)
  } catch (error) {
    console.log('algo salio mal al comprimir las imagenes: ', error)
  }
}