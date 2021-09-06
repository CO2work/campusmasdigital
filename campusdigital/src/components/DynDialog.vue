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

        <q-page-sticky position="top-left" :offset="[16, 16]" style="z-index: 999">
          <q-btn fab-mini color="black" outline icon="mdi-chevron-left" @click="showDialog=false"/>
        </q-page-sticky>

        <div class="row">
          <div class="col">

            <main>
              <article>
                <h3>{{ obj.titulo }}</h3>
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
