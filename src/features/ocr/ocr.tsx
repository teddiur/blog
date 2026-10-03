import  { useState } from "react";
import { processFile } from './logic';
import type { ImageFile } from './types';
import { ImageUpload } from "../../components/ImageUpload";


const initialState = {
    id: Math.random().toString(36).substring(7),
    isProcessing: false,
} as ImageFile;

export function OCR() {
    const [currentFile, setCurrentFile] = useState<ImageFile>(initialState);
    const [results, setResults] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = async (file: File) => {
        console.log('asasdas')

        const isPdf = file.type === 'application/pdf';
        const newFile: ImageFile = {
            id: Math.random().toString(36).substring(7),
            file,
            previewUrl: URL.createObjectURL(file),
            results: [],
            isProcessing: false,
            isPdf,
        };
        console.log(isPdf, newFile)

        setCurrentFile(newFile);
        setResults([]);
        setError(null);

        try {
            setCurrentFile(prev => ({ ...prev, isProcessing: true }));
            const ocrResults = await processFile(newFile);
            setResults(ocrResults.map(r => r.text));
        } catch (e) {
            console.error(e);
            setError("Failed to perform OCR.");
            setCurrentFile(prev => ({ ...prev, isProcessing: false }));
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '1.5rem' }}>AI OCR Tool</h1>

            <ImageUpload onFileSelect={handleFileSelect} />

            {currentFile.isProcessing && (
                <p style={{ marginTop: '1rem', color: 'blue' }}>
                    {currentFile.isPdf ? "Converting PDF pages and processing..." : "Processing image..."}
                </p>
            )}

            <button onClick={async () => {
                console.log(currentFile)
                if (!currentFile.file) return;
                try {
                    setCurrentFile(prev => ({ ...prev, isProcessing: true }));
                    const ocrResults = await processFile(currentFile);
                    setResults(ocrResults.map(r => r.text));
                } catch (e) {
                    console.error(e);
                    setError("Failed to perform OCR.");
                    setCurrentFile(prev => ({ ...prev, isProcessing: false }));
                }
            }}>Submit</button>
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