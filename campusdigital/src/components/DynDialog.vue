<template>
  <q-dialog
    v-model="showDialog"
    :maximized="true"
    transition-show="slide-up"
    transition-hide="jump-down"
    class="full-height"
  >
    <div class="column full-height full-width dot-grid">
      <q-card class="text-grey-10 full-height transparent scroll" flat square>
        <q-card-section class="no-padding">

          <q-page-sticky position="top-left" :offset="[18, 18]">
            <q-btn fab-mini color="black" outline icon="mdi-chevron-left" @click="showDialog=false"
                   style="z-index: 999"/>
          </q-page-sticky>
          <div class="row justify-center">


            <div class="column q-pa-md full-height full-width">
              <div class="row q-px-xl">


                <div class="column">
                  <div class="text-center">
                    <h1 class="text-h3">{{ obj.titulo }}</h1>
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


                  <p>jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj
                    jjjjj
                    jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj
                    jjjjj
                    jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj
                    jjjjj
                    jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj
                    jjjjj
                    jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj </p>
                  <p>jjjjj</p>
                  <p>jjjjj</p>
                  <p>jjjjj</p>
                  <p>jjjjj</p>
                  <p>jjjjj</p>
                  <p>jjjjj</p>
                  <p>jjjjj</p>
                  <p>jjjjj</p>


                </div>


              </div>
            </div>


          </div>

        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script>

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
</style>
