export interface OCRResult {
    text: string;
    confidence: number;
    box?: number[][];
}

export interface ImageFile {
    id: string;
    file?: File;
    previewUrl?: string;
    results?: OCRResult[];
    isProcessing: boolean;
    error?: string;
    isPdf?: boolean;
}
