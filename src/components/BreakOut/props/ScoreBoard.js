export default function ScoreBoard(ctx, player, canvas) {
    ctx.font = "18px 'Press Start 2P', cursive"
    ctx.fillStyle = "white"
    ctx.fillText(`LIVES: `, 20, 33)

    ctx.font = "20px 'Press Start 2P', cursive"
    ctx.fillStyle = "red"
    let gap = 0;
    for (let i = 0; i < player.lives; i++) {
        // ctx.fillText(`♥`, 130 + gap, 30)
        ctx.fillText(`o`, 100 + gap, 30)
        gap += 30;
    }

    ctx.font = "20px 'Press Start 2P', cursive"
    ctx.fillStyle = "white"
    ctx.fillText(`${player.score} POINTS`, canvas.width - 240, 33)
}