const canvasSketch = require("canvas-sketch");
const { degToRad } = require("canvas-sketch-util/math");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#FFD6D4";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";
    context.strokeStyle = "black";

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.006;
    let h = height * 0.09;
    const radius = width * 0.3;

    const slices = 48;
    const angleBetween = math.degToRad(360 / slices);
    const drawCircle = () => {
      for (let i = 0; i < slices * 0.75; i++) {
        const angle = i * angleBetween;

        context.save();
        context.translate(
          cx + radius * Math.sin(angle),
          cy + radius * Math.cos(angle)
        );
        context.rotate(-angle);
        context.scale(random.range(0.3, 2), random.range(0.3, 0.7));

        context.beginPath();
        context.rect(-w * 0.5, -h * 0.5, w, h);
        context.fill();
        context.restore();

        context.save();
        context.translate(cx, cy);
        context.rotate(-angle + degToRad(45));
        context.lineWidth = random.range(5, 10);

        context.beginPath();
        // context.arc(0, 0, radius * random.range(0.9,.2), 0, angleBetween * random.range(0.3, 5));
        context.arc(
          0,
          0,
          radius * random.range(0.9, 1.2),
          0,
          angleBetween * random.range(0.5, 10)
        );
        context.stroke();
        context.restore();
      }
    };

    drawCircle();

    // context.fillStyle = "#FFD6D4"
    // context.beginPath();
    // context.fillRect(0, 0, width * 0.5 , height * 0.5)

    // for (i = 0; i < 3; i++) {
    //   context.save();
    //   context.scale(0.5, 0.5);
    //   context.translate(cx, cy);
    //   drawCircle();
    // }

    // context.beginPath();
    // context.lineWidth = 19;
    // context.arc(cx, cy, 4, 0, math.degToRad(360));
    // context.stroke();
  };
};

canvasSketch(sketch, settings);
