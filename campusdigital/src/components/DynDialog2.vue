<template>
  <div>
    <q-dialog
      v-model="showDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="jump-down"
      class="full-height"
    >

      <div class="column full-height full-width dot-grid bg-white">

        <q-page-sticky position="top-left" class="z-top" :offset="[16, 16]">
          <q-btn fab-mini color="primary" icon="las la-angle-left" @click="showDialog=false"/>
        </q-page-sticky>

        <div class="row">
          <div class="col">

            <main>
              <!--              <q-card-->
              <!--                v-if="cardMaximizedIdx > -1" class="full-height full-width" flat bordered-->
              <!--              >-->

              <!--              </q-card>-->

              <q-dialog
                v-model="showMaximizedItem"
                :maximized="true"
                transition-show="slide-up"
                transition-hide="jump-down"
                class="full-height"
              >
                <div v-if="maximizedItem" class="column full-height full-width dot-grid bg-white micro-hero">

                  <q-page-sticky position="top-left" :offset="[16, 16]">
                    <q-btn fab-mini color="primary" icon="mdi-close" @click="showMaximizedItem=false"/>
                  </q-page-sticky>

                  <div class="row">
                    <div class="col">

                      <!--

                      CONTENIDO AQUI

                      -->


                      <q-page-sticky position="top-left" class="z-top" :offset="[16, 16]">
                        <q-btn fab-mini color="primary" icon="mdi-close" @click="closeCard()"/>
                      </q-page-sticky>
                      <div class="row wrap justify-start relative-position q-mx-auto"
                           style="max-width: 65rem;">
                        <div class="col-shrink col-xs-12 col-sm-10 col-md-5 self-center q-ma-lg">
                          <q-img
                            v-if="maximizedItem.imagen"
                            :src="maximizedItem.imagen"
                            class="full-height full-width"
                          />
                        </div>

                        <div class="col-shrink col-xs-12 col-sm-10 col-md-5 self-center q-ma-lg">

                          <h4 class="q-mb-lg text-blue-7 text-weight-normal">
                            {{ maximizedItem.titulo }}
                          </h4>
                          <h5 class="text-blue-9 text-weight-light q-ma-none">
                            {{ maximizedItem.subtitulo }}
                          </h5>
                        </div>

                        <div v-if="maximizedItem.descripcion" class="col-shrink col-xs-12 col-sm-10 col-md-7 self-center q-ma-lg">
                          <p class="text-body2 text-blue-grey-9 text-weight-light">
                            {{ maximizedItem.descripcion }}
                          </p>
                        </div>

                        <div v-if="maximizedItem.video" class="col-shrink col-xs-12 col-sm-10 col-md-7 self-center q-ma-lg">
                          <div class="q-pa-md">
                            <q-video
                              :ratio="16/9"
                              :src="'https://www.youtube.com/embed/'+obj.video+'?rel=0'"
                            />
                          </div>
                        </div>

                        <div class="col-shrink col-xs-12 col-sm-10 col-md-7 self-center q-ma-lg">
                          <p v-if="maximizedItem.descripcion_extra" class="text-body2 text-blue-grey-9 text-weight-light">
                            {{ maximizedItem.descripcion_extra }}
                          </p>
                        </div>

                        <div  v-if="maximizedItem.slides && maximizedItem.slides.length"
                          class="col-shrink col-xs-12 col-sm-10 self-center q-my-lg full-width">
                          <q-carousel
                            swipeable
                            animated
                            v-model="slide"
                            :autoplay="autoplay"
                            ref="carousel"
                            infinite
                            transition-prev="slide-right"
                            transition-next="slide-left"
                          >
                            <q-carousel-slide v-for="(item, idx) in maximizedItem.slides" :key="idx"  :name="idx" :img-src="item" />

                            <template v-slot:control>
                              <q-carousel-control
                                position="top-right"
                                :offset="[18, 18]"
                                class="text-white rounded-borders"
                                style="background: rgba(0, 0, 0, .3); padding: 4px 8px;"
                              >
                                <q-toggle dense dark color="white" v-model="autoplay" label="Auto Play" />
                              </q-carousel-control>

                              <q-carousel-control
                                position="bottom-right"
                                :offset="[18, 18]"
                                class="q-gutter-xs"
                              >
                                <q-btn
                                  push round dense color="white" text-color="black" icon="arrow_left"
                                  @click="$refs.carousel.previous()"
                                />
                                <q-btn
                                  push round dense color="white" text-color="black" icon="arrow_right"
                                  @click="$refs.carousel.next()"
                                />
                              </q-carousel-control>
                            </template>
                          </q-carousel>
                        </div>
                        <div v-if="maximizedItem.enlace" class="bg-grey-2 col-xs-12 col-sm-10 full-width">
                          <div class="q-pa-md col-shrink self-center q-ma-lg">
                            <q-btn v-if="maximizedItem.enlace"
                                   type="a"
                                   target="_blank"
                                   size="md"
                                   :href="maximizedItem.enlace"
                                   color="grey-7"
                                   label="Visitar página"
                                   outline
                                   icon-right="las la-external-link-square-alt" />
                          </div>
                        </div>
                      </div>

                      <!--

                      CONTENIDO AQUI

                      -->

                    </div>
                  </div>
                </div>


              </q-dialog>


              <article v-if="showDialogHero">
                <div class="dialog-hero" style="height: 35vh; width: 100%; overflow: hidden;">
                  <q-img :src="obj.imagen" class="full-height full-width"></q-img>
                </div>

                <div class="full-height row wrap justify-start relative-position"
                     style="max-width: 65rem;">
                  <div class="col-shrink col-xs-12 col-sm-10 col-md-5 col-xl-6 self-center q-ma-lg">
                    <h4 class="q-mb-lg text-blue-7 text-weight-light text-uppercase">{{ obj.titulo }}</h4>
                    <p class="text-h6 text-blue-9">
                      {{ obj.subtitulo }}
                    </p>

                    <p class="text-h6 text-blue-grey-9 text-weight-light">
                      {{ obj.descripcion }}
                    </p>
                  </div>


                  <div class="col-shrink col-xs-12 col-sm-10 col-md-5 col-xl-5 self-center q-ma-lg">
                    <div class="q-pa-md" v-if="obj.video">
                      <q-video
                        :ratio="16/9"
                        :src="'https://www.youtube.com/embed/'+obj.video+'?rel=0'"
                      />
                    </div>
                  </div>
                </div>

              </article>


              <div v-if="obj.contenido && obj.contenido.length"
                   v-show="showContentCards"
                   class="q-pa-md row items-start q-gutter-lg row wrap justify-center items-stretch q-mx-auto"
                   style="max-width: 65rem;">

                <div v-for="(item, idx) in getCards" :key="idx" >
                  <Tarjeta @maximizar="maximizeCard(idx, item)" :item="item" :idx="idx"/>
                </div>

              </div>
              <div class="full-width">
                <div class="q-mt-xl bg-primary q-py-xl q-pa-md row items-start q-gutter-md row wrap justify-center">
                  <div class="col-shrink col-xs-12 col-sm-10 col-md-7 self-center q-px-lg q-py-sm">
                    <!--                    <p class="text-h6 text-white text-weight-light">-->
                    <!--                      Debitis explicabo ipsum officia!-->
                    <!--                    </p>-->
                    <!--                    <p class="text-body2 text-blue-4">-->
                    <!--                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias est in numquam officiis quidem,-->
                    <!--                      unde? Accusamus cum eaque expedita iusto similique unde voluptatem? Deserunt dolore iure quisquam-->
                    <!--                      sed totam?-->
                    <!--                    </p>-->
                  </div>
                  <div class="col-shrink col-xs-12 col-sm-10 col-md-7 self-center q-px-lg q-py-sm">
                    <q-btn size="sm"
                           unelevated
                           no-wrap
                           :to="anterior"
                           @click="changedialog=true"
                           class="q-pa-xs q-mr-lg q-mb-xl bg-white text-primary no-wrap">
                      <q-icon name="las la-arrow-left" size="md" class="q-pr-md"/>
                      <span class="text-body2">{{ titulo_anterior }}</span>
                    </q-btn>
                    <q-btn size="sm"
                           unelevated
                           no-wrap
                           :to="siguiente"
                           @click="changedialog=true"
                           class="q-pa-xs  q-mb-xl bg-white text-primary no-wrap">
                      <span class="text-body2">{{ titulo_siguiente }}</span>
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
import gsap from 'gsap'
import Tarjeta from "components/Tarjeta"
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'DynDialog',
  components: {
    Tarjeta
  },
  props: ['show', 'obj'],
  data() {
    return {
      expanded: false,
      cardMaximizedIdx: -1,
      maximizedItem: undefined,
      showDialogHero: true,
      showMaximizedItem: false,
      showContentCards: true,
      anterior: '/',
      siguiente: '/',
      titulo_anterior: '/',
      titulo_siguiente: '/',
      changedialog: false,

      slide: 1,
      autoplay: true,
    }
  },
  computed: {
    ...mapGetters('campus', ['paginasIndexGet']),

    getCards: {
      get() {

        console.log("contenido", this.obj.contenido)
        let cards = Object.values(this.obj.contenido)
        cards.sort((a, b) => {
          return a.orden - b.orden
        })
        console.log("cards", cards)
        return cards
      }
    },
    paginasIndex: {
      get() {
        return this.paginasIndexGet
      },
      set(value) {
        this.paginasIndexSet(value)
      }
    },
    showDialog: {
      get() {
        return this.show
      },
      set(value) {
        if (!value) {
          if (this.changedialog) {
            this.$emit('changedialog')
          } else {
            this.$emit('hide')
          }
        }
        return value
      }
    }
  },
  methods: {
    ...mapActions('campus', ['paginasIndexSet']),
    maximizeCard(idx, item) {
      console.log("print maximize", idx, item)
      this.cardMaximizedIdx = idx
      this.maximizedItem = item
      this.showMaximizedItem = true
    },

    closeCard() {
      this.showMaximizedItem = false
      this.maximizedItem = undefined
    }
  },
  created() {
    const arrPaginas = Object.values(this.paginasIndex)

    let siguiente = arrPaginas.indexOf(this.obj) + 1
    siguiente + 1 > arrPaginas.length - 1 ? siguiente = 0 : siguiente = arrPaginas.indexOf(this.obj) + 1
    this.siguiente = '/p/' + arrPaginas[siguiente].slug
    this.titulo_siguiente = arrPaginas[siguiente].titulo

    let anterior = arrPaginas.indexOf(this.obj) - 1
    anterior < 0 ? anterior = arrPaginas.length - 1 : anterior = arrPaginas.indexOf(this.obj) - 1
    this.anterior = '/p/' + arrPaginas[anterior].slug
    this.titulo_anterior = arrPaginas[anterior].titulo
  },
  updated() {
    console.log("updated")
    const arrPaginas = Object.values(this.paginasIndex)

    let siguiente = arrPaginas.indexOf(this.obj) + 1
    siguiente + 1 > arrPaginas.length - 1 ? siguiente = 0 : siguiente = arrPaginas.indexOf(this.obj) + 1
    this.siguiente = '/p/' + arrPaginas[siguiente].slug
    this.titulo_siguiente = arrPaginas[siguiente].titulo

    let anterior = arrPaginas.indexOf(this.obj) - 1
    anterior < 0 ? anterior = arrPaginas.length - 1 : anterior = arrPaginas.indexOf(this.obj) - 1
    this.anterior = '/p/' + arrPaginas[anterior].slug
    this.titulo_anterior = arrPaginas[anterior].titulo
  }
}
</script>

