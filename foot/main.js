var BABYLON;
(function (BABYLON) {
    var Main = (function () {
        function Main(scene) {
            // Private members
            this._ground = null;
            this._ball = null;
            this._skybox = null;
            this._obstacles = [];
            this._light = null;
            this._camera = null;
            this.scene = scene;
        }
        // Setups collisions on objects and camera
        Main.prototype.setupCollisions = function () {
            // Setup camera collisions
            this.scene.gravity = new BABYLON.Vector3(0, -0.981, 0);
            this._camera.ellipsoid = new BABYLON.Vector3(2, 3, 2);
            this._camera.checkCollisions = true;
            this._camera.applyGravity = true;
            this._ground.checkCollisions = true;
            this._ball.checkCollisions = true;
            this._obstacles.forEach(function (o) { return o.checkCollisions = true; });
        };
        // Setups the meshes used to play football
        Main.prototype.createMeshes = function () {
            // Create camera
            this._camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(15, 15, 15), this.scene);
            this._camera.attachControl(this.scene.getEngine().getRenderingCanvas());
            // Map ZQSD keys to move camera
            this._camera.keysUp = [90]; // Z
            this._camera.keysDown = [83]; // S
            this._camera.keysLeft = [81]; // Q
            this._camera.keysRight = [68]; // D
            this._camera.setTarget(new BABYLON.Vector3(0, 0, 0));
            // Create light
            this._light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 100, 0), this.scene);
            // Create scene meshes
            this._ground = BABYLON.Mesh.CreateGround("ground", 100, 50, 2, this.scene);
            // Create standard material
            var groundMaterial = new BABYLON.StandardMaterial("ground", this.scene);
            this._ground.material = groundMaterial;
            var grassTexture = new BABYLON.Texture("assets/grass.jpg", this.scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
            grassTexture.uScale = grassTexture.vScale = 10.0;
            groundMaterial.diffuseTexture = grassTexture;
            groundMaterial.diffuseColor = BABYLON.Color3.Yellow();
            groundMaterial.specularColor = BABYLON.Color3.Black(); // new Color3(0, 0, 0);
            // Skybox
            this._skybox = BABYLON.Mesh.CreateBox("skybox", 1000, this.scene, false, BABYLON.Mesh.BACKSIDE);
            var skyboxMaterial = new BABYLON.StandardMaterial("skyboxMaterial", this.scene);
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/TropicalSunnyDay", this.scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.disableLighting = true;
            this._skybox.material = skyboxMaterial;
            // Create obstacles
            var leftCube = BABYLON.Mesh.CreateBox("leftCube", 10, this.scene);
            leftCube.position.x -= this._ground._width / 2;
            leftCube.position.y = 5;
            leftCube.scaling.z = 5;
            leftCube.scaling.x = 0.1;
            var rightCube = BABYLON.Mesh.CreateBox("rightCube", 10, this.scene);
            rightCube.position.x += this._ground._width / 2; // Same as left cube except +this._ground._height
            rightCube.position.y = 5;
            rightCube.scaling.z = 5;
            rightCube.scaling.x = 0.1;
            var backCube = BABYLON.Mesh.CreateBox("backCube", 10, this.scene);
            backCube.position.z -= this._ground._height / 2;
            backCube.position.y = 5;
            backCube.scaling.x = 10;
            backCube.scaling.z = 0.1;
            var frontCube = BABYLON.Mesh.CreateBox("frontCube", 10, this.scene);
            frontCube.position.z += this._ground._height / 2;
            frontCube.position.y = 5;
            frontCube.scaling.x = 10;
            frontCube.scaling.z = 0.1;
            this._obstacles = [leftCube, rightCube, backCube, frontCube];
            // Create ball
            this._ball = BABYLON.Mesh.CreateSphere("ball", 16, 1, this.scene);
            this._ball.position.y = 5;
        };
        return Main;
    }());
    BABYLON.Main = Main;
})(BABYLON || (BABYLON = {}));
//# sourceMappingURL=main.js.map