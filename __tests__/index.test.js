const { compressWithRatio, readFile, dataURLtoFile, compress, createImage } = require('../dist/index');
const Base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAaCAMAAACTisy7AAACkVBMVEXz3z3v4T7////w4Tvw4T3z4Dny3z3z4Dfw4Dvx3TXyzhz9/f0AAALz3zjy2DDy3kHv3zz4yDvy3jbw2zPv2TD//f/7+//SvZXw4Dj05TX2yzXw1jTx1Cvx0yf//fv5xkL15z/x4jnw2znvyTL6+vv19PXu7e75xkvy4kH4yj/1yT72xj7y4z3z4Drw3jnv2Dby3DPw0DPtwS/00Szvryrzyinz0yTzyx3s3QDn1QDwxwD29/r9/Pn49PTj29r447z436vWxarLu6efn6DTwZ34x1zQrVP5yVHz40Tz5kPu30D3x0Dz4D305Dv1yzvy5jro1Drz3zn0yzf4xzbaxTXv0jPy4jLvxjDx0S/3zC/uvS7y1S3yyizvtSv1zCfuoif32CbeyCbwnCXzyiPvkiHz0iDUtCD1zhzz3xjfzADsywDz9fPy8fPv6/P//PLr6uvy8Ofn4uP+8eDn4N//8NbV1dX56c/Qzs/f087Exc3NxsHy3b3Yy7vZyLm5ubnPv7i7t7f747arrbCmqqr22aTNt5v51Zr41pXRuZHWv5CDf47PuYmfkYnVvYXOtIV/f3/6y3zQr3XOt3T2zXPPr29ucm3Fr2lramn6yGdiYGWBc2TuxF7TrFf4xFPKr1P/0VHRtlFoYk74yEr9yEncqkXhzET0xkTiu0T5zkPp2T/r2Dylnjo4Nzq2rDiaiDfbxTZ1Zzb11TTy2TPfxzPIszP23TLxzTIUKzLuzTHczDHvuDDksDBHQy/u1y6TeS43NC724y3wvy3ssyzvwyvuqyrUvybumCX91COejCD24x/yzR/Orx1fURzzzRj61Bd4cxDv2QDt2QDs2QDu0wD00gDjzgDzxwDhxgDZvQBvZwAdFQDGSBrkAAACP0lEQVQoz2XPZXPiQBjA8c0mIYEGSmkpcEiRokWKFem1vcrV3d393N3d3d3d3d3d5dPcBmaOu/Y/yYud37PPJMCYEMNWVZWUMHrLiozJKgihXg9hFAqYzaUj2CpLLUVFScady6dOzD77YMM0lkFrHy+Uj/e6taHScjxhzyFm2+LsHfORAl5PilKpUCiUKT28d31dzSfv/85dOh6mLZwhFoMmgUAQhxII7qEB3vs3b08cyNs4HcJJaRBcTuYmc7nsG4sGFMqXvS+60LdlqKBKDER8KUVJpTaaFCG/Vn21nefzWg7vGzVSrAIkqdFopFKCwEmSz+WWn9ZecrsbzHlGpIBPUhRJkTiKpjW1D/s/fhkcDAa/xxxZBIGJT5JhFFrV+KkLBzevkUhWrt+69+idOaBfjYhFuoQ+9+HibMPYxPj4+NQxE9LnLQPbB2Q2CiFtLT/PMMwSGCkRGLKuyCookjb5161m7jK7UiG6GRVWAMftf1WMMP/Tqlk3GGZ3Zo5EIsnJnDtzikEP0rM6ymicxjFZ9YK1v87cCgT8/s+Bbz9+9uZuAs8GyjCcIAiaqO04VqhWF+Sbotn47V+DQFaAYRhgiy6RWYWFQq38Zp3L5dJdr3cDTEhwOCAUhgnR49A1Pu3sbGt54vUBnJVwNI6W2OW6lrbu7ueeR83ef5FgkaOtqbvt8Txu1Dnr/0MMVczROuROZ41c7mgahuyxwm4XUSJuHAhbZG3ojKNIUSxADUcO+nFbBCNr/07yh9wcgn8AhteBZHSssMIAAAAASUVORK5CYII=';
const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC';
const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC';

// mock Image onload event
Object.defineProperty(global.Image.prototype, 'src', {
  set(src) {
    if (src === LOAD_FAILURE_SRC) {
      setTimeout(() => this.onerror(new Error('mocked error')));
    } else if (src === LOAD_SUCCESS_SRC) {
      setTimeout(() => this.onload());
    }
  },
});

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
  expect(drawImage.mock.calls[0]).toEqual([img, 0, 0, 80, 80]);
});

test('readFile successfull', done => {
  const file = dataURLtoFile(Base64, 'test');
  readFile(file).then(ret => {
    expect(ret).toBe(Base64);
    done();
  })
})

test('compressWithRatio correctly', () => {
  const drawImage = jest.fn();
  HTMLCanvasElement.prototype.getContext = function () {
    return { drawImage }
  }
  const img = new Image();
  img.width = 40;
  img.height = 80;

  compressWithRatio(img, { maxWidth: 50 });
  compressWithRatio(img, { maxWidth: 20 });
  compressWithRatio(img, { maxHeight: 40 });
  compressWithRatio(img, { maxHeight: 90 });
  compressWithRatio(img, { maxWidth: 40, maxHeight: 90 });
  compressWithRatio(img, { maxWidth: 20, maxHeight: 90 });
  compressWithRatio(img, { maxWidth: 20, maxHeight: 20 });
  compressWithRatio(img, { maxWidth: 50, maxHeight: 80 });
  compressWithRatio(img, { maxWidth: 10, maxHeight: 40 });
  expect(drawImage.mock.calls[0]).toEqual([img, 0, 0, 40, 80]);
  expect(drawImage.mock.calls[1]).toEqual([img, 0, 0, 20, 40]);
  expect(drawImage.mock.calls[2]).toEqual([img, 0, 0, 20, 40]);
  expect(drawImage.mock.calls[3]).toEqual([img, 0, 0, 40, 80]);
  expect(drawImage.mock.calls[4]).toEqual([img, 0, 0, 40, 80]);
  expect(drawImage.mock.calls[5]).toEqual([img, 0, 0, 20, 40]);
  expect(drawImage.mock.calls[6]).toEqual([img, 0, 0, 10, 20]);
  expect(drawImage.mock.calls[7]).toEqual([img, 0, 0, 40, 80]);
  expect(drawImage.mock.calls[8]).toEqual([img, 0, 0, 10, 20]);
});
