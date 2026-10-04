import React from 'react';


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


export function ImageUpload({ onFileSelect }: ImageUploadProps) {


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', color: '#666' }}>Upload an image for OCR</p>
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
        />
      </div>

    </div>
  );
}