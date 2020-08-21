# read file, resize/compress image with or without aspect ratio

[![Build Status](https://travis-ci.org/joyfulljs/draggable.svg?branch=master)](https://travis-ci.org/joyfulljs/draggable)
[![codecov](https://codecov.io/gh/joyfulljs/draggable/branch/master/graph/badge.svg)](https://codecov.io/gh/joyfulljs/draggable)

# API

- **createImage(src: string): Promise\<HTMLImageElement\>**  
  _Create a HTMLImageElement_  
  _@param src image url_

- **readFile(file: File): Promise\<string\>**  
  _Read base64 content from a File object_  
  _@param file A single file obtained by input[type=file]_

- **compress(img: HTMLImageElement, width: number, height: number, options: IOptions): string**  
  _Compress file to specified width & height_  
  _@param img img element_  
  _@param width width_  
  _@param height height_  
  _@param options options { quality?: number, mineType?: string = 'image/png' }_

- **compressWithRatio(img: HTMLImageElement, settings: ISettings): string**  
  _Compress image file while preserving the aspect ratio._  
  _@param img img element_  
  _@param settings Settings { maxWidth?: number, maxHeight?: number, quality?: number, mineType?: string = 'image/png' }_

- **dataURLtoFile(dataUrl: string, filename: string): File**  
  _Convert base64 image to File object_  
  _@param dataUrl base64 image_  
  _@param filename file name_

# DEMO

```JS
import { compressWithRatio, readFile, compress, createImage } from '@joyfulljs/imagemin';

// compress from a url
createImage('http://yourhost.com/your/img/path/xx.jpg')
.then(img=>{
  return compress(img, 80, 80)
}).then(dataUrl=>{
  console.log(dataUrl)
});

// compress file from input[type=file]
readFile(fileInput.files[0])
.then(createImage)
.then(img=>{
  return compressWithRatio(img, { maxWidth: 800 })
}).then(dataUrl=>{
  console.log(dataUrl)
});
```

# LICENSE

MIT
