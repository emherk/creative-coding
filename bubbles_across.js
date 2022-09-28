const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
    dimensions: [2000, 2000],
    animate: true,
};

const range = random.range

function rgba(r, g, b, a) {
    return `rgba(${r},${g},${b},${a})`
}

const sketch = ({context, width, height}) => {

    const bubbles = []
    const m = width / 550
    const n = height /350

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            const w = i / m * width
            const h = j / n * height
            const velx = width / 1000 * range(.5, 1)
            const vely = height / 1000 * range(0.5, 1)
            const rad = width / 100 * range(0.5, 0.7)
            const color = rgba(range(0, 255), range(0, 255), range(0, 255), range(0.5, 0.8))
            // const color = rgba(range(208, 255), range(208, 255), range(208, 255), range(0.1, 0.8))

            bubbles.push(
                new Bubble(
                    new Pair(w, h),
                    new Pair(velx, vely),
                    rad,
                    color
                ))
        }
    }
    return ({context, width, height}) => {
        context.fillStyle = 'brown';
        context.fillRect(0, 0, width, height);

        for (let i = 0; i < bubbles.length; i++) {
            const bubble1 = bubbles[i];
            for (let j = i + 1; j < bubbles.length; j++) {
                const bubble2 = bubbles[j];
                const distance = bubble1.distanceTo(bubble2);
                const maxDistWithLine = 600
                if(distance > maxDistWithLine) continue
                context.lineWidth = math.mapRange(distance, 0, maxDistWithLine, 11, 1)
                context.strokeStyle = '#2aa5a5'
                context.beginPath()
                context.moveTo(bubble1.pos.x, bubble1.pos.y)
                context.lineTo(bubble2.pos.x, bubble2.pos.y)
                context.stroke()

            }

        }

        bubbles.forEach(bubble => {
                bubble.update()
                bubble.draw(context)
                bubble.bounce(width, height)
            }
        )
    };
};

// function Pair(x, y) {
//     return {x: x, y: y}
// }
class Pair {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    getSpeed() {
        return Math.sqrt(this.x + this.y)
    }
}

class Bubble {
    constructor(pos, vel, rad, color) {
        this.initPos = {x: pos.x, y: pos.y}
        this.maxPos = {x: pos.x + 50, y: pos.y + 50}
        this.pos = pos
        this.vel = vel
        this.rad = rad
        this.color = color
    }

    distanceTo(other){
        const dx = this.pos.x - other.pos.x
        const dy = this.pos.y - other.pos.y
        return Math.sqrt(dx ** 2 + dy ** 2)
    }

    update() {
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }

    bounce(width, height) {
        if (this.pos.x >= width || this.pos.x <= 0) {
            this.vel.x *= -1
        }
        if (this.pos.y >= height || this.pos.y <= 0) {
            this.vel.y *= -1
        }
    }

    bounceRandomFall() {
        // const speed = math.random.range(0.4, 1.5)
        // if (this.pos.x > this.maxPos.x) {
        //     this.vel = new Pair(-speed, -speed)
        // }
        // if(this.pos.x < this.initPos.x){
        //     this.vel = new Pair(speed, speed)
        // }
    }

    getSpeed() {
        return this.vel.getSpeed()
    }

    draw(context) {
        context.save();
        context.translate(this.pos.x, this.pos.y);

        context.lineWidth = 16
        // context.fillStyle = '#FFD5E9'
        context.fillStyle = 'white'//'#FFF8E3'
        context.strokeStyle = this.color

        context.beginPath();
        context.arc(0, 0, this.rad, 0, Math.PI * 2);
        context.fill();
        context.stroke();

        context.restore();
    }


}

canvasSketch(sketch, settings);
