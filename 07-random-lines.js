const canvasSketch = require('canvas-sketch');
const Tweakpane = require('tweakpane');
const {Pane} = require("tweakpane");
const {math, random} = require("canvas-sketch-util");

const settings = {
  dimensions: [ 1500, 1500],
  animate: true,
};


const sketch = ({context, width, height}) => {
  function rgba(r, g, b, a) {
    return `rgba(${r},${g},${b},${a})`
  }
  const range = random.range

  const params = {
    heightDiff: 20,
    centerSizeW: 0.1,
    centerSizeH: 0.43,
    N: 22,
    lineWidth: 25,
    bgColor: '#2c4943',
    distance: 40
  }

  const createPane = () => {
    const pane = new Tweakpane.Pane();
    let folder;

    folder = pane.addFolder({title: 'Lines'})
    folder.addInput(params, 'centerSizeW', {min: 0, max: 1})
    folder.addInput(params, 'centerSizeH', {min: 0, max: 1})
    folder.addInput(params, 'N', {min: 1, max: 50, step:1})
    folder.addInput(params, 'bgColor')
    folder.addInput(params, 'lineWidth', {min: 0, max: 50})
    folder.addInput(params, 'distance', {min: 20, max: 500})
    folder.addInput(params, 'heightDiff', {min: 0, max: 500})

  }

  createPane()


  const randPairs = []
  for (let i = 0; i < 500; i++) {
    const randLeft = range(0, 1)
    const randRight = range(0, 1)
    const color = rgba(range(0, 255), range(0, 255), range(0, 255), range(0.5, 0.8))

    randPairs.push({randLeft, randRight, color})
  }

  return ({ context, width, height }) => {
    context.fillStyle = params.bgColor;
    context.fillRect(0, 0, width, height);

    const lineH = height * params.centerSizeH
    const lineW = width * params.centerSizeW
    const marginx = (width - lineW) / 2
    const marginy = (height - lineH) / 2

    const distance = params.distance
    const diff = params.heightDiff
    const middleLine = height / 2
    for (let i = 0; i < params.N; i++) {
      const offset = distance * i
      const lineHeight = lineH - diff * i
      const lineMid = middleLine
      const lineStartY = lineMid + lineHeight / 2
      const lineEndY = lineMid - lineHeight / 2



      context.lineWidth = params.lineWidth
      const color = rgba(range(0, 255), range(0, 255), range(0, 255), range(0.5, 0.8))
      context.strokeStyle= color
      context.beginPath()
      context.moveTo(marginx - offset, lineStartY)
      context.lineTo(marginx - offset, lineEndY)
      context.moveTo(marginx + offset + lineW, lineStartY)
      context.lineTo(marginx + offset + lineW, lineEndY)
      context.stroke()
    }


    // for (let i = 0; i < params.N; i++) {
    //   const randLeft = math.mapRange(randPairs[i].randLeft, 0, 1, 0, lineH)
    //   const randRight = math.mapRange(randPairs[i].randRight, 0, 1, 0, lineH)
    //
    //   context.lineWidth = params.lineWidth
    //   context.strokeStyle = randPairs[i].color
    //   context.beginPath()
    //   context.moveTo(marginx, marginy + randLeft)
    //   context.lineTo(marginx + lineW, marginy + randRight)
    //   context.stroke()
    // }
  };
};

canvasSketch(sketch, settings);
