// Inicializando o estado do jogo
let posX = 375; // Posição inicial do personagem no eixo X (centro do mapa)
let posY = 275; // Posição inicial do personagem no eixo Y (centro do mapa)
const speed = 5; // Velocidade de movimento do personagem

let health = 100; // Vida do personagem
let isAttacking = false; // Controle de ataque

const character = document.getElementById('character'); // Obtendo o elemento do personagem
const healthValue = document.getElementById('health-value'); // Barra de vida
const enemy = document.getElementById('enemy'); // Inimigo

// Limites do mapa
const mapWidth = 1082;
const mapHeight = 732;

// Posições do inimigo (inicial)
let enemyX = 100;
let enemyY = 100;
let enemyHealth = 100; // Vida do inimigo

// Função para mover o personagem
function moveCharacter() {
  if (posX < 0) posX = 0;
  if (posY < 0) posY = 0;
  if (posX > mapWidth - 50) posX = mapWidth - 50;
  if (posY > mapHeight - 50) posY = mapHeight - 50;

  character.style.left = `${posX}px`;
  character.style.top = `${posY}px`;
}

// Função para atacar
function attack() {
  if (!isAttacking) {
    isAttacking = true;
    // Temporizador para efeito de ataque
    setTimeout(() => {
      isAttacking = false;
    }, 500); // Ação de ataque dura meio segundo
  }
}

// Função para verificar colisão entre personagem e inimigo
function checkCollision() {
  if (isAttacking) {
    const characterRect = character.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    if (
      characterRect.left < enemyRect.right &&
      characterRect.right > enemyRect.left &&
      characterRect.top < enemyRect.bottom &&
      characterRect.bottom > enemyRect.top
    ) {
      // Colidiu, inimigo perde vida
      enemyHealth -= 10;
      if (enemyHealth <= 0) {
        alert("Inimigo derrotado!");
        resetEnemy();
      }
    }
  }
}

// Função para mover o inimigo
function moveEnemy() {
  // Inimigo se move aleatoriamente no mapa
  const direction = Math.random();
  if (direction < 0.25) {
    enemyX += 5; // Mover para a direita
  } else if (direction < 0.5) {
    enemyX -= 5; // Mover para a esquerda
  } else if (direction < 0.75) {
    enemyY += 5; // Mover para baixo
  } else {
    enemyY -= 5; // Mover para cima
  }

  // Garantir que o inimigo não saia do mapa
  enemyX = Math.max(0, Math.min(mapWidth - 50, enemyX));
  enemyY = Math.max(0, Math.min(mapHeight - 50, enemyY));

  enemy.style.left = `${enemyX}px`;
  enemy.style.top = `${enemyY}px`;
}

// Função para reiniciar o inimigo quando derrotado
function resetEnemy() {
  enemyHealth = 100; // Reinicia a vida do inimigo
  enemyX = Math.random() * (mapWidth - 50); // Posição aleatória
  enemyY = Math.random() * (mapHeight - 50);
  enemy.style.left = `${enemyX}px`;
  enemy.style.top = `${enemyY}px`;
}

// Função para atualizar a vida do personagem
function updateHealth() {
  healthValue.textContent = health;
}

// Controle de teclas para movimento e ataque
document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowUp') {
    posY -= speed; // Move para cima
  } else if (event.key === 'ArrowDown') {
    posY += speed; // Move para baixo
  } else if (event.key === 'ArrowLeft') {
    posX -= speed; // Move para a esquerda
  } else if (event.key === 'ArrowRight') {
    posX += speed; // Move para a direita
  } else if (event.key === ' ') { // Pressionando a tecla espaço
    attack(); // Realiza o ataque
  }
  moveCharacter(); // Atualiza a posição do personagem
  checkCollision(); // Verifica se houve colisão com o inimigo
  updateHealth(); // Atualiza a barra de vida
});

// Função de atualização do jogo (para mover o inimigo)
function gameLoop() {
  moveEnemy(); // Move o inimigo
  requestAnimationFrame(gameLoop); // Continua o loop
}

// Inicia o loop do jogo
gameLoop();
