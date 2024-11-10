const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
let playerPosition = 180;
const playerSpeed = 20;
let bullets = [];
let targets = [];
let score = 0;

// Move the player left or right
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && playerPosition > 0) {
    playerPosition -= playerSpeed;
    player.style.left = playerPosition + 'px';
  } else if (e.key === 'ArrowRight' && playerPosition < gameArea.offsetWidth - player.offsetWidth) {
    playerPosition += playerSpeed;
    player.style.left = playerPosition + 'px';
  } else if (e.key === ' ') {
    shoot();
  }
});

// Shoot a bullet
function shoot() {
  const bullet = document.createElement('div');
  bullet.classList.add('bullet');
  bullet.style.left = playerPosition + 18 + 'px';
  bullet.style.bottom = '50px';
  gameArea.appendChild(bullet);
  bullets.push(bullet);
}

// Spawn a target at random positions
function spawnTarget() {
  const target = document.createElement('div');
  target.classList.add('target');
  target.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 40)) + 'px';
  target.style.top = '0px';
  gameArea.appendChild(target);
  targets.push(target);
}

// Move bullets and check collisions
function moveBullets() {
  bullets.forEach((bullet, index) => {
    let bulletTop = parseInt(bullet.style.bottom);
    bullet.style.bottom = bulletTop + 5 + 'px';

    if (bulletTop > gameArea.offsetHeight) {
      bullet.remove();
      bullets.splice(index, 1);
    } else {
      targets.forEach((target, targetIndex) => {
        if (isColliding(bullet, target)) {
          bullet.remove();
          target.remove();
          bullets.splice(index, 1);
          targets.splice(targetIndex, 1);
          score++;
          console.log('Score:', score);
        }
      });
    }
  });
}

// Move targets and end game if they reach the bottom
function moveTargets() {
  targets.forEach((target, index) => {
    let targetTop = parseInt(target.style.top);
    target.style.top = targetTop + 2 + 'px';

    if (targetTop > gameArea.offsetHeight) {
      target.remove();
      targets.splice(index, 1);
      console.log('Game Over');
      alert('Game Over! Score: ' + score);
      window.location.reload();
    }
  });
}

// Check for collision between bullet and target
function isColliding(bullet, target) {
  const bulletRect = bullet.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  return !(
    bulletRect.top > targetRect.bottom ||
    bulletRect.bottom < targetRect.top ||
    bulletRect.right < targetRect.left ||
    bulletRect.left > targetRect.right
  );
}

// Game loop
function gameLoop() {
  moveBullets();
  moveTargets();
  requestAnimationFrame(gameLoop);
}

// Start the game
setInterval(spawnTarget, 1000);
gameLoop();
