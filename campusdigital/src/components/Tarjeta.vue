<template>
    <q-card class="my-card self-stretch full-height q-pb-xl" flat bordered>

      <q-btn class="absolute-top-right z-top q-ma-sm text-grey-5"
             size="sm"
             round
             dense
             fab-mini color="white" icon="las la-plus" @click.stop="$emit('maximizar')" />
      <q-img
        v-if="item.imagen"
        @click.stop="$emit('maximizar')"
        style="cursor: zoom-in"
        :src="item.imagen"
      />
      <q-img
        v-else
        @click.stop="$emit('maximizar')"
        style="cursor: zoom-in"
        src="https://firebasestorage.googleapis.com/v0/b/campus-b4087.appspot.com/o/Temp%2Ftmp_fondo_cu_v1.png?alt=media&token=f6b1257b-bdb8-421e-b568-5d93a561aa99"
      />
      <q-card-section>
        <div @click.stop="maximizeCard(idx, item)" style="cursor: zoom-in"
             class="text-h5 q-mt-sm q-mb-xs">{{ item.titulo }}
        </div>
        <div class="text-uppercase text-small text-orange-9">{{ item.subtitulo }}</div>
        <div class="text-caption text-grey q-my-md">
          {{ item.descripcion }}
        </div>
      </q-card-section>
      <q-card-actions class="absolute-bottom bg-grey-2 q-pa-md">
        <q-btn @click.stop="$emit('maximizar')" size="md" color="light" label="Ver más"
               class="text-white text-weight-light bg-primary"/>
        <q-btn v-if="item.enlace" type="a" target="_blank" size="md" :href="item.enlace" color="grey-7" label="Visitar página"
               outline
               icon-right="las la-external-link-square-alt"
               class=""/>

        <q-space/>

        <q-btn
          v-if="item.descripcion_extra"
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
          <q-separator/>
          <q-card-section class="text-subitle2">
            {{ item.descripcion_extra }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
</template>

<script>
export default {
  name: "Tarjeta",
  props: [
    "item",
    "idx",
    "show",
  ],
  data(){
    return {
      expanded: false
    }
  },
  methods: {

  }
}


</script>

<style lang="css" scoped>

.my-card {
  width: 100%;
  max-width: 350px;
}

</style>
