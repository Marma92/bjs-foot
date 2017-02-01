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
            var light = new PointLight("light", new Vector3(1000, 1000, 1000), this.scene);

            // Create scene meshes
            var ground = Mesh.CreateGround("ground", 100, 50, 2, this.scene);

            // Create standard material
            var groundMaterial = new StandardMaterial("ground", this.scene);
            ground.material = groundMaterial;

            var grassTexture = new Texture("assets/grass.jpg", this.scene, false, false, Texture.NEAREST_SAMPLINGMODE);
            grassTexture.uScale = grassTexture.vScale = 10.0;
            groundMaterial.diffuseTexture = grassTexture;

            groundMaterial.specularColor = Color3.Black(); // new Color3(0, 0, 0);
        }
    }
}
