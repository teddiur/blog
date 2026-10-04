import { useState } from "react";
import { pdfToImages } from './utils/pdfConverter';
import { processFile } from './logic';
import type { ImageFile, OCRResult } from './types';
import { ImageUpload } from "../../components/ImageUpload";


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
        isPdf,
    }
}

export function OCR() {
    const [currentFile, setCurrentFile] = useState<ImageFile>(initialState);
    const [results, setResults] = useState<OCRResult[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = async (file: File) => {
        const newFile: ImageFile = buildCurrentFile(file, null)

        setResults([]);
        setError(null);

        if (!newFile.file) {
            throw new Error("No file provided");
        }

        if (newFile.isPdf && newFile.file.type === 'application/pdf') {
            const blobs = await pdfToImages(newFile.file)
            const images = blobs.map((b: Blob) => new File([b], "page.png", { type: "image/png" }));
            setCurrentFile(buildCurrentFile(file, images));

        } else {
            setCurrentFile(newFile);
        }


    };

    const handleSubmit = async () => {

        setCurrentFile(prev => ({ ...prev, isProcessing: true }));
        for await (let ocrResult of processFile(currentFile)) {
            try {
                setResults(prev => ([...prev, {
                    ...ocrResult,
                    error: false
                }]));
            }
            catch (e) {
                console.error(e);
                setError("Failed to perform OCR.");
                setResults(prev => ([...prev, {
                    text: '',
                    confidence: 0,
                    error: false
                }]))
                setCurrentFile(prev => ({ ...prev, isProcessing: false }));
            }

        }

        return (
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '1.5rem' }}>AI OCR Tool</h1>

                <ImageUpload onFileSelect={handleFileSelect} />

                {currentFile.isProcessing && (
                    <p style={{ marginTop: '1rem', color: 'blue' }}>
                        {currentFile.isPdf ? "Converting PDF pages and processing..." : "Processing image..."}
                    </p>
                )}

                <button onClick={handleSubmit}>Submit</button>
                {error && <p style={{ marginTop: '1rem', color: 'red' }}>{error}</p>}

                {results.length > 0 && (
                    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
                        <h3 style={{ marginTop: '0' }}>Results:</h3>
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                            {results.join('\n')}
                        </pre>
                    </div>
                )}
            </div>
        );
    }

    export default OCR;