<template>
  <div style="height: 100vh;">
    <div class="full-height row wrap justify-center items-center content-center q-mx-auto"
         style="max-width: 65rem; position: relative">
      <div class="col-shrink col-xs-6 col-sm-6 col-md-5 col-xl-3 self-center q-ma-lg">
        <h4 class="q-mb-lg text-primary text-weight-light">Campus Digital UMSNH</h4>
        <p class="text-body2">
          Conoce los espacios digitales de la Universidad, sus servicios digitales y navega el campus virtual
        </p>
        <q-btn size="sm"
               unelevated
               class="
            q-pa-xs
            bg-primary
            text-white
          ">
          <span class="text-body2">Conocer más</span>
          <q-icon name="las la-arrow-down" size="md" class="q-pl-md"/>
        </q-btn>

        <q-btn size="sm"
               unelevated
               class="
            q-mx-md
            q-pa-xs
            bg-white
            text-primary
          ">
          <span class="text-body2">Explorar</span>
          <q-icon name="las la-arrow-left" size="md" class="q-pl-md"/>
        </q-btn>
      </div>

      <div class="col-shrink col-xs-6 col-sm-6 col-md-5 col-xl-3 self-center q-ma-lg">
        <!--        <q-img src="~assets/img/logo-geometry-v2.svg"></q-img>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainHero',
  components: {},
  props: ['intro'],
  data() {
    return {}
  },
}
</script>





