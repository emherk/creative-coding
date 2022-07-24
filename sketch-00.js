const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 600, 600 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#5EAF33";
    context.fillRect(0, 0, width, height);

    context.lineWidth = 4;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let rectWidth = 50;
        let rectHeight = 50;
        let gap = 20;
        let x = 368 + (rectWidth + gap) * i;
        let y = 57 + (rectHeight + gap) * j;

        context.lineWidth = 4;
        context.beginPath();
        context.rect(x, y, rectWidth, rectHeight);
        context.stroke();

        if (Math.random() > 0.5) {
          let innerGap = 20;
          context.lineWidth = 8;
          context.beginPath();
          context.rect(
            x + innerGap / 2,
            y + innerGap / 2,
            rectWidth - innerGap,
            rectHeight - innerGap
          );
          context.stroke();
        }
      }
    }
    const linewidths = [2, 8, 2]
    for (i = 0; i < 3; i++) {
      context.lineWidth = linewidths[i];
      context.beginPath();
      context.arc((i* 100)+ 200, (i * 100) + 200, Math.sqrt(2 * 100 * 100), 0, 2 * Math.PI);
      context.stroke();
    }

    // context.beginPath()
    // context.rect(50, 412, 230, 230)
    // context.stroke()
  };
};

canvasSketch(sketch, settings);
