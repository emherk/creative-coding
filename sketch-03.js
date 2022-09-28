const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for(let i = 0; i < 40; i++) {
      new Point(width * random.range(0, 1), height * random.range(0, 1)).draw(context)
    }
  };
};

canvasSketch(sketch, settings);

class Point {
  constructor(x, y) {
    this.x = x; 
    this.y = y;
    this.radius = 10
  

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    context.fillStyle = 'black'
    context.fill()
  }
}