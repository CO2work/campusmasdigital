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

      <h1> {{ paginasPath.titulo }} </h1>

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
            <q-btn flat round icon="external-link" />
            <q-btn flat>
              Leer más
            </q-btn>
            <q-btn flat color="primary">
              {{ item.enlace }}
            </q-btn>
          </q-card-actions>
        </q-card>

        <q-card tabindex="0" class="my-card" flat bordered style="overflow: hidden;outline:0">
          <div v-ripple @click="doSomething" class="cursor-pointer relative-position">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"
            ></q-img>
            <q-card-section>
              <div class="text-overline text-orange-9">Overline</div>
              <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
              <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </q-card-section>
          </div>

          <q-card-actions>
            <q-btn flat color="dark" label="Share"></q-btn>
            <q-btn flat color="primary" label="Book"></q-btn>

            <q-space ></q-space>

            <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            ></q-btn>
          </q-card-actions>

          <q-slide-transition>
            <div v-show="expanded">
              <q-separator ></q-separator>
              <q-card-section class="text-subitle2">
                {{ lorem }}
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
    </div>

    </div>

  </q-page>
</template>

<script>


import {mapActions, mapGetters} from "vuex";

export default {
  name: 'PageIndex',
  components: {},
  data() {
    return {
      paginasPath: {}
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
      console.log("path", path)
      console.log("this.paginasIndex", Object.entries(this.paginasIndex))
      let filtradas
      Object.values(this.paginasIndex).forEach(item => {
        console.log("item", item)
        if (item.slug === path) {
          filtradas = item
        }
      })
      console.log(filtradas)
      return filtradas
    }
  },
  watch: {
    '$route.path': function () {
      let path = this.$route.path.replace('/p/', '')
      path = path.replace('/', '')
      this.paginasPath = this.getPaginasPath(path)
    },
    paginasIndex() {
      let path = this.$route.path.replace('/p/', '')
      path = path.replace('/', '')
      this.paginasPath = this.getPaginasPath(path)
    }
  },
}
</script>
