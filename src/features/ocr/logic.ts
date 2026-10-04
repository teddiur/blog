import Tesseract from 'tesseract.js';
import { pdfToImages } from './utils/pdfConverter';
import type { OCRResult, ImageFile } from './types';

export const performOCRTesseract = async (imageFile: ImageFile, worker: Tesseract.Worker): Promise<OCRResult> => {
    console.log('antes')
    const result = await worker.recognize(
        imageFile.file
    );
    console.log('dps')


    return {
        text: result.data.text.trim(),
        confidence: (result.data.confidence || 90) / 100,
    }


};

export const processFile = async function* (imageFile: ImageFile): AsyncGenerator<OCRResult, void, unknown> {
    if (!imageFile.file) {
        throw new Error("No file provided");
    }
    const worker = await Tesseract.createWorker('por+eng')
    if (imageFile.isPdf && imageFile.file.type === 'application/pdf') {
        const blobs = await pdfToImages(imageFile.file);

        for (const blob of blobs) {
            const blobFile = new File([blob], "page.png", { type: "image/png" });
            console.log('comecou')
            const result = await performOCRTesseract({
                ...imageFile,
                file: blobFile,
            }, worker);
            yield result

        }
        await worker.terminate();
        console.log('terminou')
    } else {
        const result = await performOCRTesseract(imageFile, worker);

        yield result;
        await worker.terminate();
    }

};