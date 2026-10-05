import * as pdfjsLib from 'pdfjs-dist';

/**
 * Converts a PDF file to an array of image Blobs (one per page).
 * @param {File} file - The PDF file.
 * @returns {Promise<Blob[]>} - A promise that resolves to an array of image Blobs.
 */
export const pdfToImages = async (file: File): Promise<Blob[]> => {
  // Ensure this only runs in a browser environment
  if (typeof window === 'undefined') {
    throw new Error('PDF conversion is only supported in the browser.');
  }

  // Initialize the worker only when the function is called
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
    cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/cmaps/`,
    cMapPacked: true,
  }).promise;

  const blobs: Blob[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 }); // High scale for better OCR

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Could not create canvas context');
    }

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;

    const blob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob((b) => {
        if (b) resolve(b);
        else reject(new Error('Could not convert canvas to blob'));
      }, 'image/png');
    });

    blobs.push(blob);
  }

  return blobs;
};
