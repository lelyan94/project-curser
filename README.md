# Loly Runner

**Play the game online here:**  
[https://pro1-bc1cd.web.app/](https://pro1-bc1cd.web.app/)

---

## Overview

Loly Runner is a simple, addictive side-scrolling jumping game built with **JavaScript** and **HTML5 Canvas**.  
Players control a uniquely designed character made of two semi-transparent red circles (a large body and smaller head) who must jump over moving cactus obstacles.  
The game features smooth animations, responsive controls, and an increasing score system, providing a fun experience inspired by classic endless runner games.

---

## How to Play

- Press the **Space Bar** to jump.  
- Avoid incoming cactus obstacles that move from right to left.  
- Colliding with a cactus ends the game.  
- After game over, press **Space Bar** again to restart.

---

## Features and Mechanics

### Character Design

- The player character consists of two overlapping circles:  
  - Large circle (20px radius) for the body.  
  - Smaller circle (12px radius) for the head.  
- Colored with semi-transparent red (`rgba(255, 0, 0, 0.6)`) to create a stylish, smooth look.  
- Smooth jump physics with gravity and jump force simulate natural movement.

### Obstacles

- Green cactus blocks move leftwards across the screen.  
- Spawn at regular intervals.  
- Collision detection ends the game immediately.

### Scoring

- Score increases continuously while playing.  
- Current score is shown on the top-left corner.  
- High score is shown on the top-right corner and persists between games.  
- Score resets to zero upon game over.

### Game Speed and Difficulty

- Initial speed set at 5 units per frame.  
- Obstacles spawn every 1.5 seconds.  
- Difficulty can be increased in future updates.

---

## Technologies Used

- **JavaScript** for game logic, physics, input, and animations.  
- **HTML5 Canvas** for rendering graphics.  
- **CSS** for styling and layout.  
- **Firebase Hosting** for deploying the live game online.  
- **Google Fonts** ("Press Start 2P") for retro-style text.

---

## How to Run Locally

1. Clone or download the repository.  
2. Open `index.html` in any modern browser.  
3. Use the Space Bar to play.

---

## Live Demo

Try the game live here:  
[https://pro1-bc1cd.web.app/](https://pro1-bc1cd.web.app/)

---

## Project Structure

- `index.html` — HTML markup with canvas element.  
- `style.css` — Styles and font imports.  
- `game.js` — JavaScript game logic including drawing, updates, controls, and scoring.

---

## Future Improvements

- Add moving or varying obstacles.  
- Multiple character skins or customizations.  
- Sound effects and background music.  
- Dynamic difficulty scaling.  
- Mobile and touch support enhancements.

---

## License

Open-source for personal and educational use.

---

## Credits

- Developed by [Your Name]  
- Inspired by Chrome’s Dino Runner  
- Hosted on Firebase Hosting

