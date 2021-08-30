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

      <p> Tarjetas </p>

      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Overline</div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ paginasIndex.AgendaDigitalNicolaita.titulo }}</div>
              <div class="text-caption text-grey">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://cdn.quasar.dev/img/parallax2.jpg"
              />
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat round icon="event" />
            <q-btn flat>
              7:30PM
            </q-btn>
            <q-btn flat color="primary">
              Reserve
            </q-btn>
          </q-card-actions>
        </q-card>
    </div>

    </div>

  </q-page>
</template>

<script>


import {mapActions, mapGetters} from "vuex";

export default {
  name: 'PageIndex',
  components: {

  },
  data() {
    return {

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
  },
  created() {
    console.log(this.$route.path.replace('/', ''))
  }

}
</script>
