const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const degToRad = (deg) => {
  return deg / 180 * Math.PI
}

function randomRange(min, max) { 
    return Math.random() * (max - min) + min;
} 

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle= 'black'

    const cx = width * 0.5
    const cy = height * 0.5
    const w = width * 0.006
    let hMultiplier = 0.60
    let h = height * hMultiplier
    const radius = width * 0.3

    const numRect =24 
    const angleBetween = degToRad(360 / numRect)
    for(let i = 0; i < numRect; i++) {
      const angle = i * angleBetween

      context.save()
      context.translate(cx + radius * Math.sin(angle), cy + radius * Math.cos(angle))
      context.rotate(angle)

      context.beginPath()
      context.rect(-w * 0.5 , -h * 0.5, w, h)
      context.fill()
      context.restore()
    }

    context.beginPath()
    context.lineWidth = 19
    context.arc(cx, cy, 4, 0, degToRad(360))
    context.stroke()

  };
};

canvasSketch(sketch, settings);
