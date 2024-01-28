
// This code is for the movement and the "drawing" effect

document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const worldSize = { width: 40, height: 20 };
    let playerPosition = { x: 20, y: 10 };
    const worldMap = generateWorldMap(worldSize);
    const exploredMap = createExploredMap(worldSize);
    
    // Original function to generate the world map
    function generateWorldMap(size) {
        let map = [];
        for (let y = 0; y < size.height; y++) {
            let row = [];
            for (let x = 0; x < size.width; x++) {
                row.push(generateTerrainSymbol());
            }
            map.push(row);
        }
        return map;
    }

    // Modified function to create an initially blank explored map
    function createExploredMap(size) {
        let map = [];
        for (let y = 0; y < size.height; y++) {
            let row = [];
            for (let x = 0; x < size.width; x++) {
                row.push(' '); // Initially blank
            }
            map.push(row);
        }
        // Reveal the initial 4x4 area around the player
        revealArea(playerPosition.x, playerPosition.y);
        return map;
    }

    function generateTerrainSymbol() {
        const symbols = ['^', '!', '~', '#', '*', '.'];
        const index = Math.floor(Math.random() * symbols.length);
        return symbols[index];
    }

    // New function to reveal a 4x4 area around a given position
    function revealArea(x, y) {
        for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
                let revealX = x + dx;
                let revealY = y + dy;
                if (revealX >= 0 && revealX < worldSize.width && revealY >= 0 && revealY < worldSize.height) {
                    exploredMap[revealY][revealX] = worldMap[revealY][revealX];
                }
            }
        }
    }

    function drawWorld() {
        let display = '';
        for (let y = 0; y < worldSize.height; y++) {
            for (let x = 0; x < worldSize.width; x++) {
                if (x === playerPosition.x && y === playerPosition.y) {
                    display += '@';
                } else {
                    display += exploredMap[y][x];
                }
            }
            display += '\n';
        }
        gameArea.textContent = display;
    }

    function handleKeyPress(event) {
        switch(event.key) {
            case 'ArrowUp':
                movePlayer(0, -1);
                break;
            case 'ArrowDown':
                movePlayer(0, 1);
                break;
            case 'ArrowLeft':
                movePlayer(-1, 0);
                break;
            case 'ArrowRight':
                movePlayer(1, 0);
                break;
        }
        drawWorld();
    }

    function movePlayer(dx, dy) {
        const newX = Math.max(0, Math.min(playerPosition.x + dx, worldSize.width - 1));
        const newY = Math.max(0, Math.min(playerPosition.y + dy, worldSize.height - 1));
        
        if (newX !== playerPosition.x || newY !== playerPosition.y) {
            playerPosition.x = newX;
            playerPosition.y = newY;
            revealArea(newX, newY); // Reveal new area after moving
        }
    }

    document.addEventListener('keydown', handleKeyPress);
    drawWorld();
});
