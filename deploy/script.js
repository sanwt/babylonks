// Initialize the Babylon.js engine
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

// Create the scene
const scene = new BABYLON.Scene(engine);

// Create an orthographic camera
const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -10), scene);
camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
camera.orthoLeft = -5;
camera.orthoRight = 5;
camera.orthoTop = 5;
camera.orthoBottom = -5;
camera.setTarget(BABYLON.Vector3.Zero());

// Create a 2D square using a plane
const square = BABYLON.MeshBuilder.CreatePlane("square", { size: 2 }, scene);
square.position.z = 0;

// Create a basic material
const material = new BABYLON.StandardMaterial("squareMaterial", scene);
material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Red color
square.material = material;

// Load a sound
const sound = new BABYLON.Sound("clickSound", "https://sanwt.github.io/babylonks/deploy/hello.mp3", scene);

// Add click event
square.actionManager = new BABYLON.ActionManager(scene);
square.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
        sound.play();
    })
);

// Run the render loop
engine.runRenderLoop(() => {
    scene.render();
});

// Handle window resizing
window.addEventListener("resize", () => {
    engine.resize();
});
