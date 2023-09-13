export function downloadFile(data: string): void {
  window.open(data, '_blank');
}

export function downloadFileWithJS(
  base64: string,
  name: string,
  extension: string,
): void {
  const linkSource = `${base64}`;
  const downloadLink = document.createElement('a');
  const fch: Date = new Date();
  const fileName = name
    ? name
    : `${name}(${fch.toLocaleDateString()}-${fch.toLocaleTimeString()}).${extension}`;
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}
