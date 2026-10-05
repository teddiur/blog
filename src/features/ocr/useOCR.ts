import { useState } from "react";
import { pdfToImages } from './utils/pdfConverter';
import { processFile, swapLast } from './logic';
import type { ImageFile, OCRResult, ProcessingStatus } from './types';

const initialState = {
    id: Math.random().toString(36).substring(7),
    isProcessing: false,
} as ImageFile;

const buildCurrentFile = (file: File, images: File[] | null) => {
    const isPdf = file.type === 'application/pdf';

    return {
        id: Math.random().toString(36).substring(7),
        file,
        images: images ?? [file],
        previewUrl: URL.createObjectURL(file),
        results: [],
        isProcessing: false,
        processingStatus: [],
        isPdf,
    }
}



export function useOCR() {
    const [currentFile, setCurrentFile] = useState<ImageFile>(initialState);
    const [results, setResults] = useState<OCRResult[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const handleFileSelect = async (file: File) => {
        const newFile: ImageFile = buildCurrentFile(file, null);

        setResults([]);
        setError(null);
        setPreviewUrls([]);

        if (!newFile.file) {
            throw new Error("No file provided");
        }
        setCurrentFile(newFile);
    };

    const handleSubmit = async () => {
        if (currentFile.isPdf && currentFile?.file?.type === 'application/pdf') {
            setCurrentFile(prev => ({
                ...prev, isProcessing: true,
                processingStatus: [{ message: 'Convertendo PDF para imagens' }]
            }));
            const blobs = await pdfToImages(currentFile.file);
            const images = blobs.map((b: Blob) => new File([b], "page.png", { type: "image/png" }));
            setCurrentFile(prev => ({ ...prev, images, processingStatus: [{ message: 'PDF convertido para imagens' }] }));
        }

        let page = 1;
        setCurrentFile(prev => ({
            ...prev,
            processingStatus: prev?.processingStatus?.concat({ message: `Extraindo texto de página ${page}` })
        }));

        for await (let ocrResult of processFile(currentFile)) {
            try {
                setResults(prev => ([...prev, {
                    ...ocrResult,
                    error: false
                }]));

                // Memory Leak Prevention Strategy:
                // Create the URL.createObjectURL for the image once.
                const currentImage = currentFile.images?.[page - 1];
                if (currentImage instanceof File) {
                    const image = new File([currentImage], "page.png", { type: "image/png" });
                    const url = URL.createObjectURL(image);
                    setPreviewUrls(prev => [...prev, url]);
                }

                setCurrentFile(prev => ({
                    ...prev,
                    processingStatus: swapLast(prev?.processingStatus, { message: `Texto de página ${page} extraido` })
                }));
            }
            catch (e) {
                console.error(e);
                setError("Failed to perform OCR.");
                setResults(prev => ([...prev, {
                    text: '',
                    confidence: 0,
                    error: false
                }]))
                setCurrentFile(prev => ({
                    ...prev,
                    processingStatus: swapLast(prev?.processingStatus, { message: `Texto de página ${page} com erro` })
                }));
            }
            page += 1;
            setCurrentFile(prev => ({
                ...prev,
                processingStatus: prev?.processingStatus?.concat({ message: `Extraindo texto de página ${page}` })
            }));
        }

        setCurrentFile(prev => ({ ...prev, isProcessing: false }));
    };

    return {
        currentFile,
        results,
        error,
        previewUrls,
        handleFileSelect,
        handleSubmit,
    };
}
