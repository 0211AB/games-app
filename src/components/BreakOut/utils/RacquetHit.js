export default function RacquetHit(ball, racquet) {
    if (ball.x < racquet.x + racquet.width && ball.x > racquet.x && racquet.y < racquet.y + racquet.height && ball.y + ball.rad > racquet.y - racquet.height / 2) {
        let collidePoint = ball.x - (racquet.x + racquet.width / 2);

        collidePoint = collidePoint / (racquet.width / 2);

        let angle = (collidePoint * Math.PI) / 3;

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -ball.speed * Math.cos(angle);
    }
}