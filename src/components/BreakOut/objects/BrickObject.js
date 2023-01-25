export class SingleBrick {
    x;
    y;
    width;
    height;
    colors;
    broke;
    constructor(x, y, w, h, c) {
        this.x = x - w;
        this.y = y;
        this.width = w;
        this.height = h;
        this.colors = c;
        this.broke = false;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.broke ? "rgba(19, 73, 89, 0)" : this.colors[1];
        ctx.lineWidth = 5;
        ctx.strokeStyle = this.broke ? "rgba(19, 73, 89, 0)" : "transparent";
        ctx.fill();
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}