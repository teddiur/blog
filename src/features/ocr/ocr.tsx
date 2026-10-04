import ProcessingStatus from './components/ProcessingStatus';
import { ImageUpload } from "~/components/ImageUpload";
import { OCRResultItem } from './components/OCRResultItem';
import { useOCR } from './useOCR';

export function OCR() {
    const {
        currentFile,
        results,
        error,
        previewUrls,
        handleFileSelect,
        handleSubmit,
    } = useOCR();

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <ImageUpload onFileSelect={handleFileSelect} />

            {currentFile.isProcessing && (
                <ProcessingStatus messages={currentFile.processingStatus || []} />
            )}

            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ marginTop: '1rem', color: 'red' }}>{error}</p>}

            {results.length > 0 && (
                <>
                    <h3 style={{ marginTop: '0' }}>Results:</h3>
                    <div style={{ marginTop: '2rem', background: 'white', padding: '1rem', border: '1px solid #eee', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>

                        {results.map((x, index) => (
                            <OCRResultItem
                                key={index}
                                result={x}
                                previewUrl={previewUrls[index]}
                            />
                        ))}

                    </div>
                </>
            )}
        </div>
    );
}

export default OCR;
