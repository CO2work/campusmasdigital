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
              <q-card
                v-if="cardMaximizedIdx > -1" class="full-height full-width" flat bordered
              >

              </q-card>

              <q-dialog
                v-model="showMaximizedItem"
                :maximized="true"
                transition-show="slide-up"
                transition-hide="jump-down"
                class="full-height"
              >
                <div v-if="maximizedItem" class="column full-height full-width dot-grid bg-white">

                  <q-page-sticky position="top-left" :offset="[16, 22]">
                    <q-btn fab-mini color="primary" icon="mdi-close" @click="showDialog=false"/>
                  </q-page-sticky>

                  <div class="row">
                    <div class="col">

                      <!--

                      CONTENIDO AQUI

                      -->


                      <q-page-sticky position="top-left" class="z-top" :offset="[16, 70]">
                        <q-btn fab-mini color="primary" icon="mdi-close" @click="closeCard()"/>
                      </q-page-sticky>
                       <q-img
                        :src="maximizedItem.imagen"
                      />
                      <div class="row">
                        <div class="text-h5 q-mt-sm q-mb-xs">{{ maximizedItem.titulo }}</div>
                        <div class="text-uppercase text-small text-orange-9">{{ maximizedItem.subtitulo }}</div>
                        <div class="text-caption text-grey q-my-md">
                          {{ maximizedItem.descripcion }}
                        </div>
                      </div>
                      <div v-if="maximizedItem.enlace" class="row">
                        <q-btn size="md" :to="maximizedItem.enlace" color="light" label="Enlace"
                               class="text-white bg-primary"/>

                        <q-space/>

                        <q-btn
                          color="grey"
                          round
                          flat
                          dense
                        />
                      </div>
                      <q-slide-transition>
                        <div v-show="expanded">
                          <q-separator/>
                          <q-card-section class="text-subitle2">
                            {{ maximizedItem.descripcion_extra }}
                          </q-card-section>
                        </div>
                      </q-slide-transition>


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

                <div class="full-height row wrap justify-start items-center content-center q-mx-auto relative-position"
                     style="max-width: 65rem;">
                  <div class="col-shrink col-xs-12 col-sm-10 col-md-5 col-xl-3 self-center q-ma-lg">
                    <h4 class="q-mb-lg text-blue-7 text-weight-light text-uppercase">{{ obj.titulo }}</h4>
                    <p class="text-h6 text-blue-9">
                      {{ obj.subtitulo }}
                    </p>

                    <p class="text-h6 text-blue-grey-9 text-weight-light">
                      {{ obj.descripcion }}
                    </p>
                  </div>


                  <div class="col-shrink col-xs-12 col-sm-10 col-md-5 col-xl-3 self-center q-ma-lg">
                    <div class="q-pa-md" v-if="obj.video">
                      <q-video
                        :ratio="16/9"
                        :src="'https://www.youtube.com/embed/'+obj.video+'?rel=0'"
                      />
                    </div>
                  </div>
                </div>

              </article>


              <div v-if="obj.contenido.length"
                   v-show="showContentCards"
                   class="q-pa-md row items-start q-gutter-md row wrap justify-evenly q-mx-auto"
                   style="max-width: 65rem;">
                <div v-for="(item, idx) in obj.contenido" :key="idx">
                  <q-card class="my-card self-stretch" flat bordered
                          v-if="cardMaximizedIdx === idx"
                          v-morph:card1:mygroup:300="morphGroupModel"
                          @click="maximizeCard(idx, item)">
                    <q-img
                      :src="item.imagen"
                    />
                    <q-card-section>
                      <div class="text-h5 q-mt-sm q-mb-xs">{{ item.titulo }}</div>
                      <div class="text-uppercase text-small text-orange-9">{{ item.subtitulo }}</div>
                      <div class="text-caption text-grey q-my-md">
                        {{ item.descripcion }}
                      </div>
                    </q-card-section>
                    <q-card-actions v-if="item.enlace">
                      <q-btn size="md" :to="item.enlace" color="light" label="Enlace" class="text-white bg-primary"/>

                      <q-space/>

                      <q-btn
                        color="grey"
                        round
                        flat
                        dense
                      />
                    </q-card-actions>
                    <q-slide-transition>
                      <div v-show="expanded">
                        <q-separator/>
                        <q-card-section class="text-subitle2">
                          {{ item.descripcion_extra }}
                        </q-card-section>
                      </div>
                    </q-slide-transition>
                  </q-card>
                  <q-card class="my-card self-stretch" flat bordered
                          v-else
                          @click.stop="maximizeCard(idx, item)">
                    <q-img
                      :src="item.imagen"
                    />
                    <q-card-section>
                      <div class="text-h5 q-mt-sm q-mb-xs">{{ item.titulo }}</div>
                      <div class="text-uppercase text-small text-orange-9">{{ item.subtitulo }}</div>
                      <div class="text-caption text-grey q-my-md">
                        {{ item.descripcion }}
                      </div>
                    </q-card-section>
                    <q-card-actions v-if="item.enlace">
                      <q-btn size="md" :to="item.enlace" color="light" label="Enlace" class="text-white bg-primary"/>

                      <q-space/>

                      <q-btn
                        color="grey"
                        round
                        flat
                        dense
                      />
                    </q-card-actions>
                    <q-slide-transition>
                      <div v-show="expanded">
                        <q-separator/>
                        <q-card-section class="text-subitle2">
                          {{ item.descripcion_extra }}
                        </q-card-section>
                      </div>
                    </q-slide-transition>
                  </q-card>

                </div>
              </div>
              <div class="full-width">
                <div class="q-mt-xl bg-primary q-py-xl q-pa-md row items-start q-gutter-md row wrap justify-center">
                  <div class="col-shrink col-xs-12 col-sm-10 col-md-7 self-center q-px-lg q-py-sm">
                    <p class="text-h6 text-white text-weight-light">
                      Debitis explicabo ipsum officia!
                    </p>
                    <p class="text-body2 text-blue-4">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias est in numquam officiis quidem,
                      unde? Accusamus cum eaque expedita iusto similique unde voluptatem? Deserunt dolore iure quisquam
                      sed totam?
                    </p>
                  </div>
                  <div class="col-shrink col-xs-12 col-sm-10 col-md-7 self-center q-px-lg q-py-sm">
                    <q-btn size="sm"
                           unelevated
                           no-wrap
                           class="q-pa-xs q-mr-lg q-mb-xl bg-white text-primary no-wrap">
                      <q-icon name="las la-arrow-left" size="md" class="q-pl-md"/>
                      <span class="text-body2">Proyecto anterior </span>
                    </q-btn>
                    <q-btn size="sm"
                           unelevated
                           no-wrap
                           class="q-pa-xs  q-mb-xl bg-white text-primary no-wrap">
                      <span class="text-body2">Proyecto siguiente</span>
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


