/**
 * Compress image file while preserving the aspect ratio.
 * @param img img element
 * @param settings Settings { maxWidth: number, maxHeight: number, quality: number }
 */
export declare function compressWithRatio(img: HTMLImageElement, settings: ISettings): string;
/**
 * Read base64 content from a File object
 * @param file A single file obtained by input[type=file]
 */
export declare function readFile(file: File): Promise<string>;
/**
 * Convert base64 image to File object
 * @param dataUrl base64 image
 * @param filename file name
 */
export declare function dataURLtoFile(dataUrl: string, filename: string): File;
/**
 * Compress file to specified width & height
 * @param img img element
 * @param width width
 * @param height height
 * @param options options { quality?: number, mineType?: string = 'image/png' }
 */
export declare function compress(img: HTMLImageElement, width: number, height: number, options: IOptions): string;
/**
 * Create a HTMLImageElement
 * @param src image url
 */
export declare function createImage(src: string): Promise<HTMLImageElement>;
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
