var BABYLON;
(function (BABYLON) {
    var Main = (function () {
        function Main(scene) {
            this.scene = scene;
        }
        Main.prototype.main = function () {
            // Create camera
            var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(15, 15, 15), this.scene);
            camera.attachControl(this.scene.getEngine().getRenderingCanvas());
            // Map ZQSD keys to move camera
            camera.keysUp = [90]; // Z
            camera.keysDown = [83]; // S
            camera.keysLeft = [81]; // Q
            camera.keysRight = [68]; // D
            camera.setTarget(new BABYLON.Vector3(0, 0, 0));
            // Create light
            var light = new BABYLON.PointLight("light", new BABYLON.Vector3(1000, 1000, 1000), this.scene);
            // Create scene meshes
            var ground = BABYLON.Mesh.CreateGround("ground", 100, 50, 2, this.scene);
            // Create standard material
            var groundMaterial = new BABYLON.StandardMaterial("ground", this.scene);
            ground.material = groundMaterial;
            var grassTexture = new BABYLON.Texture("assets/grass.jpg", this.scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
            grassTexture.uScale = grassTexture.vScale = 10.0;
            groundMaterial.diffuseTexture = grassTexture;
            groundMaterial.specularColor = BABYLON.Color3.Black(); // new Color3(0, 0, 0);
        };
        return Main;
    }());
    BABYLON.Main = Main;
})(BABYLON || (BABYLON = {}));
//# sourceMappingURL=main.js.map