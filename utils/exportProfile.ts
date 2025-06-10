import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportProfileAsImage(element: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(element);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob: Blob | null) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Canvas is empty'));
      }
    }, 'image/png');
  });
}

export async function exportProfileAsPDF(element: HTMLElement): Promise<Uint8Array> {
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: [canvas.width, canvas.height] });
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  return pdf.output('arraybuffer');
}
