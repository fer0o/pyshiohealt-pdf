export async function downloadPreviewPdf(element: HTMLElement) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const canvas = await html2canvas(element, {
    backgroundColor: "#ffffff",
    scale: Math.max(2, window.devicePixelRatio || 1),
    useCORS: true,
    onclone: (clonedDocument) => {
      const clonedSheet = clonedDocument.querySelector<HTMLElement>(
        '[data-pdf-export="true"]',
      );

      if (clonedSheet) {
        clonedSheet.style.boxShadow = "none";
      }
    },
  });

  const imageData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    format: "letter",
    orientation: "portrait",
    unit: "pt",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const scale = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
  const imageWidth = canvas.width * scale;
  const imageHeight = canvas.height * scale;
  const x = (pageWidth - imageWidth) / 2;
  const y = (pageHeight - imageHeight) / 2;

  pdf.addImage(imageData, "PNG", x, y, imageWidth, imageHeight);
  pdf.save("bitacora-tratamiento.pdf");
}
