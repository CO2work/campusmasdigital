<template>
  <div style="height: 100vh;">
    <div class="full-height row wrap justify-center items-center content-center q-mx-auto"
         style="max-width: 65rem; position: relative">
      <div class="col-shrink col-xs-12 col-sm-8 col-md-5 self-center q-ma-lg">
        <h4 class="q-mb-lg text-primary text-weight-light">Campus Digital UMSNH</h4>
        <p class="text-body2">
          Conoce los espacios digitales de la Universidad, sus servicios digitales y navega el campus virtual
        </p>
        <q-btn size="sm"
               unelevated
               no-wrap
               class="q-mr-md q-pa-xs bg-primary text-white">
          <span class="text-body2">Conocer más</span>
          <q-icon name="las la-arrow-down" size="md" class="q-pl-md"/>
        </q-btn>

        <q-btn size="sm"
               @click="showRightDrawer=true"
               unelevated
               no-wrap
               class="q-my-md q-pa-xs bg-white text-primary no-wrap">
          <span class="text-body2">Explorar</span>
          <q-icon name="las la-arrow-right" size="md" class="q-pl-md"/>
        </q-btn>
      </div>

      <div class="col-shrink col-xs-12 col-sm-8 col-md-5 self-center q-ma-lg">
        <!--        <q-img src="~assets/img/logo-geometry-v2.svg"></q-img>-->
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'MainHero',
  components: {},
  computed: {
    ...mapGetters('campus', ['showRightDrawerGet']),
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
    ...mapActions('campus', ['showRightDrawerSet']),
  },
  data() {
    return {}
  },
}
</script>





