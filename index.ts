/// <reference path="./index.d.ts" />

/**
 * Compress image file while preserving the aspect ratio.
 * @param file A single File obtained by input[type=file]
 * @param settings Settings { maxWidth: number, maxHeight: number, quality: number }
 */
export function compressWithRatio(file: File, settings: Settings) {
  return readFile(file).then(createImage).then(img => {
    const MAX_WIDTH = settings.maxWidth,
      MAX_HEIGHT = settings.maxHeight;
    let w = img.width, h = img.height;
    // 调整宽度
    if (MAX_WIDTH > 0 && w > MAX_WIDTH) {
      h = MAX_WIDTH / w * h;
      w = MAX_WIDTH;
    }
    // 调整高度
    if (MAX_HEIGHT > 0 && h > MAX_HEIGHT) {
      w = MAX_HEIGHT / h * w;
      h = MAX_HEIGHT;
    }
    return compress(img, w, h, settings.quality);
  })
}

/**
 * Read base64 content from a File object
 * @param file A single file obtained by input[type=file]
 */
export function readFile(file: File) {
  // @ts-ignore
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      resolve(this.result as string);
    }
    fileReader.onerror = reject
    fileReader.readAsDataURL(file);
  })
}

/**
 * Convert base64 image to File object
 * @param dataUrl base64 image
 * @param filename file name
 */
export function dataURLtoFile(dataUrl: string, filename: string) {
  let arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * Compress file to specified width & height
 * @param img img element
 * @param width width
 * @param height height
 * @param quality quality(0~1)
 */
export function compress(img: HTMLImageElement, width: number, height: number, quality?: number) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", quality || 1);
}

/**
 * Create a HTMLImageElement
 * @param src image url
 */
export function createImage(src: string) {
   // @ts-ignore
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => { resolve(img) };
    img.onerror = reject;
    img.src = src;
  })
}