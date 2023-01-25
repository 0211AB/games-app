export default function AllBroken(bricks, player, canvas, ball, brickData) {
    let total = 0;
    for (let i = 0; i < bricks.length; i++) {
        if (bricks[i].broke) {
            total++
        }
    }

    if (total === bricks.length) {
        player.level++;
        ball.y = canvas.height - 20;
        brickData.y = 50

    }
}