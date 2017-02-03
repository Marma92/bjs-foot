var BABYLON;
(function (BABYLON) {
    var TP = (function () {
        function TP(scene) {
            this._ground = null;
            this._skybox = null;
            this._light = null;
            this._camera = null;
            this.scene = scene;
        }
        TP.prototype.createMeshes = function () {
            this._camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(15, 6, 0), this.scene);
            this._camera.attachControl(this.scene.getEngine().getRenderingCanvas());
            this._camera.keysUp = [90];
            this._camera.keysDown = [83];
            this._camera.keysLeft = [81];
            this._camera.keysRight = [68];
            this._camera.setTarget(new BABYLON.Vector3(0, 0, 0));
            this._light = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 72, 0), this.scene);
            this._ground = BABYLON.Mesh.CreateGround("ground", 100, 50, 2, this.scene);
            var groundMaterial = new BABYLON.StandardMaterial("ground", this.scene);
            this._ground.material = groundMaterial;
            var grassTexture = new BABYLON.Texture("assets/grass.jpg", this.scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
            grassTexture.uScale = grassTexture.vScale = 10.0;
            groundMaterial.diffuseTexture = grassTexture;
            groundMaterial.diffuseColor = BABYLON.Color3.Yellow();
            groundMaterial.specularColor = BABYLON.Color3.Black();
            this._skybox = BABYLON.Mesh.CreateBox("skybox", 1000, this.scene, false, BABYLON.Mesh.BACKSIDE);
            var skyboxMaterial = new BABYLON.StandardMaterial("skyboxMaterial", this.scene);
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/TropicalSunnyDay", this.scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.disableLighting = true;
            this._skybox.material = skyboxMaterial;
            var cubeMaterial = new BABYLON.StandardMaterial("cubeTexture", this.scene);
            cubeMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/cube", this.scene);
            cubeMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.INVCUBIC_MODE;
            cubeMaterial.disableLighting = true;
            var listCube = [];
            for (var i = 0; i < 15; i++) {
                var cube = BABYLON.Mesh.CreateBox("cube" + i, 10, this.scene);
                cube.position.x = 0;
                cube.position.y = 10 + 5 * i;
                cube.material = cubeMaterial;
                listCube[i] = cube;
            }
        };
        return TP;
    }());
    BABYLON.TP = TP;
})(BABYLON || (BABYLON = {}));
//# sourceMappingURL=main.js.map