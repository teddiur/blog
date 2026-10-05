import Tesseract from 'tesseract.js';
import { pdfToImages } from './utils/pdfConverter';
import type { OCRResult, ImageFile } from './types';

const performOCRTesseract = async (
  imageFile: ImageFile,
  worker: Tesseract.Worker,
): Promise<OCRResult> => {
  if (!imageFile.file) {
    return {
      text: '',
      confidence: 0,
    };
  }

  const result = await worker.recognize(imageFile.file);
  return {
    text: result.data.text.trim(),
    confidence: (result.data.confidence || 90) / 100,
  };
};

const processFile = async function* (
  imageFile: ImageFile,
): AsyncGenerator<OCRResult, void, unknown> {
  if (!imageFile.file) {
    throw new Error('No file provided');
  }
  const worker = await Tesseract.createWorker('por+eng');
  if (imageFile.isPdf && imageFile.file.type === 'application/pdf') {
    const blobs = await pdfToImages(imageFile.file);

    for (const blob of blobs) {
      const blobFile = new File([blob], 'page.png', { type: 'image/png' });

      const result = await performOCRTesseract(
        {
          ...imageFile,
          file: blobFile,
        },
        worker,
      );
      yield result;
    }
    await worker.terminate();
  } else {
    const result = await performOCRTesseract(imageFile, worker);

    yield result;
    await worker.terminate();
  }
};

function swapLast<T>(array: T[], newItem: T): T[] {
  return array.slice(0, array.length - 1).concat(newItem);
}

export { swapLast, processFile, performOCRTesseract };
