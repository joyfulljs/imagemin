"use strict";
/// <reference path="./index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Compress image file while preserving the aspect ratio.
 * @param file A single File obtained by input[type=file]
 * @param settings Settings { maxWidth: number, maxHeight: number, quality: number }
 */
function compressWithRatio(file, settings) {
    return readFile(file).then(createImage).then(function (img) {
        var MAX_WIDTH = settings.maxWidth, MAX_HEIGHT = settings.maxHeight;
        var w = img.width, h = img.height;
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
    });
}
exports.compressWithRatio = compressWithRatio;
/**
 * Read base64 content from a File object
 * @param file A single file obtained by input[type=file]
 */
function readFile(file) {
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        var fileReader = new FileReader();
        fileReader.onload = function () {
            resolve(this.result);
        };
        fileReader.onerror = reject;
        fileReader.readAsDataURL(file);
    });
}
exports.readFile = readFile;
/**
 * Convert base64 image to File object
 * @param dataUrl base64 image
 * @param filename file name
 */
function dataURLtoFile(dataUrl, filename) {
    var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
exports.dataURLtoFile = dataURLtoFile;
/**
 * Compress file to specified width & height
 * @param img img element
 * @param width width
 * @param height height
 * @param quality quality(0~1)
 */
function compress(img, width, height, quality) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", quality || 1);
}
exports.compress = compress;
/**
 * Create a HTMLImageElement
 * @param src image url
 */
function createImage(src) {
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        var img = document.createElement('img');
        img.onload = function () { resolve(img); };
        img.onerror = reject;
        img.src = src;
    });
}
exports.createImage = createImage;
