export default class PCElement {
  constructor(x=0, y=0, w=100, h=100, children=[], id="") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.children = children;
    this.id = id;
    let canvas = document.getElementById("ui");
    let ctx = canvas.getContext("2d");
    this.ctx = ctx;
  }

  /**
   * Render element and all children
   */
  renderAll() {
    this.render();
    this.children.forEach(child => {
      child.render();
    });
  }

  /**
   * Render empty box
   */
  render() {
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 5;
    this.ctx.rect(this.x, this.y, this.w, this.h);
    this.ctx.stroke();
    console.log("rendered '%s'", this.id);
  }

  /**
   * Add a child element
   * @param {PCElement} child Child element
   */
  pushChild(child) {
    this.children.push(child);
    console.log("registered '%s' as a child of '%s'", child.id, this.id)
  }

  /**
   * Check if x,y is within the range of an Element
   * @param {num} x
   * @param {num} y 
   * @returns true if x,y is within the range of the Element
   */
  inRange(x, y) {
    return (
      x >= this.x
      && x < this.x + this.w
      && y >= this.y
      && y < this.y + this.h
    );
  }

  onClick(e) {
    if (!this.inRange(e.clientX, e.clientY)) {
      return;
    }
    this.children.forEach(child => {
      child.onClick(e);
    });
    console.log("'%s' clicked", this.id);
  }

  onMouseDown(e) {
    if (!this.inRange(e.clientX, e.clientY)) {
      return;
    }
    console.log("'%s' mouse down", this.id);
    this.children.forEach(child => {
      child.onMouseDown(e);
    });
  }
  
  onMouseUp(e) {
    if (!this.inRange(e.clientX, e.clientY)) {
      return;
    }
    this.children.forEach(child => {
      child.onMouseUp(e);
    });
    console.log("'%s' mouse up", this.id);
  }
}