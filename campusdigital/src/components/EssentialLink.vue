<template>
  <div>
    <q-item v-if="!link.enlace"
            clickable
            v-ripple
            tag="a"
            @click="showDialog=true"
            exact
    >
      <q-item-section
        v-if="icon"
        avatar
        class="text-blue-6"
      >
        <q-icon :name="icon" size="xl"/>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ link.titulo }}</q-item-label>
        <q-item-label caption>
          caption ff
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-else
            clickable
            v-ripple
            tag="a"
            :to="link.enlace"
            exact
    >
      <q-item-section
        v-if="icon"
        avatar
        class="text-blue-6"
      >
        <q-icon :name="icon" size="xl"/>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ link.titulo }}</q-item-label>
        <q-item-label caption>
          caption
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator></q-separator>
  </div>
</template>

<script>

export default {
  name: 'EssentialLink',
  props: ['link'],
  components: {},
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    onClick(evt) {
      console.log(evt)
    }
  },
  mounted() {
    console.log()
  }
}

</script>
