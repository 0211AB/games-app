export default function ResetBall(ball, canvas, racquet) {
    ball.x = racquet.x;
    ball.y = racquet.y - 80;
    ball.dx = 6;
    ball.dy = -6;
}