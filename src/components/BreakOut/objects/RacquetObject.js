export class RacquetObject {
    x;
    y;
    height
    width
    colors;
    // broke:boolean
    constructor(x, y, w) {
        this.x = x;
        this.y = y - 30;
        this.height = 20;
        this.width = w;
        this.colors = ["red", "lime"];
    }
    move(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.colors[1];
        ctx.strokeStyle = "lime";
        ctx.lineWidth = 1;
        ctx.fillStyle = this.colors[1];
        ctx.shadowBlur = 0;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}