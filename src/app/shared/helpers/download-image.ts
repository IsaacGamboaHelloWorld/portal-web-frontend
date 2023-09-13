import { toJpeg } from 'html-to-image';

export function createJpeg(
  id: string,
  backgroundColor: string = '#fff',
  quality: number = 1,
): Promise<string> {
  return toJpeg(document.getElementById(id), {
    backgroundColor,
    filter: (node: HTMLElement) => {
      return !node.classList || !node.classList.contains('hidden-in-image');
    },
    quality,
  });
}

export function downloadImage(
  name: string = 'voucher.jpg',
  data: string,
): void {
  const link = document.createElement('a');
  link.download = name;
  link.href = data;
  link.click();
}
