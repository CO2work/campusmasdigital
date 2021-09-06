<template>
  <div ref="webgl" class="webgl"></div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {KTX2Loader} from 'three/examples/jsm/loaders/KTX2Loader.js'
import {MeshoptDecoder} from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js'

// import { RoomEnvironment } from 'three/jsm/environments/RoomEnvironment.js'
// import { OrbitControls } from 'three/jsm/controls/OrbitControls.js'

//import { KTX2Loader } from 'three/jsm/loaders/KTX2Loader.js'
//import { MeshoptDecoder } from 'three/jsm/libs/meshopt_decoder.module.js'

export default {
  name: 'Espacio3DGltf',
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
      escena_cu_gltf: undefined,
      teatro_jrr: undefined,
      texture: undefined,
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

      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3500);

      // this.camera.position.z = 600;
      // this.camera.position.y = 2000;
      // this.camera.position.x = 2000;

      this.camera.position.set( -55, 150, -50 )

      // scene

      this.scene = new THREE.Scene();


      const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
      this.scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 0.8);
      this.camera.add(pointLight);
      this.scene.add(this.camera);

      const axexHelper = new THREE.AxisHelper(1000)
      this.scene.add(axexHelper)

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);


      // GLTF vv   ///////////////
      console.log("renderer", this.renderer)
      const ktx2Loader = new KTX2Loader()
        ktx2Loader.setTranscoderPath( 'js/libs/basis/' ).detectSupport( this.renderer )

      const loader = new GLTFLoader()
      loader.setKTX2Loader( ktx2Loader )
      loader.setMeshoptDecoder( MeshoptDecoder )
      loader.load( '/models/cu_demo_demo_v1.gltf',  ( gltf ) => {

					// coffeemat.glb was produced from the source scene using gltfpack:
					// gltfpack -i coffeemat/scene.gltf -o coffeemat.glb -cc -tc
					// The resulting model uses EXT_meshopt_compression (for geometry) and KHR_texture_basisu (for texture compression using ETC1S/BasisLZ)

					gltf.scene.position.y = 8

        this.escena_cu_gltf = gltf;

				}, onProgress, onError )
      // GLTF ^^   ///////////////


      // manager

      function onError() {
        console.log("onError")
      }

      const manager = new THREE.LoadingManager();
      // const loader = new OBJLoader(manager);
      // const textureLoader = new THREE.TextureLoader(manager);
      // this.texture = textureLoader.load('/textures/uv_grid_opengl.jpg');

      // loader.load('/models/edificio_cu_v1.obj', (obj) => {
      //   this.edificio_cu = obj;
      // }, onProgress, onError);

      manager.onLoad = () => {
        console.log("on load")
        // this.escena_cu_gltf.traverse((child) => {
        //   if (child.isMesh) child.material.map = this.texture;
        // });
        this.escena_cu_gltf.position.y = 8;
        this.scene.add(this.escena_cu_gltf);
      }

      manager.onProgress = function (item, loaded, total) {

        console.log(item, loaded, total);

      };



      // model

      function onProgress(xhr) {

        if (xhr.lengthComputable) {
          const percentComplete = xhr.loaded / xhr.total * 100;
          console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
        }
      }



      //


      this.$refs.webgl.appendChild(this.renderer.domElement);

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
      this.camera.position.z = Math.random() * 100
      //this.camera.position.y = Math.random() * 1000
      this.camera.position.x = Math.random() * 100
      console.log(this.scene.position)
      //this.camera.position.x = (this.mouseX - this.camera.position.x) * Math.random() * 0.1;
      //this.camera.position.y = (-this.mouseY - this.camera.position.y) * Math.random() * 0.1;
      console.log(this.teatro_jrr.position);
      this.camera.lookAt(this.edificio_cu.position);

      //this.camera.position.x += (this.mouseX - this.camera.position.x) * Math.random() * 100;
      //this.camera.position.y += (-this.mouseY - this.camera.position.y) * Math.random() * 100;
      //this.camera.position.z += (-this.mouseY - this.camera.position.y) * Math.random() * 100;
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
