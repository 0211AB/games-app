export class Ball {
    x;
    y;
    rad;
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "lime";
        ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        ctx.strokeStyle = "lime";
        ctx.strokeWidth = 4;
        ctx.fill();
        ctx.stroke();
    }
}