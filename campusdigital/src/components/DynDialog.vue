<template>
  <q-dialog
    v-model="showDialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="jump-down"

  >
    <div class="column full-height dot-grid">
      <q-card class="text-grey-10 transparent">
        <q-card-section class="scroll">

          <q-page-sticky position="top-left" :offset="[18, 18]">
            <q-btn fab-mini round color="black" icon="mdi-close" @click="showDialog=false"/>
          </q-page-sticky>
          <div class="row justify-center q-my-xl">
            <div class="column">
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
              <p> kkkk </p>
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
    return {
      maximizedToggle: true
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
