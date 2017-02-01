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
            camera.setTarget(new BABYLON.Vector3(0, 0, 0));
            // Create light
            var light = new BABYLON.PointLight("light", new BABYLON.Vector3(1000, 1000, 1000), this.scene);
            // Create scene meshes
            var ground = BABYLON.Mesh.CreateGround("ground", 100, 50, 2, this.scene);
        };
        return Main;
    }());
    BABYLON.Main = Main;
})(BABYLON || (BABYLON = {}));
//# sourceMappingURL=main.js.map