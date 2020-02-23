# resize/compress image with aspect ratio or not

# API
- **createImage(src: string): Promise\<HTMLImageElement\>**  
  *Create a HTMLImageElement*  
  *@param src image url*  

- **readFile(file: File): Promise\<string\>**  
 *Read base64 content from a File object*  
 *@param file A single file obtained by input[type=file]*  
 
- **compress(img: HTMLImageElement, width: number, height: number, options: IOptions): string**  
 *Compress file to specified width & height*  
 *@param img img element*  
 *@param width width*  
 *@param height height*  
 *@param options options { quality?: number, mineType?: string = 'image/png' }*

- **compressWithRatio(img: HTMLImageElement, settings: ISettings): string**  
 *Compress image file while preserving the aspect ratio.*  
 *@param img img element*  
 *@param settings Settings { maxWidth?: number, maxHeight?: number, quality?: number, mineType?: string = 'image/png' }*

- **dataURLtoFile(dataUrl: string, filename: string): File**  
 *Convert base64 image to File object*  
 *@param dataUrl base64 image*  
 *@param filename file name*

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
