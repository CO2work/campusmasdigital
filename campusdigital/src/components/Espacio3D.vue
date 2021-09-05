<template>
  <div ref="webgl" class="webgl"></div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js'

export default {
  name: 'Espacio3D',
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

      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);

      this.camera.position.z = 600;
      this.camera.position.y = 2000;
      this.camera.position.x = 2000;

      // scene

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color( '#eaeaea' );


      const ambientLight = new THREE.AmbientLight('#cccccc', 0.7);
      this.scene.add(ambientLight);

      const pointLight = new THREE.PointLight('#6175fc', 0.3);
      this.camera.add(pointLight);
      this.scene.add(this.camera);

      const axexHelper = new THREE.AxisHelper(1000)
      this.scene.add(axexHelper)


      // manager

      function onError() {
        console.log("onError")
      }

      const manager = new THREE.LoadingManager();
      const loader = new OBJLoader(manager);
      const textureLoader = new THREE.TextureLoader(manager);
      this.texture = textureLoader.load('/textures/uv_grid_opengl.jpg');

      loader.load('/models/edificio_cu_v1.obj', (obj) => {
        this.edificio_cu = obj;
      }, onProgress, onError);

      manager.onLoad = () => {
        console.log("on load")
        this.edificio_cu.traverse((child) => {
          //if (child.isMesh) child.material.map = this.texture;
        });
        //this.edificio_cu.rotate.z = Math.PI
        this.edificio_cu.position.y = -150;
        this.edificio_cu.position.z = -100;
        this.edificio_cu.position.x = -70;

        this.edificio_cu.rotation.y = Math.PI * .3;

        this.scene.add(this.edificio_cu);
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

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
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

      this.camera.position.z = 600;
      this.camera.position.y = 2000;
      this.camera.position.x = 2000;
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
