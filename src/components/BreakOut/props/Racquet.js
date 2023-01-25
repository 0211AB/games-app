import { RacquetObject } from "../objects/RacquetObject";

export default function Racquet(ctx, canvas, data) {
    let racquet = new RacquetObject(data.x, canvas.height, data.width);
    racquet.move(ctx);
    if (data.x <= 0) {
        data.x = 0;
    } else if (data.x + data.width >= canvas.width) {
        data.x = canvas.width - data.width;
    }
}