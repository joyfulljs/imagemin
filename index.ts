/**
 * Compress image file while preserving the aspect ratio.
 * @param img img element
 * @param settings Settings { maxWidth: number, maxHeight: number, quality: number }
 */
export function compressWithRatio(img: HTMLImageElement, settings: ISettings) {
  const MAX_WIDTH = settings.maxWidth,
    MAX_HEIGHT = settings.maxHeight;
  let w = img.width, h = img.height;
  // decide the width
  if (MAX_WIDTH > 0 && w > MAX_WIDTH) {
    h = MAX_WIDTH / w * h;
    w = MAX_WIDTH;
  }
  // decide the height
  if (MAX_HEIGHT > 0 && h > MAX_HEIGHT) {
    w = MAX_HEIGHT / h * w;
    h = MAX_HEIGHT;
  }
  return compress(img, w, h, settings);
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
 * Compress file to specified width & height width: number, height: number, quality?: number
 * @param img img element
 * @param width width
 * @param height height
 * @param options options { quality?: number, mineType?: string = 'image/png' }
 */
export function compress(img: HTMLImageElement, width: number, height: number, options: IOptions) {
  const { quality, mineType } = options || {};
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL(mineType || 'image/png', quality || 1);
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

export interface IOptions {
  /**
   * image quality(0~1)
   */
  quality?: number;
  /**
   * output MINE type. default to image/png
   */
  mineType?: string;
}
export interface ISettings extends IOptions {
  /**
   * the max width when resize
   */
  maxWidth?: number;
  /**
   * the max height when resize
   */
  maxHeight?: number;
}