class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 300;
        
        // Game state
        this.isGameOver = false;
        this.score = 0;
        this.highScore = 0;
        this.gameSpeed = 5;
        this.lastTime = 0;
        this.animationId = null;
        
        // Game elements
        this.dino = {
            x: 50,
            y: this.canvas.height - 60,
            width: 40,
            height: 40,
            jumping: false,
            jumpForce: 0,
            jump() {
                this.jumping = true;
                this.jumpForce = -12;
            }
        };
        
        this.cacti = [];
        this.cactusTimer = 0;
        this.cactusInterval = 1500;
        
        // Bind methods
        this.gameLoop = this.gameLoop.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        
        // Setup event listeners
        window.addEventListener('keydown', this.handleKeyPress);
        
        // Start game
        this.init();
    }

    handleKeyPress(e) {
        if (e.code === 'Space') {
            if (this.isGameOver) {
                this.restart();
            } else if (!this.dino.jumping) {
                this.dino.jump();
            }
        }
    }

    gameLoop(currentTime = 0) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.draw();

        if (!this.isGameOver) {
            this.animationId = requestAnimationFrame(this.gameLoop);
        }
    }

    update(deltaTime) {
        if (this.isGameOver) return;

        // Update dino
        if (this.dino.jumping) {
            this.dino.y += this.dino.jumpForce;
            this.dino.jumpForce += 0.8;

            if (this.dino.y >= this.canvas.height - this.dino.height) {
                this.dino.y = this.canvas.height - this.dino.height;
                this.dino.jumping = false;
            }
        }

        // Update cacti
        this.cactusTimer += deltaTime;
        if (this.cactusTimer >= this.cactusInterval) {
            this.spawnCactus();
            this.cactusTimer = 0;
        }

        this.cacti.forEach(cactus => {
            cactus.x -= this.gameSpeed;
        });
        this.cacti = this.cacti.filter(cactus => cactus.x > -cactus.width);

        // Check collisions
        this.checkCollisions();

        // Update score
        this.score += 0.1;
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw ground
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(0, this.canvas.height - 20, this.canvas.width, 20);

        // Draw dino as two red transparent circles
        this.ctx.fillStyle = 'rgba(30, 1, 1, 0.6)';
        // big circle (body)
        this.ctx.beginPath();
        this.ctx.arc(this.dino.x + this.dino.width / 2, this.dino.y + this.dino.height * 0.75, 20, 0, Math.PI * 2);
        this.ctx.fill();
        // small circle (head)
        this.ctx.beginPath();
        this.ctx.arc(this.dino.x + this.dino.width / 2, this.dino.y + this.dino.height * 0.25, 12, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw cacti
        this.ctx.fillStyle = '#2E8B57';
        this.cacti.forEach(cactus => {
            this.ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);
        });

        // Draw score
        this.ctx.fillStyle = '#333';
        this.ctx.font = '20px "Press Start 2P"';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Score: ${Math.floor(this.score)}`, 20, 30);
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`High Score: ${Math.floor(this.highScore)}`, this.canvas.width - 20, 30);
    }

    spawnCactus() {
        this.cacti.push({
            x: this.canvas.width,
            y: this.canvas.height - 60,
            width: 20,
            height: 40
        });
    }

    checkCollisions() {
        for (let cactus of this.cacti) {
            if (
                this.dino.x < cactus.x + cactus.width &&
                this.dino.x + this.dino.width > cactus.x &&
                this.dino.y < cactus.y + cactus.height &&
                this.dino.y + this.dino.height > cactus.y
            ) {
                this.gameOver();
                return;
            }
        }
    }

    gameOver() {
        const finalScore = Math.floor(this.score);

        // Reset score immediately when player loses
        this.score = 0;

        this.isGameOver = true;
        cancelAnimationFrame(this.animationId);

        // Show game over screen
        const gameOverDiv = document.querySelector('.game-over');
        if (gameOverDiv) {
            gameOverDiv.classList.remove('hidden');
            gameOverDiv.querySelector('h2').textContent = 'Game Over!';
            gameOverDiv.querySelector('p').textContent = `Final Score: ${finalScore}`;
        }
    }

    restart() {
        this.isGameOver = false;
        this.score = 0;
        this.gameSpeed = 5;
        this.dino.y = this.canvas.height - this.dino.height;
        this.dino.jumping = false;
        this.cacti = [];
        this.cactusTimer = 0;

        const gameOverDiv = document.querySelector('.game-over');
        if (gameOverDiv) {
            gameOverDiv.classList.add('hidden');
        }

        this.lastTime = performance.now();
        this.gameLoop();
    }

    init() {
        this.lastTime = performance.now();
        this.gameLoop();
    }
}

// Initialize game when window loads
window.addEventListener('load', () => {
    new Game();
});
