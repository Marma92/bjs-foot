var BABYLON;
(function (BABYLON) {
    var TP = (function () {
        function TP(scene) {
            this._ground = null;
            this._skybox = null;
            this._listCube = [];
            this._lengthArray = 10;
            this._widthArray = 10;
            this._cubeLength = 0.5;
            this._obstacles = [];
            this._light = null;
            this._camera = null;
            this.scene = scene;
            this.scene.gravity = new BABYLON.Vector3(0, -0.981, 0);
        }
        TP.prototype.createMeshes = function () {
            this._camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(10, 10, 45), this.scene);
            this._camera.attachControl(this.scene.getEngine().getRenderingCanvas());
            this._camera.keysUp = [90];
            this._camera.keysDown = [83];
            this._camera.keysLeft = [81];
            this._camera.keysRight = [68];
            this._camera.setTarget(new BABYLON.Vector3(0, 0, 0));
            this._camera.applyGravity = true;
            this._light = new BABYLON.PointLight("light", new BABYLON.Vector3(25, 70, 40), this.scene);
            this._ground = BABYLON.Mesh.CreateGround("ground", 50, 25, 2, this.scene);
            var groundMaterial = new BABYLON.StandardMaterial("ground", this.scene);
            this._ground.material = groundMaterial;
            var grassTexture = new BABYLON.Texture("assets/grass.jpg", this.scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
            grassTexture.uScale = grassTexture.vScale = 10.0;
            groundMaterial.diffuseTexture = grassTexture;
            groundMaterial.diffuseColor = BABYLON.Color3.Yellow();
            groundMaterial.specularColor = BABYLON.Color3.Black();
            this.scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
            this._ground.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
            this._skybox = BABYLON.Mesh.CreateBox("skybox", 1000, this.scene, false, BABYLON.Mesh.BACKSIDE);
            var skyboxMaterial = new BABYLON.StandardMaterial("skyboxMaterial", this.scene);
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/TropicalSunnyDay", this.scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.disableLighting = true;
            this._skybox.material = skyboxMaterial;
            var cubeMaterial = new BABYLON.StandardMaterial("cubeTexture", this.scene);
            cubeMaterial.diffuseTexture = new BABYLON.Texture("assets/cube_nx.jpg", this.scene);
            cubeMaterial.diffuseTexture.hasAlpha = true;
            var ballMaterial = new BABYLON.StandardMaterial("ballMaterial", this.scene);
            ballMaterial.diffuseTexture = new BABYLON.Texture("assets/ball.png", this.scene);
            for (var i = 0; i < this._lengthArray; i++) {
                var z = 0;
                for (var j = 0; j < this._widthArray; j++) {
                    var cube = BABYLON.Mesh.CreateBox("cube" + i + '-' + j, this._cubeLength, this.scene);
                    cube.position.x = i * this._cubeLength;
                    cube.position.y = 0.5 + j * this._cubeLength;
                    cube.position.z = z;
                    cube.material = cubeMaterial;
                    cube.checkCollisions = true;
                    this._listCube.push(cube);
                    this.setupPhysics(cube, "cube");
                }
                z++;
            }
            var leftCube = BABYLON.Mesh.CreateBox("leftCube", 1, this.scene);
            leftCube.position.x -= this._ground._width / 2;
            leftCube.position.y = 0.5;
            leftCube.scaling.z = this._ground._height;
            leftCube.scaling.x = 0.1;
            var rightCube = BABYLON.Mesh.CreateBox("rightCube", 1, this.scene);
            rightCube.position.x += this._ground._width / 2;
            rightCube.position.y = 0.5;
            rightCube.scaling.z = this._ground._height;
            rightCube.scaling.x = 0.1;
            var backCube = BABYLON.Mesh.CreateBox("backCube", 1, this.scene);
            backCube.position.z -= this._ground._height / 2;
            backCube.position.y = 0.5;
            backCube.scaling.x = this._ground._width;
            backCube.scaling.z = 0.1;
            var frontCube = BABYLON.Mesh.CreateBox("frontCube", 1, this.scene);
            frontCube.position.z += this._ground._height / 2;
            frontCube.position.y = 0.5;
            frontCube.scaling.x = this._ground._width;
            frontCube.scaling.z = 0.1;
            this._obstacles = [leftCube, rightCube, backCube, frontCube];
            for (var i = 0; i < 5; i++) {
                var ball = BABYLON.Mesh.CreateSphere("ball" + i, 40, 1, this.scene);
                ball.position.y = 5;
                ball.position.z = 5;
                ball.position.x = i;
                ball.material = ballMaterial;
                this.setupPhysics(ball, "ball");
            }
        };
        TP.prototype.setupPhysics = function (object, type) {
            var _this = this;
            if (type == "ball") {
                object.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, { mass: 1 });
            }
            else {
                object.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 1 });
            }
            this._obstacles.forEach(function (o) { return o.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 }); });
            object.actionManager = new BABYLON.ActionManager(this.scene);
            object.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function (evt) {
                var pick = _this.scene.pick(_this.scene.pointerX, _this.scene.pointerY);
                var coef = 1;
                var force = pick.pickedPoint.subtract(_this._camera.position);
                force = force.multiply(new BABYLON.Vector3(coef, coef, coef));
                object.applyImpulse(force, pick.pickedPoint);
            }));
        };
        return TP;
    }());
    BABYLON.TP = TP;
})(BABYLON || (BABYLON = {}));
//# sourceMappingURL=main.js.map