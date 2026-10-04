export interface OCRResult {
    text: string;
    confidence: number;
    error?: boolean
}

export interface ProcessingStatus {
    message: string
}

export interface ImageFile {
    id: string;
    file?: File;
    images?: File[]
    previewUrl?: string;
    results?: OCRResult[];
    isProcessing: boolean;
    processingStatus: ProcessingStatus[]
    error?: string;
    isPdf?: boolean;
}
