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
            var light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 100, 0), this.scene);
            // Create scene meshes
            var ground = BABYLON.Mesh.CreateGround("ground", 100, 50, 2, this.scene);
            // Create standard material
            var groundMaterial = new BABYLON.StandardMaterial("ground", this.scene);
            ground.material = groundMaterial;
            var grassTexture = new BABYLON.Texture("assets/grass.jpg", this.scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
            grassTexture.uScale = grassTexture.vScale = 10.0;
            groundMaterial.diffuseTexture = grassTexture;
            groundMaterial.diffuseColor = BABYLON.Color3.Yellow();
            groundMaterial.specularColor = BABYLON.Color3.Black(); // new Color3(0, 0, 0);
            // Skybox
            var skybox = BABYLON.Mesh.CreateBox("skybox", 1000, this.scene, false, BABYLON.Mesh.BACKSIDE);
            var skyboxMaterial = new BABYLON.StandardMaterial("skyboxMaterial", this.scene);
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/TropicalSunnyDay", this.scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.disableLighting = true;
            skybox.material = skyboxMaterial;
            // Create obstacles
            var leftCube = BABYLON.Mesh.CreateBox("leftCube", 10, this.scene);
            leftCube.position.x -= ground._width / 2;
            leftCube.position.y = 5;
            leftCube.scaling.z = 5;
            leftCube.scaling.x = 0.1;
            var rightCube = BABYLON.Mesh.CreateBox("rightCube", 10, this.scene);
            rightCube.position.x += ground._width / 2; // Same as left cube except +ground._height
            rightCube.position.y = 5;
            rightCube.scaling.z = 5;
            rightCube.scaling.x = 0.1;
            var backCube = BABYLON.Mesh.CreateBox("backCube", 10, this.scene);
            backCube.position.z -= ground._height / 2;
            backCube.position.y = 5;
            backCube.scaling.x = 10;
            backCube.scaling.z = 0.1;
            var frontCube = BABYLON.Mesh.CreateBox("frontCube", 10, this.scene);
            frontCube.position.z += ground._height / 2;
            frontCube.position.y = 5;
            frontCube.scaling.x = 10;
            frontCube.scaling.z = 0.1;
        };
        return Main;
    }());
    BABYLON.Main = Main;
})(BABYLON || (BABYLON = {}));
//# sourceMappingURL=main.js.map