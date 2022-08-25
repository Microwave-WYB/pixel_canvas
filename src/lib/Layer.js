export default class Layer {
  constructor(numRow, numCol, id, visible) {
    this.numRow = numRow;
    this.numCol = numCol;
    this.id = id;
    this.visible = visible;
    this.pixels = new Array(numRow);
    for (let row = 0; row < this.numRow; row++) {
      this.pixels[row] = new Array(numCol).fill([0, 0, 0, 0]);
    }
  }

  fill(rgba) {
    console.log(this.pixels);
    for (let row = 0; row < this.numRow; row++) {
      for (let col = 0; col < this.numCol; col++) {
        this.pixels[row][col] = rgba;
      }
    }
  }

  draw(row, col, rgba) {
    this.pixels[row][col] = rgba;
  }
}