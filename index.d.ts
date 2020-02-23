interface IOptions {
  /**
   * image quality(0~1)
   */
  quality?: number;
  /**
   * output MINE type. default to image/png
   */
  mineType?: string
}

interface ISettings extends IOptions {
  maxWidth?: number;
  maxHeight?: number;
}