<style lang="css" scoped>
.main-images {
  border: 1px solid rgb(232, 232, 232);
  border-radius: 5px;
  box-shadow: #cecece 0 0 20px;
}

.micro-hero {
  position: relative;
  padding-top: 2rem;
}

.micro-hero:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  height: 2rem;
  width: 100%;
  background: #28527f;
}

.dot-grid {
  /*background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAAAXNSR0IArs4c6QAAANNJREFUOBG9UkEOwjAMG3BB8P+/ckLUXW2ZzJs6CVFpSuLaTlJtWabPBcwr6Ug6AgDJc0Tkt/b1IwYBj/2SPpAAeIzoxLWRWvtVBTcNN4D7u/qQqIW8d8q5Bld5DxLqikl/2Fqs4eA1col9mUr6qkGECrPyuVEnrMHrSe7Cpp9HCtruxVPENHjC1Cy5C5teRnaW8B0NimnkaQSTRKLdM428CqLBfSheLfLvpAnjLK/zaxOa1Bh5aeUqPFX/xTCuEsaMvArOPvYsr89Rm4Th9nk/f8MPzzwK0MfabhcAAAAASUVORK5CYII=);*/
  background-size: 20px 20px;
}

main {
  /*scroll-snap-type: y mandatory;*/
  position: relative;
  max-height: 100vh;
  overflow-y: auto;
  z-index: 0;
  transition: all ease-in-out;
}

article {
  /*height: 100vh;*/

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  scroll-snap-align: start;
  scroll-padding-top: 5vh;
}

article:nth-of-type(1) {
  /*height: 100vh;*/


  background-color: rgba(245, 245, 245, 1);
  /*mix-blend-mode: darken;*/
}

article:nth-of-type(2) {
  background-color: rgba(220, 220, 220, 1);
}

article:nth-of-type(3) {
  /*background-color: rgba(144, 195, 255, 0.5);*/
}

article:nth-of-type(4) {
  /*background-color: rgba(255, 173, 25, 1);*/
}

h2,
h3, a {
  font: 400 3rem/1.5 sans-serif;
  color: white;
  transform-origin: center;
  text-decoration: none;
}

h3 {
  font: 400 2em/1.5 sans-serif;
}


</style>
