module BABYLON {
    export class TP {

      // Public members
      public scene: Scene;

      // Private members
      private _ground: GroundMesh = null;
      //private _ball: Mesh = null;
      private _skybox: Mesh = null;
      private _listCube:Mesh[] = [];
      //private _obstacles: Mesh[] = [];

      private _light: PointLight = null;

      private _camera: FreeCamera = null;

      constructor (scene: Scene) {
          this.scene = scene;
          this.scene.gravity = new Vector3(0, -0.981, 0);
      }

      public createMeshes (): void {



          // Create camera
          this._camera = new FreeCamera("camera", new Vector3(15, 6, 0), this.scene);
          this._camera.attachControl(this.scene.getEngine().getRenderingCanvas());

          // Map ZQSD keys to move camera
          this._camera.keysUp = [90]; // Z
          this._camera.keysDown = [83]; // S
          this._camera.keysLeft = [81] // Q
          this._camera.keysRight = [68]; // D

          this._camera.setTarget(new Vector3(0, 0, 0));

          this._camera.applyGravity = true;

          // Create light
          this._light = new PointLight("light", new Vector3(10, 72, 0), this.scene);

          // Create scene meshes
          this._ground = <GroundMesh> Mesh.CreateGround("ground", 100, 50, 2, this.scene);

          // Create standard material
          var groundMaterial = new StandardMaterial("ground", this.scene);
          this._ground.material = groundMaterial;

          var grassTexture = new Texture("assets/grass.jpg", this.scene, false, false, Texture.NEAREST_SAMPLINGMODE);
          grassTexture.uScale = grassTexture.vScale = 10.0;
          groundMaterial.diffuseTexture = grassTexture;

          groundMaterial.diffuseColor = Color3.Yellow();
          groundMaterial.specularColor = Color3.Black(); // new Color3(0, 0, 0);


          // Skybox
          this._skybox = Mesh.CreateBox("skybox", 1000, this.scene, false, Mesh.BACKSIDE);

          var skyboxMaterial = new StandardMaterial("skyboxMaterial", this.scene);
          skyboxMaterial.reflectionTexture = new CubeTexture("assets/TropicalSunnyDay", this.scene);
          skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
          skyboxMaterial.disableLighting = true;

          this._skybox.material = skyboxMaterial;

          // Create materual CubeTexture

          var materialCube = new BABYLON.StandardMaterial("assets/cube.png", this.scene);

          // Create obstacles

          for (var i : number = 0; i <10; i++){
            for (var j : number = 0; j <10; j++){
              var cube = Mesh.CreateBox("cube"+i+'-'+j, 10, this.scene);
              cube.position.x = -40 + 15 * j;
              cube.position.y = 10 +15*i;
              cube.material = materialCube;
              cube.checkCollisions = true;
              this._listCube.push(cube);
            }
          }
          console.log(this._listCube);
          /*
          var leftCube = Mesh.CreateBox("leftCube", 10, this.scene);
          leftCube.position.x = 0;
          leftCube.position.y = 5;
          */

          /*
          var rightCube = Mesh.CreateBox("rightCube", 10, this.scene);
          rightCube.position.x += this._ground._width / 2; // Same as left cube except +this._ground._height
          rightCube.position.y = 5;
          rightCube.scaling.z = 5;
          rightCube.scaling.x = 0.1;

          var backCube = Mesh.CreateBox("backCube", 10, this.scene);
          backCube.position.z -= this._ground._height / 2;
          backCube.position.y = 5;
          backCube.scaling.x = 10;
          backCube.scaling.z = 0.1;

          var frontCube = Mesh.CreateBox("frontCube", 10, this.scene);
          frontCube.position.z += this._ground._height / 2;
          frontCube.position.y = 5;
          frontCube.scaling.x = 10;
          frontCube.scaling.z = 0.1;

          //this._obstacles = [leftCube, rightCube, backCube, frontCube];
          */

      }

      public setupPhysics (): void {
          // Setup physics in scene
          this.scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin());

          // Set physics bodies
          this._ground.setPhysicsState(PhysicsEngine.BoxImpostor, { mass: 0 });


          for (var i : number = 0; i < this._listCube.length; i++){

            this._listCube[i].setPhysicsState(PhysicsEngine.BoxImpostor, { mass: 0 });
            this._listCube[i].actionManager = new ActionManager(this.scene);
            let cube = this._listCube[i]
            cube.actionManager.registerAction(
                new ExecuteCodeAction(ActionManager.OnLeftPickTrigger, (evt) => {
                    console.log("PUSH");

                    var pick = this.scene.pick(this.scene.pointerX, this.scene.pointerY);

                    var coef = 5;
                    console.log(coef);
                    var force = pick.pickedPoint.subtract(this._camera.position);
                    force = force.multiply(new Vector3(coef, coef, coef));

                    cube.applyImpulse(force, pick.pickedPoint);
                    console.log(cube.name);
                    /*setTimeout(() => {
                        cube.getPhysicsImpostor().dispose();
                        cube.setPhysicsState(PhysicsEngine.BoxImpostor, { mass: 1 });
                    }, 0);*/
                })
            );
            //console.log(cube.position.x);
          }


      }
    }
}
