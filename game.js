const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let targets = [];
let bullets = [];
let score = 0;

// Load the target images
const targetImages = ['./images/target1.png', './images/target2.png', './images/target3.png'];
const loadedImages = targetImages.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
});

class Target {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.image = image;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.color = 'yellow';
        this.speed = 5;
    }

    update() {
        this.y -= this.speed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

function spawnTarget() {
    const x = Math.random() * (canvas.width - 50);
    const y = Math.random() * canvas.height / 2;

    // Randomly select an image for the target
    const randomImage = loadedImages[Math.floor(Math.random() * loadedImages.length)];
    targets.push(new Target(x, y, randomImage));
}

function shoot(event) {
    const x = event.clientX;
    const y = event.clientY;
    bullets.push(new Bullet(x, y));
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw targets
    targets.forEach((target, index) => {
        target.draw();
    });

    // Update and draw bullets
    bullets.forEach((bullet, bIndex) => {
        bullet.update();
        bullet.draw();

        // Check collision with targets
        targets.forEach((target, tIndex) => {
            if (
                bullet.x > target.x &&
                bullet.x < target.x + target.width &&
                bullet.y > target.y &&
                bullet.y < target.y + target.height
            ) {
                targets.splice(tIndex, 1);
                bullets.splice(bIndex, 1);
                score++;
            }
        });

        // Remove bullets if out of bounds
        if (bullet.y < 0) {
            bullets.splice(bIndex, 1);
        }
    });

    // Display score
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${score}`, 10, 30);

    requestAnimationFrame(updateGame);
}

// Event listeners
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

canvas.addEventListener('click', shoot);

// Game loop
setInterval(spawnTarget, 1000);
updateGame();