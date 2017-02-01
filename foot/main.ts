module BABYLON {
    export class Main {
        // Public members
        public scene: Scene;

        // Private members
        private _ground: GroundMesh = null;
        private _ball: Mesh = null;
        private _skybox: Mesh = null;
        private _obstacles: Mesh[] = [];

        private _light: PointLight = null;

        private _camera: FreeCamera = null;

        constructor (scene: Scene) {
            this.scene = scene;
        }

        // Setups collisions on objects and camera
        public setupCollisions (): void {
            // Setup camera collisions
            this.scene.gravity = new Vector3(0, -0.981, 0);
            this._camera.ellipsoid = new Vector3(2, 3, 2);

            this._camera.checkCollisions = true;
            this._camera.applyGravity = true;

            this._ground.checkCollisions = true;
            this._ball.checkCollisions = true;

            this._obstacles.forEach((o) => o.checkCollisions = true);
        }

        // Setups the meshes used to play football
        public createMeshes (): void {
            // Create camera
            this._camera = new FreeCamera("camera", new Vector3(15, 15, 15), this.scene);
            this._camera.attachControl(this.scene.getEngine().getRenderingCanvas());

            // Map ZQSD keys to move camera
            this._camera.keysUp = [90]; // Z
            this._camera.keysDown = [83]; // S
            this._camera.keysLeft = [81] // Q
            this._camera.keysRight = [68]; // D

            this._camera.setTarget(new Vector3(0, 0, 0));

            // Create light
            this._light = new PointLight("light", new Vector3(0, 100, 0), this.scene);

            // Create scene meshes
            this._ground = <GroundMesh> Mesh.CreateGround("ground", 100, 50, 2, this.scene);

            // Create standard material
            var groundMaterial = new StandardMaterial("ground", this.scene);
            this._ground.material = groundMaterial;

            var grassTexture = new Texture("assets/grass.jpg", this.scene, false, false, Texture.NEAREST_SAMPLINGMODE);
            grassTexture.uScale = grassTexture.vScale = 10.0;
            groundMaterial.diffuseTexture = grassTexture;

            groundMaterial.diffuseColor = Color3.Yellow();
            groundMaterial.specularColor = Color3.Black(); // new Color3(0, 0, 0);

            // Skybox
            this._skybox = Mesh.CreateBox("skybox", 1000, this.scene, false, Mesh.BACKSIDE);

            var skyboxMaterial = new StandardMaterial("skyboxMaterial", this.scene);
            skyboxMaterial.reflectionTexture = new CubeTexture("assets/TropicalSunnyDay", this.scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
            skyboxMaterial.disableLighting = true;

            this._skybox.material = skyboxMaterial;

            // Create obstacles
            var leftCube = Mesh.CreateBox("leftCube", 10, this.scene);
            leftCube.position.x -= this._ground._width / 2;
            leftCube.position.y = 5;
            leftCube.scaling.z = 5;
            leftCube.scaling.x = 0.1;

            var rightCube = Mesh.CreateBox("rightCube", 10, this.scene);
            rightCube.position.x += this._ground._width / 2; // Same as left cube except +this._ground._height
            rightCube.position.y = 5;
            rightCube.scaling.z = 5;
            rightCube.scaling.x = 0.1;

            var backCube = Mesh.CreateBox("backCube", 10, this.scene);
            backCube.position.z -= this._ground._height / 2;
            backCube.position.y = 5;
            backCube.scaling.x = 10;
            backCube.scaling.z = 0.1;

            var frontCube = Mesh.CreateBox("frontCube", 10, this.scene);
            frontCube.position.z += this._ground._height / 2;
            frontCube.position.y = 5;
            frontCube.scaling.x = 10;
            frontCube.scaling.z = 0.1;

            this._obstacles = [leftCube, rightCube, backCube, frontCube];

            // Create ball
            this._ball = Mesh.CreateSphere("ball", 16, 1, this.scene);
            this._ball.position.y = 5;
        }
    }
}
