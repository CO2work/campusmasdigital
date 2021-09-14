<template>
  <div style="height: 100vh;">
    <div class="full-height hide-scrollbar row wrap justify-center items-center content-center q-mx-auto"
         style="max-width: 65rem; position: relative">

          <div class="col-shrink col-xs-12 col-sm-8 col-md-5 self-center q-ma-lg">
            <q-img src="~assets/logo_campus_v1.svg"
                   class="q-my-md"
                   style="width :62px; height: auto"/>
            <div class="text-h4 q-ma-none q-mb-lg text-primary text-uppercase text-weight-bold">
              Campus Digital
              <br>
              <span class="text-uppercase text-weight-light text-blue-8"><small>Universidad Michoacana
              <br>
              de San Nicolás de Hidalgo</small></span>
            </div>
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
      <div class="row full-height full-width bg-white">

        <q-page-sticky position="top-left" :offset="[16, 16]" style="margin-top: -35px" class="z-max">
          <q-btn fab-mini color="primary" icon="las la-angle-left" @click="showConocerMas=false"/>
        </q-page-sticky>

        <div class="col-12">

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
                    Este es un espacio para ti, ya sea que formes parte de la comunidad nicolaita o que te interese conocer más sobre la Universidad. Aquí podrás encontrar recursos, contenidos y servicios digitales de todas las áreas académicas, de investigación, difusión cultural y extensión universitaria. Aprovecha nuestras revistas y libros digitales, recorridos virtuales culturales y exposiciones, haz trámites en línea y mucho más.
                  </p>
                </div>
                <div class="order-lg-last col-shrink col-xs-12 col-sm-10 col-md-4 self-center q-px-lg q-py-sm">
                  <q-img class="ripple" src="https://firebasestorage.googleapis.com/v0/b/campus-b4087.appspot.com/o/about%2Fc_17.jpg?alt=media&token=226d0863-da15-4cd7-af42-2084be09de00"></q-img>
                </div>
              </div>

              <div class="q-pa-md row items-start q-gutter-md row wrap justify-start q-mx-auto" style="max-width: 65rem;">
                <div class="order-md-last col-shrink col-xs-12 col-sm-10 col-md-4 self-center q-px-lg q-py-sm">
                  <q-img class="ripple" src="https://firebasestorage.googleapis.com/v0/b/campus-b4087.appspot.com/o/about%2Fc_24.jpg?alt=media&token=60bcf30e-7934-41ca-aa78-db1859963605"></q-img>
                </div>
                <div class="order-md-first col-shrink col-xs-12 col-sm-10 col-md-7 self-center q-px-lg q-py-sm">
                  <h5 class="q-mb-lg q-mt-sm text-blue-7 text-weight-light text-uppercase">¿Para qué es el Campus Digital?</h5>

                  <p class="text-h6 text-blue-grey-9 text-weight-light">
                    El Campus Digital está diseñado para complementar tu educación con todas las herramientas y recursos digitales que la Universidad pone a tu disposición. En él podrás aprender, compartir y conectar con las distintas áreas de nuestra institución de manera fácil y rápida, todo en un mismo lugar.
                  </p>
                </div>
              </div>

              <div class="full-width q-my-xl">
                <q-parallax height="300">
                  <template v-slot:media>
                    <img src="https://firebasestorage.googleapis.com/v0/b/campus-b4087.appspot.com/o/about%2Fc_Facultad_de_Arquitectura.jpg?alt=media&token=1cabbe6e-1d57-43f8-820a-ee36a42a3549">
                  </template>
                </q-parallax>

              </div>


              <div class="q-pa-md row items-start q-gutter-md row wrap justify-start q-mx-auto" style="max-width: 65rem;">
                <div class="order-md-last col-shrink col-xs-12 col-sm-10 col-md-4 self-center q-px-lg q-py-sm">
                  <q-img class="ripple" src="https://firebasestorage.googleapis.com/v0/b/campus-b4087.appspot.com/o/about%2Fc_25.jpg?alt=media&token=bcaeb805-61b4-4066-a85f-9dcf35f6d62e"></q-img>
                </div>
                <div class="order-md-first col-shrink col-xs-12 col-sm-10 col-md-7 self-center q-px-lg q-py-sm">
                  <h5 class="q-mb-lg q-mt-sm text-blue-7 text-weight-light text-uppercase">¿Como es el Campus Digital?</h5>

                  <p class="text-h6 text-blue-grey-9 text-weight-light">
                    Accede sin necesidad de registro a un campus digital moderno, sencillo y fácil de navegar que agiliza la comunicación y promueve un modelo de enseñanza-aprendizaje innovador y de calidad.  Es una herramienta que está a la vanguardia de los procesos educativos y la evolución tecnológica.
                  </p>
                </div>
              </div>

              <div class="full-width bg-primary ">
                <div class="q-mt-xl q-pt-xl q-pa-md row items-start row wrap justify-start q-mx-auto" style="max-width: 65rem;">
                  <div class="col-shrink col-xs-12 col-sm-10 col-md-6 self-center q-px-lg q-py-sm">
                    <div class="text-white q-gutter-lg">
                      <p class="text-h6 text-white text-weight-light">
                        Síguenos
                      </p>
                        <q-btn
                          round
                          dense
                          type="a"
                          target="_blank"
                          href="https://www.facebook.com/UMSNHoficial/"
                          size="lg"
                          icon="lab la-facebook-f"
                        /><q-btn
                          round
                          dense
                          type="a"
                          target="_blank"
                          href="https://twitter.com/UMSNHOficial"
                          size="lg"
                          icon="lab la-twitter"
                        /><q-btn
                          round
                          dense
                          type="a"
                          target="_blank"
                          href="https://www.instagram.com/umsnhoficial/"
                          size="lg"
                          icon="lab la-instagram"
                        />
                      </div>
                  </div>
                  <div class="col-shrink col-xs-12 col-sm-10 col-md-6 self-center q-px-lg q-py-sm">
<!--                    <p class="text-h6 text-white text-weight-light">-->
<!--                      Debitis explicabo ipsum officia!-->
<!--                    </p>-->
                    <p class="text-body text-blue-9">

                    </p>
                  </div>
                  <div class="col-shrink col-xs-12 text-right align-baseline q-px-lg q-pt-lg">
<!--                    <p class="text-h6 text-white text-weight-light">-->
<!--                      Debitis explicabo ipsum officia!-->
<!--                    </p>-->
                    <p class="text-body text-blue-9">
                      Copyright. UMSNH. Todos los derechos reservados.
                    </p>
                  </div>
                </div>
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




