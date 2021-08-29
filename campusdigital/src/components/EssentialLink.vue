<template>
  <div>
    <q-item v-if="link===''"
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
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>
          {{ caption }} ff
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-else
            clickable
            v-ripple
            tag="a"
            :to="link"
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
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>
          {{ caption }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <dyn-dialog v-if="showDialog" :show="showDialog" :obj="obj" @hide="showDialog=false"></dyn-dialog>
    <q-separator></q-separator>
  </div>
</template>

<script>
import DynDialog from 'components/DynDialog'

export default {
  name: 'EssentialLink',
  props: {
    obj: {type: Object, required: false},
    title: {type: String, required: false},
    caption: {type: String, default: ''},
    link: {type: String, default: '#'},
    icon: {type: String, default: ''}
  },
  components: {DynDialog},
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    onClick(evt) {
      console.log(evt)
    }
  }
}

</script>
