<template>
  <q-page class="flex">
    <div class="main">

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
      <div ref="webgl" class="webgl"></div>

      <h4> {{ paginasPath.titulo }} </h4>

      <div class="q-pa-md row items-start q-gutter-md">
        <q-card v-for="(item, idx) in paginasPath.contenido" :key="idx" class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Categoría</div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ item.titulo }}</div>
              <div class="text-caption text-grey">
                {{ item.descripcion }}
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                :src="item.imagen"
              />
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat round icon="link" />
            <q-btn flat>
              Enlace
            </q-btn>
            <q-btn flat color="primary" type="a" :href="item.enlace" target="__blank">
              Enlace
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>

    </div>

  </q-page>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js'


export default {
  name: 'PageIndex',
  components: {},
  data() {
    return {
      paginasPath: {contenido: []},
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
      this.mouseX = (event.clientX - this.windowHalfX) / 2;
      this.mouseY = (event.clientY - this.windowHalfY) / 2;
    },
    onWindowResize() {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    loadModel() {
      this.object.traverse((child) => {
        if (child.isMesh) child.material.map = this.texture;
      });
      this.object.position.y = -95;
      this.scene.add(this.object);
    },
    initThree() {

      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);

      this.camera.position.z = 600;
      this.camera.position.y = 2000;
      this.camera.position.x = 2000;

      // scene

      this.scene = new THREE.Scene();


      const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
      this.scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 0.8);
      this.camera.add(pointLight);
      this.scene.add(this.camera);

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

      }

      loader.load('/models/teatro_jrr_v2.obj', (obj) => {
        this.teatro_jrr = obj;
      }, onProgress, onError);

      manager.onLoad = () => {
        console.log("on load")
        this.edificio_cu.traverse((child) => {
          if (child.isMesh) child.material.map = this.texture;
        });
        this.edificio_cu.position.y = -95;
        this.scene.add(this.edificio_cu);
        this.teatro_jrr.traverse((child) => {
          if (child.isMesh) child.material.map = this.texture;
        });
        this.teatro_jrr.position.y = -95;
        this.teatro_jrr.position.z = -95;
        this.scene.add(this.teatro_jrr);
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
      this.camera.position.z = Math.random() * 1000
      this.camera.position.y = Math.random() * 1000
      this.camera.position.x = Math.random() * 1000
    },
    paginasIndex() {
      let path = this.$route.path.replace('/p/', '')
      path = path.replace('/', '')
      this.paginasPath = this.getPaginasPath(path)
    }
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
