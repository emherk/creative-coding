const canvasSketch = require('canvas-sketch');
const {math, random} = require("canvas-sketch-util");

const settings = {
  pixelsPerInch: 300,
  dimensions: 'A4'
};

const sketch = () => {
  // const blue = '#0000ff'
  const blue = '#7678ed'
  const yellow = '#f8b913';
  return ({ context, width, height }) => {
    // context.fillStyle = '#FFCCCB';

    context.fillStyle = yellow
    context.fillRect(0, 0, width, height);

    const cols = 6
    const rows = 80
    const cellNum = cols * rows

    const gridw = width * 0.95
    const gridh = height * 0.95
    const cellw = gridw / cols
    const cellh = gridh / rows
    const marginx = (width - gridw) / 2
    const marginy = (height - gridh) / 2

    context.lineWidth = 6
    context.strokeStyle = blue
    for (let i = 0; i < cellNum; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)

      const x = marginx + cellw * col
      const y = marginy + cellh * row
      const w = cellw * 0.8
      const h = cellh * 0.8

      context.save()
      context.translate(x, y)
      context.translate(cellw * 0.5, cellh * 0.5)
      // const randRotate = random.noise2D(x, y, 0.001)
      // context.rotate(randRotate)
      // context.lineWidth = math.mapRange(-randRotate, -1, 1, 0, 12)
      rotation = math.mapRange(i, 0, cellNum, 0, 90)
      context.rotate(math.degToRad(rotation))
      // context.rotate(math.degToRad(math.mapRange(i, 0, cellNum, 90, 0)))

      context.beginPath()
      context.moveTo(w * -0.5, 0)
      context.lineTo(w * 0.4, 0)
      context.stroke()

      context.restore()
    }

    const squarew = cellw * 4
    const squareh = cellh * 4
    const squarex =width * 0.25 - cellw * 0.5
    const squarey =height * 0.28
    // context.fillRect(squarex, squarey, squarew, squareh)

  };
};

canvasSketch(sketch, settings);
