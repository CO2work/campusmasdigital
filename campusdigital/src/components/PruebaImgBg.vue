<template>
  <div style="height: 100vh;">
    <div class="full-height row wrap justify-center items-center content-center q-mx-auto" style="max-width: 65rem">
      <div class="col-shrink col-xs-6 col-sm-6 col-md-5 col-xl-3 self-center q-ma-lg">
        <h4 class="q-mb-lg text-primary text-weight-light">Binvenidos al espectaculo más grandes el mundo</h4>
        <p class="text-body2">
          Quam tempora voluptatibus. Amet aperiam beatae debitis deleniti distinctio doloremque quaerat quibusdam rerum tenetur!
        </p>
      </div>
      <div class="col-shrink col-xs-6 col-sm-6 col-md-5 col-xl-3 self-center q-ma-lg">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse inventore laboriosam quidem, ratione rem voluptatem! Animi at culpa dicta eligendi, fugit modi molestias nesciunt nihil odit sint soluta temporibus ut.
      </div>
      <div class="col-shrink col-xs-6 col-sm-6 col-md-5 col-xl-3 self-center q-ma-lg">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium aliquam architecto beatae blanditiis delectus deserunt dolores eaque eveniet fugiat ipsa itaque necessitatibus nemo praesentium reprehenderit rerum, sit voluptate voluptatibus.
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
