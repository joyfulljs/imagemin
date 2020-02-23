# imagemin
read &amp; compress image

# demo

```JS
import { compressWithRatio, readFile, compress, createImage } from '@joyfulljs/imagemin';

// compress from a url
createImage('/your/img/path/xx.jpg')
.then(img=>{
  return compress(img, 80, 80)
}).then(dataUrl=>{
  console.log(dataUrl)
});

// compree file from input[type=file]
readFile(fileInput.files[0])
.then(createImage)
.then(img=>{
  return compress(img, 80, 80)
}).then(dataUrl=>{
  console.log(dataUrl)
});
```
