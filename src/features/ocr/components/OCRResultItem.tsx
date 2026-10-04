import React from 'react';
import type { OCRResult } from '../types';

interface OCRResultItemProps {
  result: OCRResult;
  previewUrl?: string;
}

export function OCRResultItem({ result, previewUrl }: OCRResultItemProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(result.text);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {previewUrl && (
        <img style={{ height: '100%', maxWidth: '50%' }} src={previewUrl} alt="OCR preview" />
      )}
      <div>
        <button onClick={handleCopy}>Copiar</button>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {result.text}
        </pre>
      </div>
    </div>
  );
}