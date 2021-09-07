<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4">
        col
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        col
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        col
      </div>
    </div>
  <!--  Backgournd-->
  <div class="fixed-full"
     style="
         background: #cacaca url('img/tmp_fondo_cu_v1.png') center center;
         height: calc(100vh);
         background-size: cover;
         background-blend-mode: luminosity;
         z-index: -1;
         ">
  </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'PruebaImgBg',
  components: {},
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('campus', ['paginasIndexGet']),
    paginasIndex: {
      get() {
        return this.paginasIndexGet
      },
      set(value) {
        this.paginasIndexSet(value)
      }
    },
  },
  methods: {
    ...mapActions('campus', ['paginasIndexSet']),
    getPaginasPath(path) {
      let filtradas = {contenido: []}
      Object.values(this.paginasIndex).forEach(item => {
        if (item.slug === path) {
          filtradas = item
        }
      })
      return filtradas
    },
  },
  watch: {
    '$route.path': function () {
      let path = this.$route.path.replace('/p/', '')
      path = path.replace('/', '')
      this.paginasPath = this.getPaginasPath(path)
    },
  },
  created() {
  },
  mounted() {
  }
}
</script>
