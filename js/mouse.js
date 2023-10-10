// Flow Fields
// by Arsène Brosy
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

//region CONSTANTS
const GRID_SIZE = 20;
const SLIPERINESS = 0.3;
const PARTCLE_COUNT = 500;
const SPEED = 10;
const PATH_SIZE = 150;
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
        velocityY: 0,
        path: [],
        dead: false,
        lifetime: i
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
    let dis = Distance(x, y, mouseX, mouseY);
    return {
        x: (mouseX - x) / dis,
        y: (mouseY - y) / dis
    }
}
//endregion

setInterval(() => {
    //region PHYSICS
    for (let [index, particle] of particles.entries()) {
        if (particle.dead) {
            if (particle.path.length > 0) {
                particle.path.shift();
            } else {
                particles.splice(index, 1);
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    velocityX: 0,
                    velocityY: 0,
                    path: [],
                    dead: false,
                    lifetime: PARTCLE_COUNT
                });
            }
        } else {
            try {
                let force = forceAtPoint(particle.x, particle.y);
                particle.path.push({
                    x: particle.x,
                    y: particle.y
                });
                if (particle.path.length > PATH_SIZE) {
                    particle.path.shift();
                }
                particle.velocityX += force.x;
                particle.velocityY += force.y;
                particle.velocityX *= SLIPERINESS;
                particle.velocityY *= SLIPERINESS;
                particle.x += particle.velocityX * SPEED;
                particle.y += particle.velocityY * SPEED;
                particle.lifetime --;
                if (particle.lifetime <= 0) {
                    particle.dead = true;
                }
            } catch {
                particle.dead = true;
            }
        }
    }
    //endregion

    //region DRAW
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255, 0, 0, 0.4)";
    for (let particle of particles) {
        if (particle.path.length === 0) {
            continue;
        }
        ctx.beginPath()
        ctx.moveTo(particle.path[0].x, particle.path[0].y);
        for (let pos of particle.path) {
            ctx.lineTo(pos.x, pos.y);
        }
        ctx.stroke();
    }
    //endregion
}, 1);

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});