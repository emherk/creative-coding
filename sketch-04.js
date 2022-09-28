const canvasSketch = require('canvas-sketch');
const {math} = require("canvas-sketch-util");

const settings = {
  dimensions: [ 1024, 1024 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    // context.fillStyle = '#FFCCCB';
    context.fillStyle = 'brown';
    context.fillRect(0, 0, width, height);

    const cols = 12
    const rows = 12
    const cellNum = cols * rows

    const gridw = width * 0.9
    const gridh = height * 0.9
    const cellw = gridw / cols
    const cellh = gridh / rows
    const marginx = (width - gridw) / 2
    const marginy = (height - gridh) / 2

    context.lineWidth = 16
    context.strokeStyle = '#2aa5a5'
    for (let i = 0; i < cellNum; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)

      const x = marginx + cellw * row
      const y = marginy + cellh * col
      const w = cellw * 0.8
      const h = cellh * 0.8

      context.save()
      context.translate(x, y)
      context.translate(cellw * 0.5, cellh * 0.5)
      context.rotate(math.degToRad(math.mapRange(i, 0, cellNum, 0, 90)))

      context.beginPath()
      context.moveTo(w * -0.5, 0)
      context.lineTo(w * 0.5, 0)
      context.stroke()

      context.restore()
    }

    // const squarew = cellw * 4
    // const squareh = cellh * 4
    // const squarex =width * 0.5
    // const squarey =height * 0.5
    // context.fillRect(squarex, squarey, squarew, squareh)

  };
};

canvasSketch(sketch, settings);
