// Flow Fields
// by Arsène Brosy
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

//#region CONSTANTS
const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;
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

setInterval(() => {
    // resize canvas
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    //#region DRAW
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            let xPos = canvas.width * (x / (GRID_WIDTH - 1));
            let yPos = canvas.height * (y / (GRID_WIDTH - 1));

            ctx.fillRect(xPos - 2, yPos - 2, 4, 4);
        }
    }
    //#endregion
}, 1);