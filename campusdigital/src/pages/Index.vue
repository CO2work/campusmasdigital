<template>
  <div>
    <div>

      <!--
        <q-card class="fixed-center text-center text-white bg-transparent no-border-radius no-border no-shadow"
              style="text-shadow: #1D1D1D 0 0 5px;">
        <q-card-section class="text-weight-bold">
          <img src="~assets/logopng.png" alt="Escudo UMSNH">
          <h3 class="q-mt-sm q-mb-md">Campus Digital</h3>
          <h5 class="q-my-sm">
            Universidad Michoacana
            <br>
            de San Nicolás de Hidalgo
          </h5>
        </q-card-section>

        <q-card-section>
          <p class="text-h6 text-weight-regular">
            <strong>La Universidad más cerca de ti</strong>. En este espacio encontrarás un repositorio de los servicios que la Casa de Hidalgo oferta en formato digital.
          </p>
        </q-card-section>

      </q-card>
      -->

      <div v-if="pageReady">
        <div ref="webgl" class="fixed-full"></div>
        <MainHero v-if="$route.path==='/'"/>
      </div>

      <DynDialog2 v-if="showDynDialog" :show="showDynDialog" :obj="paginasPath" @hide="showDynDialog=false"/>

    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js'
import Espacio3DGltf from "components/Espacio3DGltf";
import EdificioCU3D from "components/EdificioCU3D";
import MainHero from "components/MainHero";
import PruebaImgBg from "components/PruebaImgBg";
import TeatroJRR3D from "components/TeatroJRR3D";
import DynDialog2 from "components/DynDialog2";
import {KTX2Loader} from "three/examples/jsm/loaders/KTX2Loader";
import {MeshoptDecoder} from "three/examples/jsm/libs/meshopt_decoder.module";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {SSAOPass} from "three/examples/jsm/postprocessing/SSAOPass";


export default {
  name: 'PageIndex',
  components: {MainHero, DynDialog2},
  data() {
    return {
      paginasPath: {contenido: []},
      container: undefined,
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
      modelCU: undefined
    }
  },
  computed: {
    ...mapGetters('campus', ['paginasIndexGet', 'pageReadyGet', 'showRightDrawerGet', 'showDynDialogGet']),
    paginasIndex: {
      get() {
        return this.paginasIndexGet
      },
      set(value) {
        this.paginasIndexSet(value)
      }
    },
    showDynDialog: {
      get() {
        return this.showDynDialogGet
      },
      set(value) {
        this.showDynDialogSet(value)
      }
    },
    pageReady: {
      get() {
        return this.pageReadyGet
      },
      set(value) {
        this.pageReadySet(value)
      }
    },
    showRightDrawer: {
      get() {
        return this.showRightDrawerGet
      },
      set(value) {
        this.showRightDrawerSet(value)
      }
    },
  },
  methods: {
    ...mapActions('campus', ['paginasIndexSet', 'pageReadySet', 'showRightDrawerSet', 'showDynDialogSet']),
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

      this.scene.background = new THREE.Color('#80dcf8');

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

      const ktx2Loader = new KTX2Loader()
      ktx2Loader.setTranscoderPath('~assets/js/libs/basis/').detectSupport(this.renderer);
      const manager = new THREE.LoadingManager();
      const loader = new GLTFLoader(manager).setPath('/models/gltf/')
      loader.setKTX2Loader(ktx2Loader);
      loader.setMeshoptDecoder(MeshoptDecoder);
      loader.load('cu.glb', (gltf) => {
        this.gltf = gltf
        this.gltf.scene.position.y = 20;
        this.$route.path === '/' ? this.gltf.scene.rotation.y = (Math.PI * .25) * 3 : this.gltf.scene.rotation.y = (Math.PI * Math.random() * 2);
        this.gltf.scene.position.x = -200;
        this.gltf.scene.position.z = 200;
        this.scene.add(this.gltf.scene);
        this.pageReady = true
      });

      manager.onLoad = () => {
        console.log("on load")
      }
      manager.onError = () => {
        console.log("on error")
      }
      manager.onProgress = (item, loaded, total) => {
        console.log("manager onProgress", item, loaded, total);
        if (item.lengthComputable) {
          let percentComplete = item.loaded / item.total * 100;
          console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
        }
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
      console.log("this.$route.path", this.$route.path)
      let path = this.$route.path.replace('/p/', '')
      path = path.replace('/', '')
      this.paginasPath = this.getPaginasPath(path)
      if (path !== '') {
        this.showDynDialog = true
      }
      this.camera.position.set(2000, 2000, 600)
      if (this.$route.path === '/') {
        this.gltf.scene.rotation.y = (Math.PI * .25) * 3
      } else {
         this.gltf.scene.rotation.y = (Math.PI * Math.random() * 2)
      }
    },
    paginasIndex() {
      let path = this.$route.path.replace('/p/', '')
      path = path.replace('/', '')
      this.paginasPath = this.getPaginasPath(path)
    },
    showDynDialog() {
      if (this.showDynDialog) {
        this.showRightDrawer = false
      } else {
        this.showRightDrawer = true
        this.$router.push('/')
      }
    },
    pageReady() {
      if (this.pageReady) {
        setTimeout(() => {
          this.container = this.$refs.webgl;
          console.log("path", this.$route.path)
          this.initThree()
          this.animate()
        }, 100)
      }
    }
  },
  created() {

  },
  mounted() {

    console.log("on mounted")
  }
}
</script>
