const { compressWithRatio, readFile, compress, createImage } = require('../dist/index');

const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC';
const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC';

// mock tImage onload event
Object.defineProperty(global.Image.prototype, 'src', {
  set(src) {
    if (src === LOAD_FAILURE_SRC) {
      setTimeout(() => this.onerror(new Error('mocked error')));
    } else if (src === LOAD_SUCCESS_SRC) {
      setTimeout(() => this.onload());
    }
  },
});

// mock FileReader onload event
FileReader.prototype.readAsDataURL = function () {
  this.result = LOAD_SUCCESS_SRC;
  this.onload();
}

test('create image successfully', done => {
  createImage(LOAD_SUCCESS_SRC).then(img => {
    expect(img.tagName).toBe('IMG');
    done();
  })
});

test('compress successfully', () => {
  const drawImage = jest.fn();
  HTMLCanvasElement.prototype.getContext = function () {
    return { drawImage }
  }
  const img = new Image();
  const result = compress(img, 80, 80);
  console.log(result);
  expect(drawImage.mock.calls[0]).toEqual([img, 0, 0, 80, 80]);
});
