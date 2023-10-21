// Flow Fields
// by Arsène Brosy
let canvas = document.getElementById("display");
let ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

//region CONSTANTS
let GRID_SIZE = 20;
let SLIPPERINESS = 0.3;
let PARTICLE_COUNT = 1000;
let SPEED = 5;
let PATH_SIZE = 30;
let PERLIN_ZOOM = 0.01;
let RESET_CANVAS = true;
let SHOW_TRAILS = false;
let BACKGROUND_COLOR = "rgba(0, 0, 0, 1)";
let PARTICLES_COLOR = "rgba(255, 0, 0, 0.4)";
let PARTICLES_MULTICLOR = false;
//endregion

//region VARIABLES
// mouse
let mouseX = 0;
let mouseY = 0;
//endregion

noise.seed(Math.random());

//region FUNCTIONS
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

function start() {
    //region VECTORS
    let vectors = [];
    for (let y = 0; y <= Math.ceil(canvas.height / GRID_SIZE); y++) {
        let newLine = [];
        for (let x = 0; x <= Math.ceil(canvas.width / GRID_SIZE); x++) {
            newLine.push(degToVector(noise.simplex2(x * PERLIN_ZOOM, y * PERLIN_ZOOM) * 360));
        }
        vectors.push(newLine);
    }
    //endregion

    //region PARTICLES
    let particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            velocityX: 0,
            velocityY: 0,
            path: [],
            dead: false
        });
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
            if (particle.dead) {
                if (particle.path.length > 0) {
                    particle.path.shift();
                } else {
                    particles.splice(index, 1);
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
                    particle.velocityX *= SLIPPERINESS;
                    particle.velocityY *= SLIPPERINESS;
                    particle.x += particle.velocityX * SPEED;
                    particle.y += particle.velocityY * SPEED;
                } catch {
                    particle.dead = true;
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        velocityX: 0,
                        velocityY: 0,
                        path: [],
                        dead: false
                    });
                }
            }
        }
        //endregion

        //region DRAW
        if (RESET_CANVAS) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

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
}

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});