const nextMorphStep = {
  card1: 'card2',
  card2: 'card1'
}

export default {
  name: 'DynDialog',
  props: ['show', 'obj'],
  data() {
    return {
      expanded: false,
      cardMaximizedIdx: -1,
      maximizedItem: undefined,
      morphGroupModel: 'card1',
      showDialogHero: true,
      showMaximizedItem: false,
      showContentCards: true,
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.show
      },
      set(value) {
        if (!value) {
          this.$emit('hide')
        }
        return value
      }
    }
  },
  methods: {
    maximizeCard(idx, item) {
      console.log("print maximize", idx, item)
      this.cardMaximizedIdx = idx
      this.maximizedItem = item
      this.showMaximizedItem = true


      setTimeout(() => {
        //this.cardMaximizedIdx = idx
        //this.maximizedItem = item
      }, 100)
      setTimeout(() => {
        //this.morphGroupModel = nextMorphStep[this.morphGroupModel]
      }, 300)
      setTimeout(() => {
        //this.showDialogHero = false
        //this.showContentCards = false
      }, 600)
    },

    closeCard() {
      this.showMaximizedItem = false
      this.maximizedItem = undefined
    }
  }
}
</script>

<style lang="css" scoped>
.main-images {
  border: 1px solid rgb(232, 232, 232);
  border-radius: 5px;
  box-shadow: #cecece 0 0 20px;
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

.my-card {
  width: 100%;
  max-width: 350px;
}

</style>
