import imageCompression from 'browser-image-compression'
import { CompressionSettings } from '../types/types';
import { getMimeType } from '../utils/utils';

export interface OptionsImage {
  imageFile: File,
  settings?: CompressionSettings,
}

export const compressImage = async ({ imageFile, settings }: OptionsImage) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: getMimeType(settings?.format),
    preserveExif: settings?.saveMetadata
  }

  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile
  } catch (error) {
    console.log('algo salio mal: ', error);
  }
}