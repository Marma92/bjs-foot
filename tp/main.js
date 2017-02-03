var BABYLON;
(function (BABYLON) {
    var TP = (function () {
        function TP(scene) {
            this._ground = null;
            this._skybox = null;
            this._listCube = [];
            this._light = null;
            this._camera = null;
            this.scene = scene;
            this.scene.gravity = new BABYLON.Vector3(0, -0.981, 0);
        }
        TP.prototype.createMeshes = function () {
            this._camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(15, 6, 0), this.scene);
            this._camera.attachControl(this.scene.getEngine().getRenderingCanvas());
            this._camera.keysUp = [90];
            this._camera.keysDown = [83];
            this._camera.keysLeft = [81];
            this._camera.keysRight = [68];
            this._camera.setTarget(new BABYLON.Vector3(0, 0, 0));
            this._camera.applyGravity = true;
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
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    var cube = BABYLON.Mesh.CreateBox("cube" + i + '-' + j, 10, this.scene);
                    cube.position.x = -40 + 15 * j;
                    cube.position.y = 10 + 15 * i;
                    cube.material = cubeMaterial;
                    cube.checkCollisions = true;
                    this._listCube.push(cube);
                }
            }
            console.log(this._listCube);
        };
        TP.prototype.setupPhysics = function () {
            var _this = this;
            this.scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
            this._ground.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
            var _loop_1 = function () {
                this_1._listCube[i].setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
                this_1._listCube[i].actionManager = new BABYLON.ActionManager(this_1.scene);
                var cube = this_1._listCube[i];
                cube.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function (evt) {
                    console.log("PUSH");
                    var pick = _this.scene.pick(_this.scene.pointerX, _this.scene.pointerY);
                    var coef = 5;
                    console.log(coef);
                    var force = pick.pickedPoint.subtract(_this._camera.position);
                    force = force.multiply(new BABYLON.Vector3(coef, coef, coef));
                    cube.applyImpulse(force, pick.pickedPoint);
                    console.log(cube.name);
                }));
            };
            var this_1 = this;
            for (var i = 0; i < this._listCube.length; i++) {
                _loop_1();
            }
        };
        return TP;
    }());
    BABYLON.TP = TP;
})(BABYLON || (BABYLON = {}));
//# sourceMappingURL=main.js.map