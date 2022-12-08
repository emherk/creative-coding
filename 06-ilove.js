const canvasSketch = require('canvas-sketch');
const Tweakpane = require('tweakpane');
const {Pane} = require("tweakpane");
const {random, math} = require("canvas-sketch-util");

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true
};
const params = {
  cols: 1,
  rows: 1,
  bgColor: '#f5f5dc',
  // lineColor: '#ffff00',
  // circleColor: '#c80b0b',
  // lineWidth: 65,
  // radius: 20,
  fontSize: 93.9,
  textColor: '#fb8da0',
}

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({title: 'Grid'})
  folder.addInput(params, 'cols', {min: 1, max: 100, step: 1})
  folder.addInput(params, 'rows', {min: 1, max: 100, step: 1})
  folder.addInput(params, 'fontSize', {min: 1, max: 500})
  folder.addInput(params, 'bgColor')
  folder.addInput(params, 'textColor')
  // folder.addInput(params, 'lineWidth', {min: 1, max: 500})
  // folder.addInput(params, 'radius', {min: 0, max: 500})
  // folder.addInput(params, 'lineColor')
  // folder.addInput(params, 'circleColor')
}


const sketch = () => {

  return ({ context, width, height, frame }) => {
    const update = () => {

    }
    const lineColor = params.lineColor
    const bgColor =  params.bgColor
    const circleColor = params.circleColor
    const circleRad = params.radius

    console.log(params)
    context.fillStyle = bgColor
    context.fillRect(0, 0, width, height);
    const cols = params.cols
    const rows = params.rows
    const N = cols * rows
    const xGridSize = 2 * width
    const yGridSize = 2 * height
    const xMargin =(width - xGridSize) / 2
    const yMargin =(height - yGridSize)/ 2
    const xCellSize = xGridSize / cols
    const yCellSize = yGridSize / rows

    context.lineWidth = params.lineWidth
    context.strokeStyle = circleColor
    context.save()

    for (let i = 0; i < N; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)

      const x = xMargin + col * xCellSize + xCellSize / 2
      const y = yMargin + row * yCellSize + yCellSize / 2
      context.rotate(math.degToRad(-20))

      context.fillStyle= params.textColor
      context.font = `${params.fontSize}px serif`
      context.textBaseline = 'top'
      context.fillText('I LOVE YOU', x, y)
      // const interpRow = math.mapRange(row, 0, rows, 1, cols)
      // // if(col > cols - interpRow) continue;
      // context.save()
      //
      // // const noise = random.noise2D(x, y, 0.001, 0.8)
      // // const noise = random.noise1D(x, 1, 1)
      // // Red circles
      // const noise = 2
      // context.strokeStyle = circleColor
      // context.beginPath();
      // // const endAngle = noise < 0.1 ? 1 : 2
      // context.arc(x, y, circleRad, 0, noise * Math.PI)
      // context.stroke()
      //
      // context.strokeStyle = 'black'
      // // Black circles
      // context.beginPath()
      // context.arc(x - 25, y - 25, circleRad, 0, noise * Math.PI)
      // context.stroke()

    }

    // context.lineWidth = params.lineWidth
    // context.strokeStyle = lineColor
    // const lineHigher = - height / 15
    // context.beginPath()
    // context.moveTo(-50,height / 3 + lineHigher)
    // context.lineTo(width + 50, height /1.75 + lineHigher)
    // context.stroke()

  };
};

createPane()

canvasSketch(sketch, settings);
