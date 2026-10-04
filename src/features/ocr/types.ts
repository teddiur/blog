export interface OCRResult {
    text: string;
    confidence: number;
    error?: boolean
}

export interface ImageFile {
    id: string;
    file?: File;
    images?: File[]
    previewUrl?: string;
    results?: OCRResult[];
    isProcessing: boolean;
    error?: string;
    isPdf?: boolean;
}
