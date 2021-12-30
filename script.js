import Player from "./playerClass.js"
import Item from "./itemClass.js"
let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    blocks = [];
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx.beginPath();
ctx.stroke();
let inverseScale = 16,
    colors = ["red", "green", "blue", "orange", "pink", "yellow", "purple"],
    getRandomInt = (a, b) => {
        let rand = Math.random() * 100,
            range = b - a,
            num = (range / 100) * rand;
        return a + Math.ceil(num)
    },
    debugRender = () => {
        for (let i = 0; i < inverseScale; i++) {
            ctx.beginPath();
            ctx.moveTo((canvas.width / inverseScale) * i, 0)
            ctx.lineTo((canvas.width / inverseScale) * i, canvas.height)
            ctx.moveTo(0, (canvas.width / inverseScale) * i)
            ctx.lineTo(canvas.width, (canvas.width / inverseScale) * i)
            ctx.stroke();
        }
    },
    collisionDetect = (rect1, rect2) => {
        let collisions = 0,
            collision = false;
        for (let i = 0; i < rect2.length; i++) {
            if (rect1.x < rect2[i].x + rect2[i].w &&
                rect1.x + rect1.w > rect2[i].x &&
                rect1.y < rect2[i].y + rect2[i].h &&
                rect1.h + rect1.y > rect2[i].y) {
                collisions++;
            } else {}
        }
        if (collisions > 0) {
            collision = true;
        }
        return collision
    },
    drawMap = () => {
        blocks = [];
        player.w = player.h = canvas.width / inverseScale
        for (let j = 0; j < inverseScale / 2 - 1; j++) {
            if (j % 2 != 0) {
                for (let i = 0; i < inverseScale - 2; i++) {
                    if (i % 2 != 0) {
                        blocks.push(
                            new Item(colors[getRandomInt(0, colors.length - 1)], canvas.width / inverseScale,
                                canvas.width / inverseScale, (canvas.width / inverseScale) * i,
                                (canvas.width / inverseScale) * j,
                                0, 0, 0, false, false, false))
                    }
                }
            }
        }
        for (let i = 2; i < inverseScale - 2; i++) {
            if (i % 2 == 0) {
                blocks.push(
                    new Item(colors[getRandomInt(0, colors.length - 1)], canvas.width / inverseScale,
                        canvas.width / inverseScale, (canvas.width / inverseScale) * i,
                        (canvas.width / inverseScale) * 1,
                        0, 0, 0, false, false, false));
                blocks.push(
                    new Item(colors[getRandomInt(0, colors.length - 1)], canvas.width / inverseScale,
                        canvas.width / inverseScale, (canvas.width / inverseScale) * i,
                        (canvas.width / inverseScale) * ((inverseScale / 2) - 3),
                        0, 0, 0, false, false, false))
            }
        }
        for (let i = 2; i < (inverseScale / 2) - 4; i++) {
            if (i % 2 == 0) {
                blocks.push(
                    new Item(colors[getRandomInt(0, colors.length - 1)], canvas.width / inverseScale,
                        canvas.width / inverseScale, (canvas.width / inverseScale) * (inverseScale - 3),
                        (canvas.width / inverseScale) * i,
                        0, 0, 0, false, false, false));
                blocks.push(
                    new Item(colors[getRandomInt(0, colors.length - 1)], canvas.width / inverseScale,
                        canvas.width / inverseScale, (canvas.width / inverseScale) * 1,
                        (canvas.width / inverseScale) * (i + 2),
                        0, 0, 0, false, false, false))
            }
        }
    }

document.addEventListener("keydown", (e) => {
    if (player.x > 0) {
        if (e.key == "ArrowLeft") {
            player.x -= player.w
            if (collisionDetect(player, blocks) == true) {
                player.x += player.w
            }
        }

    } else {}
    if (player.y > 0) {
        if (e.key == "ArrowUp") {
            player.y -= player.h
            if (collisionDetect(player, blocks) == true) {
                player.y += player.h
            }
        }
    } else {}
    if (player.x < canvas.width - player.w) {
        if (e.key == "ArrowRight") {
            player.x += player.w
            if (collisionDetect(player, blocks) == true) {
                player.x -= player.w
            }
        }

    } else {}
    if (player.y < canvas.height - player.h * 2) {
        if (e.key == "ArrowDown") {
            player.y += player.h
            if (collisionDetect(player, blocks) == true) {
                player.y -= player.h
            }
        }
    } else {}
    if (e.key == "D") {
        if (dPressCount == 0) {
            debug = true
            dPressCount++;
        } else {
            debug = false;
            dPressCount = 0;
        }
    }
    if (e.key == "-") {
        drawMap()
        if (inverseScale > 16) {
            inverseScale -= 4;
        }
        console.log(inverseScale)
    }
    if (e.key == "=") {
        drawMap()
        inverseScale += 4;
    }
})
let player = new Player("", canvas.width / inverseScale, canvas.width / inverseScale, 0, 0, 0, 0, 0, true, false),
    debug = false,
    dPressCount = 0;
drawMap()
let colliding = false,
    gameLoop = () => {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (debug == true) {
            debugRender();
        }
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].render(ctx)
        }
        player.render(ctx)
        requestAnimationFrame(gameLoop);
    }

requestAnimationFrame(gameLoop);