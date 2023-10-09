// Flow Fields
// by Arsène Brosy
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

//#region CONSTANTS
const GRID_SIZE = 50;
//#endregion

//#region VARIABLES
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
//#endregion

noise.seed(Math.random());

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let vectors = [];
let perlinZoom = 0.03;
for (let y = 0; y < canvas.height / GRID_SIZE; y++) {
    let newLine = [];
    for (let x = 0; x < canvas.width / GRID_SIZE; x++) {
        newLine.push(degToVector(noise.simplex2(x * perlinZoom, y * perlinZoom) * 360));
    }
    vectors.push(newLine);
}

setInterval(() => {
    // resize canvas
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    //#region DRAW
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
    //#endregion
}, 1);