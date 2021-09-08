<template>
  <div style="height: 100vh;">
    <div class="full-height hide-scrollbar row wrap justify-center items-center content-center q-mx-auto"
         style="max-width: 65rem; position: relative">

          <div class="col-shrink col-xs-12 col-sm-8 col-md-5 self-center q-ma-lg">
            <h4 class="q-mb-lg text-primary text-weight-light">Campus Digital UMSNH</h4>
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
      class="full-height"
    >
      <div class="column full-height full-width dot-grid bg-white">

        <q-page-sticky position="top-left" class="z-top" :offset="[16, 16]">
          <q-btn fab-mini color="primary" icon="las la-angle-left" @click="showConocerMas=false"/>
        </q-page-sticky>

        <div class="row">
          <div class="col">

            <main class="q-pb-xl">
              <div class="q-pa-md row items-start q-gutter-md row wrap justify-start q-mx-auto" style="max-width: 65rem;">

                <div class="col-shrink col-xs-12 col-sm-8 self-center q-px-lg q-py-sm">
                  <div>
                    <img src="~assets/logo_campus_v1.svg" alt="" style="width: 8rem;">
                    <h3 class="q-my-md text-grey-7">Campus digital</h3>
                    <h6 class="q-my-md text-primary text-uppercase">Universidad Michoacana <br>de San Nicolás de Hidalgo</h6>
                  </div>
                </div>
                <div class="col-shrink col-xs-12 col-sm-10 col-md-7 self-center q-px-lg q-py-sm">
                  <h5 class="q-mb-lg q-mt-sm text-blue-7 text-weight-light text-uppercase">¿Qué es el Campus Digital?</h5>

                  <p class="text-h6 text-blue-grey-9 text-weight-light">
                    Es un espacio dedicado a toda la comunidad Nicolaita, donde pueden encontrarse recursos, contenidos y servicios digitales en las áreas académicas, de investigación, difusión cultural y extensión universitaria, con recursos electrónicos como revistas, tesis, recorridos virtuales culturales, exposiciones, entre otros.
                  </p>
                </div>

                <q-card class="my-card self-stretch" flat bordered>
                  <q-img
                    src="https://firebasestorage.googleapis.com/v0/b/campus-b4087.appspot.com/o/Temp%2Fday18-floppy.png?alt=media&token=259a49b8-191a-4f33-873d-d4ef99d199ce"
                  />
                  <q-card-section>
                    <div class="text-h5 q-mt-sm q-mb-xs">Adipisci eligendi</div>
                    <div class="text-uppercase text-small text-orange-9">Explicabo inventore</div>
                    <div class="text-caption text-grey q-my-md">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci eligendi est explicabo inventore, ipsa laboriosam laudantium quae quibusdam reiciendis sint temporibus vero. Assumenda cum dignissimos illo incidunt laboriosam nemo recusandae?
                    </div>
                  </q-card-section>

                  <q-card-actions>
                    <q-btn size="md" color="light" label="Enlace" class="text-white bg-primary" />

                    <q-space />

                    <q-btn
                      color="grey"
                      round
                      flat
                      dense
                      :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                      @click="expanded = !expanded"
                    />
                  </q-card-actions>

                  <q-slide-transition>
                    <div v-show="expanded">
                      <q-separator />
                      <q-card-section class="text-subitle2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet autem commodi consectetur consequatur culpa cum, cupiditate ea enim error est fugit laboriosam nemo nihil omnis sed ullam, ut velit!
                      </q-card-section>
                    </div>
                  </q-slide-transition>
                </q-card>
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
import gsap from 'gsap'

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




