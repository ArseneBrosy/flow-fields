// Flow Fields
// by Arsène Brosy
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

//#region CONSTANTS
const GRID_SIZE = 50;
//#endregion

//#region VARIABLES
// mouse
let mouseX = 0;
let mouseY = 0;

// vectors
noise.seed(Math.random());
let vectors = [];
let perlinZoom = 0.03;
for (let y = 0; y <= Math.ceil(canvas.height / GRID_SIZE); y++) {
    let newLine = [];
    for (let x = 0; x <= Math.ceil(canvas.width / GRID_SIZE); x++) {
        newLine.push(degToVector(noise.simplex2(x * perlinZoom, y * perlinZoom) * 360));
    }
    vectors.push(newLine);
}

let particles = [
    {
        x: 100,
        y: 100,
        velocityX: 0,
        velocityY: 0
    }
];
//#endregion

//#region FUNCTIONS
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
//#endregion

setInterval(() => {
    // resize canvas
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    //#region DRAW
    ctx.strokeStyle = "black";
    for (let y = 0; y < vectors.length; y++) {
        for (let x = 0; x < vectors[0].length; x++) {
            let vectorLength = 20;
            ctx.beginPath()
            ctx.moveTo(x * GRID_SIZE, y * GRID_SIZE);
            ctx.lineTo(x * GRID_SIZE + vectors[y][x].x * vectorLength, y * GRID_SIZE + vectors[y][x].y * vectorLength);
            ctx.stroke()

            ctx.fillRect(x * GRID_SIZE - 2, y * GRID_SIZE - 2, 4, 4);
        }
    }

    let force = forceAtPoint(mouseX, mouseY);
    let mouseVectorLength = 50;

    ctx.strokeStyle = "red";
    ctx.beginPath()
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(mouseX + force.x * mouseVectorLength, mouseY + force.y * mouseVectorLength);
    ctx.stroke()
    //#endregion
}, 1);

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});