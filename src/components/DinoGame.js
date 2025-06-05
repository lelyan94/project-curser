import React, { useEffect, useRef } from 'react';
import './DinoGame.css';

const DinoGame = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef({
    dino: {
      x: 50,
      y: 0,
      width: 40,
      height: 40,
      jumping: false,
      jumpForce: 0,
      gravity: 0.6
    },
    obstacles: [],
    score: 0,
    gameOver: false,
    speed: 5
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastTime = 0;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 300;

    const handleKeyPress = (e) => {
      if (e.code === 'Space' && !gameRef.current.dino.jumping && !gameRef.current.gameOver) {
        gameRef.current.dino.jumping = true;
        gameRef.current.dino.jumpForce = -15;
      }
    };

    const spawnObstacle = () => {
      if (Math.random() < 0.02) {
        gameRef.current.obstacles.push({
          x: canvas.width,
          y: canvas.height - 40,
          width: 20,
          height: 40
        });
      }
    };

    const updateGame = (deltaTime) => {
      const game = gameRef.current;
      
      // Update dino position
      if (game.dino.jumping) {
        game.dino.y += game.dino.jumpForce;
        game.dino.jumpForce += game.dino.gravity;

        if (game.dino.y >= canvas.height - game.dino.height) {
          game.dino.y = canvas.height - game.dino.height;
          game.dino.jumping = false;
        }
      }

      // Update obstacles
      game.obstacles = game.obstacles.filter(obstacle => {
        obstacle.x -= game.speed;
        return obstacle.x > -obstacle.width;
      });

      // Spawn new obstacles
      spawnObstacle();

      // Check collisions
      game.obstacles.forEach(obstacle => {
        if (
          game.dino.x < obstacle.x + obstacle.width &&
          game.dino.x + game.dino.width > obstacle.x &&
          game.dino.y < obstacle.y + obstacle.height &&
          game.dino.y + game.dino.height > obstacle.y
        ) {
          game.gameOver = true;
        }
      });

      // Update score
      if (!game.gameOver) {
        game.score += deltaTime * 0.1;
      }
    };

    const draw = () => {
      const game = gameRef.current;
      
      // Clear canvas
      ctx.fillStyle = '#87CEEB'; // Sky blue background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ground
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

      // Draw dino
      ctx.fillStyle = '#333';
      ctx.fillRect(game.dino.x, game.dino.y, game.dino.width, game.dino.height);

      // Draw obstacles
      ctx.fillStyle = '#666';
      game.obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });

      // Draw score
      ctx.fillStyle = '#000';
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${Math.floor(game.score)}`, 20, 30);

      // Draw game over
      if (game.gameOver) {
        ctx.fillStyle = '#000';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over!', canvas.width/2 - 100, canvas.height/2);
      }
    };

    const gameLoop = (timestamp) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      updateGame(deltaTime);
      draw();

      if (!gameRef.current.gameOver) {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="game-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DinoGame; 