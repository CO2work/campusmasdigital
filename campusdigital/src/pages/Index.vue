<template>
  <div>
    <div>
      <div v-if="pageReady">
        <div ref="webgl" class="fixed-full"></div>
        <MainHero v-if="!showDynDialog"/>
      </div>

      <DynDialog2 v-if="showDynDialog" :show="showDynDialog" :obj="paginasPath"
                  @hide="hideDynDialog()"
                  @changedialog="changeDynDialog()"/>

    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import MainHero from "components/MainHero";
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
      raycaster: undefined,
      intersects: undefined,
      mouse: undefined,
      mouseX: 0,
      mouseY: 0,
      INTERSECTED: undefined,
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
    hideDynDialog() {
      console.log("hideDynDialog")
      this.showDynDialog = false
      this.$router.push('/')
    },
    changeDynDialog() {
      this.showDynDialog = false
      console.log("changeDynDialog")
    },
    render() {
      this.camera.position.x += (this.mouseX - this.camera.position.x) * .025;
      this.camera.position.y += (-this.mouseY - this.camera.position.y) * .025;
      this.camera.lookAt(this.scene.position);
      this.renderer.render(this.scene, this.camera);
    },

    onDocumentMouseClick(event) {
      console.log("clic", event)
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      console.log("mouse", this.mouse)
    },

    onDocumentMouseMove(event) {
      this.mouseX = (event.clientX - this.windowHalfX) * .08;
      this.mouseY = (event.clientY - this.windowHalfY) * .09;
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
      this.$refs.webgl.appendChild(this.renderer.domElement);

      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1;
      this.renderer.outputEncoding = THREE.sRGBEncoding;

      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()

      this.raycaster.setFromCamera(this.mouse, this.camera)

      this.scene.background = new THREE.Color('#2484e8')

      const grid = new THREE.GridHelper(2500, 150, 0xbbeeff, 0x324C5E);
      grid.position.y = 0
      grid.rotation.x = .65;
      grid.material.opacity = 0.25;
      grid.material.depthWrite = false;
      grid.material.transparent = true;
      this.scene.add(grid);

      const composer = new EffectComposer(this.renderer);

      const ssaoPass = new SSAOPass(this.scene, this.camera, window.innerWidth, window.innerHeight);
      ssaoPass.kernelRadius = 36;
      composer.addPass(ssaoPass);
      composer.render();

      const ambientLight = new THREE.AmbientLight('#ffffff', 0.4);
      this.scene.add(ambientLight);

      const pointLight = new THREE.PointLight('#ffffff', 0.5);
      this.camera.add(pointLight);
      this.scene.add(this.camera);

      const ktx2Loader = new KTX2Loader()
      ktx2Loader.setTranscoderPath('~assets/js/libs/basis/').detectSupport(this.renderer);
      const manager = new THREE.LoadingManager();
      const loader = new GLTFLoader(manager).setPath('/models/gltf/')
      loader.setKTX2Loader(ktx2Loader);
      loader.setMeshoptDecoder(MeshoptDecoder);
      loader.load('color_cu_v3.glb', (gltf) => {
        this.gltf = gltf
        this.gltf.scene.position.y = 0;
        this.$route.path === '/' ? this.gltf.scene.rotation.y = (Math.PI * .25) * 3 : this.gltf.scene.rotation.y = (Math.PI * Math.random() * 2);
        this.gltf.scene.position.x = 0;
        this.gltf.scene.position.z = 0;
        this.scene.add(this.gltf.scene);

        /*
                this.gltf.scene.children.forEach(el => {
                  //if (el.type === 'Mesh')
                  console.log("el", el)
                  this.scene.add(el)
                })
         */


        this.pageReady = true

        this.gltf.scene.rotation.x = .65;
        console.log("gltf", this.gltf.scene.children)

        console.log("scene", this.scene.children[3].children)
        this.intersects = this.raycaster.intersectObjects(this.scene.children[3].children);

        if (this.intersects.length > 0) {

          if (this.INTERSECTED != this.intersects[0].object) {

            if (this.INTERSECTED) {
              this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
            }

            this.INTERSECTED = this.intersects[0].object;
            console.log("this.INTERSECTED", this.INTERSECTED)
            this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
            this.INTERSECTED.material.emissive.setHex(0xff0000);

          }

        } else {

          if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);

          this.INTERSECTED = undefined;

        }
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
      console.log("path", path)
      console.log("this.paginasPath", this.paginasPath)

      if (path !== '') {
        setTimeout(() => {
          //this.showDynDialog = false
          setTimeout(() => {
            this.showDynDialog = true
          }, 100)
        }, 100)
      } else {
        console.log("probando")
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
        if (this.$q.screen.width > 765) {
          this.showRightDrawer = true
        }

      }
    },
    pageReady() {
      if (this.pageReady) {
        setTimeout(() => {
          this.container = this.$refs.webgl;
          console.log("path", this.$route.path)
          if (this.$route.path !== '/') {
            this.showDynDialog = true
          }
          setTimeout(() => {
            this.initThree()
            this.animate()
          }, 100)
        }, 100)
      }
    },
  },
  created() {
    document.addEventListener('mousemove', this.onDocumentMouseMove);
      document.addEventListener('click', this.onDocumentMouseClick);
      window.addEventListener('resize', this.onWindowResize);
  },
  mounted() {
    if (this.pageReady) {
      setTimeout(() => {
        this.container = this.$refs.webgl;
        console.log("path", this.$route.path)
        setTimeout(() => {
          this.initThree()
          this.animate()
        }, 100)
      }, 100)
    }
  }
}
</script>
