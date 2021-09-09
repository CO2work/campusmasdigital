<template>
  <div style="height: 100vh;">
    <div class="full-height hide-scrollbar row wrap justify-center items-center content-center q-mx-auto"
         style="max-width: 65rem; position: relative">

          <div class="col-shrink col-xs-12 col-sm-8 col-md-5 self-center q-ma-lg">
            <q-img src="~assets/logo_campus_v1.svg"
                   class=""
                   style="width :62px; height: auto"/>
            <h4 class="q-ma-none q-mb-lg text-primary text-weight-light">
              Campus Digital UMSNH
            </h4>
            <p class="text-body2">
              Conoce los espacios digitales de la Universidad, sus servicios digitales y navega el campus virtual
            </p>
            <q-btn size="sm"
                   unelevated
                   no-wrap
                   @click="showConocerMas=true"
                   class="q-my-md q-mr-md q-pa-xs bg-primary text-white">
              <span class="text-body2">Conocer más</span>
              <q-icon name="las la-arrow-down" size="md" class="q-pl-md"/>
            </q-btn>

            <q-btn size="sm"
                   v-show="!showRightDrawer"
                   @click="showRightDrawer=true"
                   unelevated
                   no-wrap
                   class="q-pa-xs bg-white text-primary no-wrap">
              <span class="text-body2">Explorar</span>
              <q-icon name="las la-arrow-right" size="md" class="q-pl-md"/>
            </q-btn>
          </div>

          <div class="col-shrink col-xs-12 col-sm-8 col-md-5 self-center q-ma-lg">
            <!--        <q-img src="~assets/img/logo-geometry-v2.svg"></q-img>-->
          </div>
    </div>


    <q-dialog
      v-model="showConocerMas"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="jump-down"
    >
      <div class="column full-height full-width bg-white">

        <q-page-sticky position="top-left" :offset="[16, 16]" style="margin-top: -70px">
          <q-btn fab-mini color="primary" icon="las la-angle-left" @click="showConocerMas=false"/>
        </q-page-sticky>

        <div class="row">
          <div class="col">

            <main>
              <div class="q-pa-md row items-start q-gutter-md row wrap justify-start q-mx-auto" style="max-width: 65rem;">

                <div class="col-shrink col-xs-12 col-sm-8 self-center q-px-lg q-py-sm">
                  <div>
                    <img src="~assets/logo_campus_v1.svg" alt="" style="width: 8rem;">
                    <h3 class="q-my-md text-grey-7">Campus digital</h3>
                    <h6 class="q-my-md text-primary text-uppercase">Universidad Michoacana <br>de San Nicolás de Hidalgo</h6>
                  </div>
                </div>
              </div>

              <div class="q-pa-md row items-start q-gutter-md row wrap justify-start q-mx-auto" style="max-width: 65rem;">
                <div class="order-lg-first col-shrink col-xs-12 col-sm-10 col-md-7 self-center q-px-lg q-py-sm">
                  <h5 class="q-mb-lg q-mt-sm text-blue-7 text-weight-light text-uppercase">¿Qué es el Campus Digital?</h5>

                  <p class="text-h6 text-blue-grey-9 text-weight-light">
                    Es un espacio dedicado a toda la comunidad Nicolaita, donde pueden encontrarse recursos, contenidos y servicios digitales en las áreas académicas, de investigación, difusión cultural y extensión universitaria, con recursos electrónicos como revistas, tesis, recorridos virtuales culturales, exposiciones, entre otros.
                  </p>
                </div>
                <div class="order-lg-last col-shrink col-xs-12 col-sm-10 col-md-4 self-center q-px-lg q-py-sm">
                  <q-img class="ripple" src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=654&q=80"></q-img>
                </div>
              </div>

              <div class="q-pa-md row items-start q-gutter-md row wrap justify-start q-mx-auto" style="max-width: 65rem;">
                <div class="order-md-last col-shrink col-xs-12 col-sm-10 col-md-4 self-center q-px-lg q-py-sm">
                  <q-img class="ripple" src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=654&q=80"></q-img>
                </div>
                <div class="order-md-first col-shrink col-xs-12 col-sm-10 col-md-7 self-center q-px-lg q-py-sm">
                  <h5 class="q-mb-lg q-mt-sm text-blue-7 text-weight-light text-uppercase">¿Para qué es el Campus Digital?</h5>

                  <p class="text-h6 text-blue-grey-9 text-weight-light">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam aspernatur atque doloribus enim, iure labore nisi porro quasi sed tempore, veritatis? Amet at consequatur consequuntur deleniti natus odio, placeat.
                  </p>
                </div>
              </div>

              <div class="full-width q-my-xl">
                <div class="col-xs-12">
                  <q-img class="ripple" src="https://firebasestorage.googleapis.com/v0/b/campus-b4087.appspot.com/o/Temp%2Fdrone_tmp.jpg?alt=media&token=d248d06e-31d7-4b1e-af3c-05f0290c079c"></q-img>
                </div>
              </div>


              <div class="q-pa-md row items-start q-gutter-md row wrap justify-start q-mx-auto" style="max-width: 65rem;">
                <div class="order-md-last col-shrink col-xs-12 col-sm-10 col-md-4 self-center q-px-lg q-py-sm">
                  <q-img class="ripple" src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=654&q=80"></q-img>
                </div>
                <div class="order-md-first col-shrink col-xs-12 col-sm-10 col-md-7 self-center q-px-lg q-py-sm">
                  <h5 class="q-mb-lg q-mt-sm text-blue-7 text-weight-light text-uppercase">¿Como es el Campus Digital?</h5>

                  <p class="text-h6 text-blue-grey-9 text-weight-light">
                    Beatae error eveniet hic recusandae! Ab aut, dolore odit porro quae recusandae rem rerum sed unde. Accusamus beatae impedit quibusdam quisquam suscipit.
                  </p>
                </div>
              </div>

              <div class="full-width">
                <div class="q-mt-xl bg-primary q-py-xl q-pa-md row items-start q-gutter-md row wrap justify-center">
                  <div class="col-shrink col-xs-12 col-sm-10 col-md-7 self-center q-px-lg q-py-sm">
                    <p class="text-h6 text-white text-weight-light">
                      Debitis explicabo ipsum officia!
                    </p>
                    <p class="text-body2 text-blue-4">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias est in numquam officiis quidem, unde? Accusamus cum eaque expedita iusto similique unde voluptatem? Deserunt dolore iure quisquam sed totam?
                    </p>
                  </div>
                  <div class="col-shrink col-xs-12 col-sm-10 col-md-7 self-center q-px-lg q-py-sm">
                    <q-btn size="sm"
                           unelevated
                           no-wrap
                           class="q-pa-xs bg-white text-primary no-wrap">
                      <span class="text-body2">Explorar</span>
                      <q-icon name="las la-arrow-right" size="md" class="q-pl-md"/>
                    </q-btn>
                  </div>
                </div>
              </div>

            </main>

          </div>
        </div>
      </div>
    </q-dialog>
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
    return {
      showConocerMas: false
    }
  },
}
</script>




