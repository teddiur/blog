import React, { useState } from 'react';
const { ChangeEvent } = React;

interface ImageUploadProps {
  onFileSelect: (file: File) => void;
}


const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '500px',
  margin: '1rem auto',
  padding: '2rem',
  border: '2px dashed #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  transition: 'background-color 0.3s',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#0070f3',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  border: 'none',
  marginTop: '1rem',
};

export function ImageUpload({ onFileSelect }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div style={containerStyle}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem', color: '#666' }}>Upload an image for OCR</p>
          <button style={buttonStyle} onClick={() => document.getElementById('fileInput')?.click()}>
            Select Image
            <input
              id="fileInput"
              type="file"
              className="hidden"
              // accept="image/*"
              onChange={handleFileChange}
            />
          </button>
        </div>
      
    </div>
  );
}