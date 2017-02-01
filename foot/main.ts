module BABYLON {
    export class Main {
        // Public members
        public scene: Scene;

        constructor (scene: Scene) {
            this.scene = scene;
        }

        public main (): void {
            // Create camera
            var camera = new FreeCamera("camera", new Vector3(15, 15, 15), this.scene);
            camera.attachControl(this.scene.getEngine().getRenderingCanvas());

            // Map ZQSD keys to move camera
            camera.keysUp = [90]; // Z
            camera.keysDown = [83]; // S
            camera.keysLeft = [81] // Q
            camera.keysRight = [68]; // D

            camera.setTarget(new Vector3(0, 0, 0));

            // Create light
            var light = new PointLight("light", new Vector3(0, 100, 0), this.scene);

            // Create scene meshes
            var ground = <GroundMesh> Mesh.CreateGround("ground", 100, 50, 2, this.scene);

            // Create standard material
            var groundMaterial = new StandardMaterial("ground", this.scene);
            ground.material = groundMaterial;

            var grassTexture = new Texture("assets/grass.jpg", this.scene, false, false, Texture.NEAREST_SAMPLINGMODE);
            grassTexture.uScale = grassTexture.vScale = 10.0;
            groundMaterial.diffuseTexture = grassTexture;

            groundMaterial.diffuseColor = Color3.Yellow();
            groundMaterial.specularColor = Color3.Black(); // new Color3(0, 0, 0);

            // Skybox
            var skybox = Mesh.CreateBox("skybox", 1000, this.scene, false, Mesh.BACKSIDE);

            var skyboxMaterial = new StandardMaterial("skyboxMaterial", this.scene);
            skyboxMaterial.reflectionTexture = new CubeTexture("assets/TropicalSunnyDay", this.scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
            skyboxMaterial.disableLighting = true;

            skybox.material = skyboxMaterial;

            // Create obstacles
            var leftCube = Mesh.CreateBox("leftCube", 10, this.scene);
            leftCube.position.x -= ground._width / 2;
            leftCube.position.y = 5;
            leftCube.scaling.z = 5;
            leftCube.scaling.x = 0.1;

            var rightCube = Mesh.CreateBox("rightCube", 10, this.scene);
            rightCube.position.x += ground._width / 2; // Same as left cube except +ground._height
            rightCube.position.y = 5;
            rightCube.scaling.z = 5;
            rightCube.scaling.x = 0.1;

            var backCube = Mesh.CreateBox("backCube", 10, this.scene);
            backCube.position.z -= ground._height / 2;
            backCube.position.y = 5;
            backCube.scaling.x = 10;
            backCube.scaling.z = 0.1;

            var frontCube = Mesh.CreateBox("frontCube", 10, this.scene);
            frontCube.position.z += ground._height / 2;
            frontCube.position.y = 5;
            frontCube.scaling.x = 10;
            frontCube.scaling.z = 0.1;
        }
    }
}
