export default function WallCollision(ball, player, canvas, racquet) {

    if (ball.y + ball.rad >= canvas.height) {
        player.lives--
        ball.x = racquet.x - canvas.width / 2 + racquet.width - 30;
        ball.y = racquet.y - 10
        ball.dx = 6 * (Math.random() * 2 - 1)
        ball.dy = -6;
    }
    if (ball.y - ball.rad < 0) {
        ball.dy *= -1;
    }
    if (ball.x + ball.rad >= canvas.width || ball.x - ball.rad < 0) {
        ball.dx *= -1;
    }
}