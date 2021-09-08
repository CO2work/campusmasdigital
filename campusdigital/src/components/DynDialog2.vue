<template>
  <div>


    <q-dialog
      v-model="showDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="jump-down"
      class="full-height"
    >
      <div class="column full-height full-width dot-grid">

        <!--
        <q-card class="text-grey-10 full-height transparent scroll" flat square>
          <q-card-section class="no-padding">


            <div class="row justify-center">


              <div class="q-px-md full-height full-width">






                <div class="row q-pa-xl">
                  <div class="col">
                    <div class="text-center">
                      <h1 class="text-h3"></h1>
                    </div>
                    <div v-if="obj.contenido.length" class="column">
                      <div class="column" v-for="(item, idx) in obj.contenido" :key="idx">
                        <q-card flat bordered class="bg-grey-2">
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
                  </div>
                </div>






              </div>
            </div>
          </q-card-section>
        </q-card>
        -->

        <q-page-sticky position="top-left" class="z-top" :offset="[16, 16]">
          <q-btn fab-mini color="primary" icon="las la-angle-left" @click="showDialog=false"/>
        </q-page-sticky>

        <div class="row">
          <div class="col">

            <main>
              <article>

                <div class="full-height row wrap justify-start items-center content-center q-mx-auto" style="max-width: 65rem; position: relative">
                  <div class="col-shrink col-xs-6 col-sm-6 col-md-5 col-xl-3 self-center q-ma-lg">
                    <h4 class="q-mb-lg text-white text-weight-normal">{{ obj.titulo }}</h4>
                    <p class="text-body2">
                      {{ obj.subtitulo }}
                    </p>

                    <p>
                      {{ obj.descripcion }}
                    </p>
                  </div>

                  <div class="col-shrink col-xs-6 col-sm-6 col-md-5 col-xl-3 self-center q-ma-lg">
                    <q-img :src="obj.imagen"></q-img>
                  </div>

                  <div class="col-shrink col-xs-6 col-sm-6 col-md-5 col-xl-3 self-center q-ma-lg">
                    <q-btn size="sm"
                       :to="obj.enlace"
                       unelevated
                       class="
                        q-mx-md
                        q-pa-xs
                        text-white
                        bg-blue-7
                      ">
                      <span class="text-body2">Ver proyectos</span>
                      <q-icon name="las la-plus" size="md" class="q-pl-md"/>
                    </q-btn>
                  </div>
                </div>

              </article>
              <div v-if="obj.contenido.length">
                <article v-for="(item, idx) in obj.contenido" :key="idx">
                  <div class="text-h5 q-mt-sm q-mb-xs">{{ item.titulo }}</div>
                  <div class="text-caption text-grey">
                    {{ item.descripcion }}
                  </div>
                </article>
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

gsap.set("main article *", {autoAlpha: 0, y: "1rem"});

const animateVisible = (block, ratio, isIntersecting) => {
  if (ratio > 0 && isIntersecting) {
    gsap.to(block.querySelectorAll("*"), {
      duration: 1,
      autoAlpha: 1,
      y: "0",
      stagger: 0.3,
      ease: "power3.inOut"
    });
  } else {
    gsap.set(block.querySelectorAll("*"), {
      autoAlpha: 0,
      y: "1rem"
    });
  }
};

const blocks = document.querySelectorAll("main article");

const blocksObserver = new IntersectionObserver(
  (entries) => {
    return entries.forEach((event) => {
      const {target, intersectionRatio, isIntersecting} = event;
      animateVisible(target, intersectionRatio, isIntersecting);
    });
  },
  {threshold: 0.5}
);

for (const block of blocks) {
  blocksObserver.observe(block);
  console.log("block", block)
}

export default {
  name: 'DynDialog',
  props: ['show', 'obj'],
  data() {
    return {}
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
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAAAXNSR0IArs4c6QAAANNJREFUOBG9UkEOwjAMG3BB8P+/ckLUXW2ZzJs6CVFpSuLaTlJtWabPBcwr6Ug6AgDJc0Tkt/b1IwYBj/2SPpAAeIzoxLWRWvtVBTcNN4D7u/qQqIW8d8q5Bld5DxLqikl/2Fqs4eA1col9mUr6qkGECrPyuVEnrMHrSe7Cpp9HCtruxVPENHjC1Cy5C5teRnaW8B0NimnkaQSTRKLdM428CqLBfSheLfLvpAnjLK/zaxOa1Bh5aeUqPFX/xTCuEsaMvArOPvYsr89Rm4Th9nk/f8MPzzwK0MfabhcAAAAASUVORK5CYII=);
  background-size: 20px 20px;
}

main {
  scroll-snap-type: y mandatory;
  position: relative;
  max-height: 100vh;
  overflow-y: auto;
  z-index: 0;
}

article {
  height: 100vh;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  scroll-snap-align: start;
}

article:nth-of-type(1) {
  background-color: rgba(0, 82, 178, 0.5);
}

article:nth-of-type(2) {
  background-color: rgba(255, 164, 0, 0.5);
}

article:nth-of-type(3) {
  background-color: rgba(144, 195, 255, 0.5);
}

article:nth-of-type(4) {
  background-color: rgba(255, 173, 25, 1);
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
