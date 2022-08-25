import Layer from "./Layer";
import PCElement from "./PCElement";

export default class PCBoard extends PCElement {
  constructor(x, y, w, h, children=[], id="board", numRow=16, numCol=16, layers=[], currLayer=undefined) {
    super(x, y, w, h, children, id);
    this.numRow = numRow;
    this.numCol = numCol;
    this.layer = layers;
    this.layers = layers;
    this.currLayer = currLayer;
    if (!layers.length) {
      let bg = new Layer(numRow, numCol, "background", true);
      bg.fill([200, 200, 200, 1]);
      layers.push(bg);
      this.layer = layers;
      this.currLayer = bg;
    }
    this.pixelSize = w / numCol;
  }

  render() {
    super.render();
    this.layers.forEach(layer => {
      this.renderLayer(layer);
    });
  }

  onClick(e) {
    super.onClick(e);
    let [row, col] = this.posToPixel(e.clientX, e.clientY);
    this.currLayer.pixels[row][col] = [0, 0, 0, 1];
    this.render();
  }

  renderLayer(layer) {
    for (let row = 0; row < layer.numRow; row++) {
      for (let col = 0; col < layer.numCol; col++) {
        this.renderPixel(
          row,
          col,
          layer.pixels[row][col][0],
          layer.pixels[row][col][1],
          layer.pixels[row][col][2],
          layer.pixels[row][col][3]
        );
      }
    }
  }
;
  renderPixel(row, col, r, g, b, a) {
    this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
    this.ctx.fillRect(
      this.x + col * this.pixelSize,
      this.y + row * this.pixelSize,
      this.pixelSize,
      this.pixelSize
    );
  }

  posToPixel(x, y) {
    if (! this.inRange(x, y)) {
      return;
    }
    let col = parseInt((x - this.x) / this.pixelSize);
    let row = parseInt((y - this.y) / this.pixelSize);
    return [row, col];
  }
}