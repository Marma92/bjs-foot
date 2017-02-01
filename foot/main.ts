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
            camera.setTarget(new Vector3(0, 0, 0));

            // Create light
            var light = new PointLight("light", new Vector3(1000, 1000, 1000), this.scene);

            // Create scene meshes
            var ground = Mesh.CreateGround("ground", 100, 50, 2, this.scene);
        }
    }
}
