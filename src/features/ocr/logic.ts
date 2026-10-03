import Tesseract from 'tesseract.js';
import { pdfToImages } from './utils/pdfConverter';
import type { OCRResult, ImageFile } from './types';

export const performOCRTesseract = async (imageFile: ImageFile, worker: Tesseract.Worker): Promise<OCRResult[]> => {
    console.log('antes')
    const result = await worker.recognize(
        imageFile.file
    );
    console.log('dps')

    const results: OCRResult[] = [];

    if (result.data.text) {
        results.push({
            text: result.data.text.trim(),
            confidence: (result.data.confidence || 90) / 100,
        });
    }

    return results;
};

export const processFile = async (imageFile: ImageFile): Promise<OCRResult[]> => {
    if (!imageFile.file) {
        throw new Error("No file provided");
    }
    const worker = await Tesseract.createWorker('por+eng')
    if (imageFile.isPdf && imageFile.file.type === 'application/pdf') {
        const blobs = await pdfToImages(imageFile.file);
        const allResults: OCRResult[] = [];

        for (const blob of blobs) {
            const blobFile = new File([blob], "page.png", { type: "image/png" });
            console.log('comecou')
            const results = await performOCRTesseract({
                ...imageFile,
                file: blobFile,
            }, worker);
            allResults.push(...results);
        }
        console.log('terminou')
        await worker.terminate();
        return allResults;
    } else {
        const result = await performOCRTesseract(imageFile, worker);
        await worker.terminate();
        return result;
    }
};