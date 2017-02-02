var BABYLON;
(function (BABYLON) {
    var Main = (function () {
        function Main(scene) {
            // Private members
            this._ground = null;
            this._ball = null;
            this._skybox = null;
            this._obstacles = [];
            this._light = null;
            this._camera = null;
            this.scene = scene;
        }
        // Create a dynamic texture
        Main.prototype.setupDynamicTexture = function () {
            var textTexture = new BABYLON.DynamicTexture("textExample", { width: 512, height: 512 }, this.scene, false);
            textTexture.drawText("Hello my name is", 100, 100, "arial 12 px", "rgb(255, 255, 255)", "#000000");
            textTexture.update(false);
            // Apply on the ground
            this._ground.material.diffuseTexture = textTexture;
        };
        // Setup post-processes
        Main.prototype.setupPostProcesses = function () {
            var originalPass = new BABYLON.PassPostProcess("pass", 1.0, this._camera);
            var brightPass = new BABYLON.PostProcess("brightPass", "BloomIT", ["threshold"], [], 1.0, this._camera);
            brightPass.onApply = function (effect) {
                effect.setFloat("threshold", 0.5);
            };
            var blurH = new BABYLON.BlurPostProcess("blurH", new BABYLON.Vector2(1, 0), 2.0, 0.25, this._camera);
            var blurV = new BABYLON.BlurPostProcess("blurV", new BABYLON.Vector2(0, 1), 2.0, 0.25, this._camera);
            var bloom = new BABYLON.PostProcess("bloom", "Bloom2IT", [], ["originalSampler"], 1.0, this._camera);
            bloom.onApply = function (effect) {
                effect.setTextureFromPostProcess("originalSampler", originalPass);
            };
            // Same but better :)
            /*
            var pp = new StandardRenderingPipeline("pp", this.scene, 1.0, null, this.scene.cameras);
            pp.lensTexture = new Texture("assets/lensdirt.jpg", this.scene);
            */
        };
        // Setup a basic shader
        Main.prototype.setupBasicShader = function () {
            var _this = this;
            // Why not :)
            var material = new BABYLON.ShaderMaterial("shaderMaterial", this.scene, {
                vertex: "IT",
                fragment: "IT"
            }, {
                // Options
                attributes: ["position", "uv"],
                uniforms: ["worldViewProjection", "time"],
                samplers: ["makiTexture"]
            });
            var time = 0;
            material.onBind = function (mesh) {
                time += _this.scene.getEngine().getDeltaTime();
                material.setFloat("time", time);
            };
            material.setTexture("makiTexture", new BABYLON.Texture("assets/ball.png", this.scene));
            this._ball.material = material;
        };
        // Setups the physics bodies of each meshes
        Main.prototype.setupPhysics = function () {
            var _this = this;
            // Setup physics in scene
            this.scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
            // Set physics bodies
            this._ground.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
            this._ball.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, { mass: 1 });
            // Set physics bodies of obstacles
            this._obstacles.forEach(function (o) { return o.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 }); });
            // Tap the ball
            this._ball.actionManager = new BABYLON.ActionManager(this.scene);
            this._ball.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function (evt) {
                var pick = _this.scene.pick(_this.scene.pointerX, _this.scene.pointerY);
                var coef = 1;
                var force = pick.pickedPoint.subtract(_this._camera.position);
                force = force.multiply(new BABYLON.Vector3(coef, coef, coef));
                _this._ball.applyImpulse(force, pick.pickedPoint);
                setTimeout(function () {
                    _this._ball.position = new BABYLON.Vector3(0, 5, 0);
                    _this._ball.getPhysicsImpostor().dispose();
                    _this._ball.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, { mass: 1 });
                }, 5000);
            }));
        };
        // Setups collisions on objects and camera
        Main.prototype.setupCollisions = function () {
            // Setup camera collisions
            this.scene.gravity = new BABYLON.Vector3(0, -0.981, 0);
            this._camera.ellipsoid = new BABYLON.Vector3(2, 3, 2);
            this._camera.checkCollisions = true;
            this._camera.applyGravity = true;
            this._ground.checkCollisions = true;
            this._ball.checkCollisions = true;
            this._obstacles.forEach(function (o) { return o.checkCollisions = true; });
        };
        // Setups the meshes used to play football
        Main.prototype.createMeshes = function () {
            // Create camera
            this._camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(15, 6, 0), this.scene);
            this._camera.attachControl(this.scene.getEngine().getRenderingCanvas());
            // Map ZQSD keys to move camera
            this._camera.keysUp = [90]; // Z
            this._camera.keysDown = [83]; // S
            this._camera.keysLeft = [81]; // Q
            this._camera.keysRight = [68]; // D
            this._camera.setTarget(new BABYLON.Vector3(0, 0, 0));
            // Create light
            this._light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 100, 0), this.scene);
            // Create scene meshes
            this._ground = BABYLON.Mesh.CreateGround("ground", 100, 50, 2, this.scene);
            // Create standard material
            var groundMaterial = new BABYLON.StandardMaterial("ground", this.scene);
            this._ground.material = groundMaterial;
            var grassTexture = new BABYLON.Texture("assets/grass.jpg", this.scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
            grassTexture.uScale = grassTexture.vScale = 10.0;
            groundMaterial.diffuseTexture = grassTexture;
            groundMaterial.diffuseColor = BABYLON.Color3.Yellow();
            groundMaterial.specularColor = BABYLON.Color3.Black(); // new Color3(0, 0, 0);
            // Skybox
            this._skybox = BABYLON.Mesh.CreateBox("skybox", 1000, this.scene, false, BABYLON.Mesh.BACKSIDE);
            var skyboxMaterial = new BABYLON.StandardMaterial("skyboxMaterial", this.scene);
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/TropicalSunnyDay", this.scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.disableLighting = true;
            this._skybox.material = skyboxMaterial;
            // Create obstacles
            var leftCube = BABYLON.Mesh.CreateBox("leftCube", 10, this.scene);
            leftCube.position.x -= this._ground._width / 2;
            leftCube.position.y = 5;
            leftCube.scaling.z = 5;
            leftCube.scaling.x = 0.1;
            var rightCube = BABYLON.Mesh.CreateBox("rightCube", 10, this.scene);
            rightCube.position.x += this._ground._width / 2; // Same as left cube except +this._ground._height
            rightCube.position.y = 5;
            rightCube.scaling.z = 5;
            rightCube.scaling.x = 0.1;
            var backCube = BABYLON.Mesh.CreateBox("backCube", 10, this.scene);
            backCube.position.z -= this._ground._height / 2;
            backCube.position.y = 5;
            backCube.scaling.x = 10;
            backCube.scaling.z = 0.1;
            var frontCube = BABYLON.Mesh.CreateBox("frontCube", 10, this.scene);
            frontCube.position.z += this._ground._height / 2;
            frontCube.position.y = 5;
            frontCube.scaling.x = 10;
            frontCube.scaling.z = 0.1;
            this._obstacles = [leftCube, rightCube, backCube, frontCube];
            // Create ball
            this._ball = BABYLON.Mesh.CreateSphere("ball", 16, 1, this.scene);
            this._ball.position.y = 5;
        };
        return Main;
    }());
    BABYLON.Main = Main;
})(BABYLON || (BABYLON = {}));
//# sourceMappingURL=main.js.map