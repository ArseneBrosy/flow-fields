// Flow Fields
// by Arsène Brosy
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

//region CONSTANTS
const GRID_SIZE = 20;
const SLIPERINESS = 0.3;
const PARTCLE_COUNT = 10000;
const SPEED = 5;
//endregion

//region VARIABLES
// mouse
let mouseX = 0;
let mouseY = 0;

// vectors
noise.seed(Math.random());
let vectors = [];
let perlinZoom = 0.01;
for (let y = 0; y <= Math.ceil(canvas.height / GRID_SIZE); y++) {
    let newLine = [];
    for (let x = 0; x <= Math.ceil(canvas.width / GRID_SIZE); x++) {
        newLine.push(degToVector(noise.simplex2(x * perlinZoom, y * perlinZoom) * 360));
    }
    vectors.push(newLine);
}

let particles = [];
for (let i = 0; i < PARTCLE_COUNT; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        velocityX: 0,
        velocityY: 0
    });
}
//endregion

//region FUNCTIONS
function Distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.abs(x1 - x2)**2 + Math.abs(y1 - y2)**2);
}

function degToVector(degree) {
    return {
        x: Math.cos(degree * (Math.PI / 180)),
        y: Math.sin(degree * (Math.PI / 180))
    }
}

function lerp(a, b, alpha) {
    return a + alpha * (b - a);
}

function forceAtPoint(x, y) {
    let xIndex = Math.floor(x / GRID_SIZE);
    let yIndex = Math.floor(y / GRID_SIZE);

    let xAlpha = x % GRID_SIZE / GRID_SIZE;
    let yAlpha = y % GRID_SIZE / GRID_SIZE;

    let xValue = lerp(vectors[yIndex][xIndex].x, vectors[yIndex][xIndex + 1].x, xAlpha);
    let yValue = lerp(vectors[yIndex][xIndex].y, vectors[yIndex + 1][xIndex].y, yAlpha);

    return {
        x: xValue,
        y: yValue
    }
}
//endregion

//region DRAW VECTORS
/*ctx.fillStyle = "white";
ctx.strokeStyle = "white";
for (let y = 0; y < vectors.length; y++) {
    for (let x = 0; x < vectors[0].length; x++) {
        let vectorLength = 20;
        ctx.beginPath()
        ctx.moveTo(x * GRID_SIZE, y * GRID_SIZE);
        ctx.lineTo(x * GRID_SIZE + vectors[y][x].x * vectorLength, y * GRID_SIZE + vectors[y][x].y * vectorLength);
        ctx.stroke()

        ctx.fillRect(x * GRID_SIZE - 2, y * GRID_SIZE - 2, 4, 4);
    }
}*/
//endregion

setInterval(() => {
    //region PHYSICS
    for (let [index, particle] of particles.entries()) {
        try {
            let force = forceAtPoint(particle.x, particle.y);
            particle.velocityX += force.x;
            particle.velocityY += force.y;
            particle.velocityX *= SLIPERINESS;
            particle.velocityY *= SLIPERINESS;
            particle.x += particle.velocityX * SPEED;
            particle.y += particle.velocityY * SPEED;
        } catch {
            particles.splice(index, 1);
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                velocityX: 0,
                velocityY: 0,
            });
        }
    }
    //endregion

    //region DRAW
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255, 0, 0, 1)";
    for (let particle of particles) {
        ctx.fillRect(particle.x - 1, particle.y - 1, 2, 2);
    }
    //endregion
}, 1);

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});