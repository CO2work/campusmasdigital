<template>
  <div ref="webgl" class="webgl"></div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import {KTX2Loader} from 'three/examples/jsm/loaders/KTX2Loader.js';
import {MeshoptDecoder} from 'three/examples/jsm/libs/meshopt_decoder.module.js';

import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {SSAOPass} from 'three/examples/jsm/postprocessing/SSAOPass.js';

export default {
  name: 'CU3D',
  components: {},
  data() {
    return {
      container: this.$refs.webgl,
      camera: undefined,
      scene: undefined,
      renderer: undefined,
      mouseX: 0,
      mouseY: 0,
      windowHalfX: window.innerWidth / 2,
      windowHalfY: window.innerHeight / 2,
      object: undefined,
      edificio_cu: undefined,
      texture: undefined,
      environment: undefined,
      pmremGenerator: undefined,
    }
  },
  computed: {
    ...mapGetters('campus', ['paginasIndexGet']),
    paginasIndex: {
      get() {
        return this.paginasIndexGet
      },
      set(value) {
        this.paginasIndexSet(value)
      }
    },
  },
  methods: {
    ...mapActions('campus', ['paginasIndexSet']),
    getPaginasPath(path) {
      let filtradas = {contenido: []}
      Object.values(this.paginasIndex).forEach(item => {
        if (item.slug === path) {
          filtradas = item
        }
      })
      return filtradas
    },

    render() {
      this.camera.position.x += (this.mouseX - this.camera.position.x) * .05;
      this.camera.position.y += (-this.mouseY - this.camera.position.y) * .05;
      this.camera.lookAt(this.scene.position);
      this.renderer.render(this.scene, this.camera);
    },

    onDocumentMouseMove(event) {
      this.mouseX = (event.clientX - this.windowHalfX) * .4;
      this.mouseY = (event.clientY - this.windowHalfY) * .3;
    },
    onWindowResize() {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    initThree() {
      //camera
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
      this.camera.position.set(2000, 2000, 600)

      // scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color('#eaeaea');

      // renderer
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1;
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.$refs.webgl.appendChild(this.renderer.domElement);


      this.environment = new RoomEnvironment();
      this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);

      this.scene.background = new THREE.Color('#80dcf8');
      //this.scene.environment = this.pmremGenerator.fromScene(this.environment).texture;

      const grid = new THREE.GridHelper(500, 10, 0xffffff, 0xffffff);
      grid.position.y = -180
      grid.material.opacity = 0.5;
      grid.material.depthWrite = false;
      grid.material.transparent = true;
      this.scene.add(grid);

      const composer = new EffectComposer(this.renderer);

      const ssaoPass = new SSAOPass(this.scene, this.camera, window.innerWidth, window.innerHeight);
      ssaoPass.kernelRadius = 36;
      composer.addPass(ssaoPass);
      composer.render();

      const ambientLight = new THREE.AmbientLight('#ffffff', 0.2);
      this.scene.add(ambientLight);

      const pointLight = new THREE.PointLight('#ffffff', 1);
      this.camera.add(pointLight);
      this.scene.add(this.camera);

      const axexHelper = new THREE.AxisHelper(1000)
      axexHelper.position.y = -180

      this.environment = new RoomEnvironment();
      this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);


      this.scene.add(axexHelper)


      const ktx2Loader = new KTX2Loader()
          .setTranscoderPath('~assets/js/libs/basis/')
          .detectSupport(this.renderer);

      // manager
      const manager = new THREE.LoadingManager();
      const loader = new GLTFLoader(manager).setPath('/models/gltf/')

      loader.setKTX2Loader(ktx2Loader);
      loader.setMeshoptDecoder(MeshoptDecoder);
      loader.load('cu_demo_demo_v2.glb', (gltf) => {

        // coffeemat.glb was produced from the source scene using gltfpack:
        // gltfpack -i coffeemat/scene.gltf -o coffeemat.glb -cc -tc
        // The resulting model uses EXT_meshopt_compression (for geometry) and KHR_texture_basisu (for texture compression using ETC1S/BasisLZ)

        gltf.scene.position.y = -20;
        gltf.scene.rotation.y = Math.PI * .75;
        gltf.scene.position.x = -200;
        gltf.scene.position.z = 200;

        this.scene.add(gltf.scene);

      });
      /*
            loader.load('/models/cu_demo_demo_v2.glb', (gltf) => {
              console.log("obj gltf", gltf)
              this.scene.add(gltf.scene)
              gltf.animations; // Array<THREE.AnimationClip>
              gltf.scene; // THREE.Group
              gltf.scenes; // Array<THREE.Group>
              gltf.cameras; // Array<THREE.Camera>
              gltf.asset; // Object
              // this.edificio_cu = obj;
            }, onProgress, onError);
      */

      manager.onLoad = () => {
        console.log("on load")

        //this.edificio_cu.rotate.z = Math.PI
        /*
        this.edificio_cu.position.y = -150;
        this.edificio_cu.position.z = -100;
        this.edificio_cu.position.x = -108;

        this.edificio_cu.rotation.y = Math.PI * .3;

        this.scene.add(this.edificio_cu);

         */
      }

      manager.onProgress = (item, loaded, total) => {
        console.log("manager onProgress", item, loaded, total);
      };


      // model

      function onProgress(xhr) {
        if (xhr.lengthComputable) {
          let percentComplete = xhr.loaded / xhr.total * 100;
          console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
        }
      }

      function onError() {
        console.log("onError")
      }


      document.addEventListener('mousemove', this.onDocumentMouseMove);

      //

      window.addEventListener('resize', this.onWindowResize);

    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
  },
  watch: {
    '$route.path': function () {
      let path = this.$route.path.replace('/p/', '')
      path = path.replace('/', '')
      this.paginasPath = this.getPaginasPath(path)
      this.camera.position.z = 600;
      this.camera.position.y = 2000;
      this.camera.position.x = 2000;
      console.log(this.scene.position)
    },
  },
  created() {
    this.container = this.$refs.webgl;
  },
  mounted() {
    this.initThree()
    this.animate()
  }
}
</script>
