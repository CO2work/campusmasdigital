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

        <Espacio3DGltf v-if="$route.path === '/'"/>
        <TeatroJRR3D v-if="$route.path === '/gg'"/>
        <EdificioCU3D v-if="$route.path === '/p/revistas' || $route.path === '/p/plataformas_educativas'
          || $route.path === '/p/bibliotecas_en_linea' || $route.path === '/p/comunicacion_digital'
          || $route.path === '/p/agenda_digital_nicolaita'"/>
        <TeatroJRR3D v-if="$route.path === '/p/redes_sociales_institucionales'
          || $route.path === '/p/redes_sociales_institucionales'
          || $route.path === '/p/servicios_digitales'
          || $route.path === '/p/revistas'"/>
      </div>

      <!--
      <h4 v-if="paginasPath.titulo"> {{ paginasPath.titulo }} </h4>

      <div v-if="paginasPath.contenido.length" class="row">
        <div class="columnt" v-for="(item, idx) in paginasPath.contenido" :key="idx">
          <q-card flat bordered>
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

            <q-separator/>

            <q-card-actions>
              <q-btn flat round icon="link"/>
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

      -->

      <DynDialog v-if="showDynDialog" :show="showDynDialog" :obj="paginasPath" @hide="showDynDialog=false"/>

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
import TeatroJRR3D from "components/TeatroJRR3D";
import DynDialog from "components/DynDialog";


export default {
  name: 'PageIndex',
  components: {Espacio3DGltf, EdificioCU3D, TeatroJRR3D, DynDialog},
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
      texture: undefined,
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
  },
  watch: {
    '$route.path': function () {
      console.log(this.$route.path)
      let path = this.$route.path.replace('/p/', '')
      path = path.replace('/', '')
      this.paginasPath = this.getPaginasPath(path)
      if (path !== '') {
        this.showDynDialog = true
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
    }
  },
  mounted() {
    console.log("path", this.$route.path)
  }
}
</script>
