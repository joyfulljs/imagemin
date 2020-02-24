export interface IOptions {
  /**
   * image quality(0~1)
   */
  quality?: number;
  /**
   * output MINE type. default to image/png
   */
  mineType?: string
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