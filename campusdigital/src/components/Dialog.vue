<template>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-grey-1 text-gray-10">

      <q-card-section>

        <q-btn flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
        </q-btn>
        <section>
          <div class="row justify-center">
            <div class="col-xs-12 col-sm-10 col-md-5 col-lg-4">
              <div class="text-h4 text-weight-bold text-gray-14 q-py-xl">Revistas digitales y publicaciones</div>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
              </p>

              <q-btn class="bg-primary text-white q-my-lg">Ver publicaciones</q-btn>
            </div>
            <div class="col-xs-12 col-sm-10 col-md-5 col-lg-3 offset-lg-1 q-py-xl">
              <img class="q-img main-images" src="~assets/dialog_img/global_temp_01.jpg" alt="globe">
            </div>
          </div>
          <div class="row justify-center dot-grid q-my-xl">
            <div class="col-xs-12 col-sm-10 col-md-4 col-lg-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis culpa cum cupiditate dolorem enim eveniet facere ipsum, libero minus obcaecati praesentium reiciendis rerum sapiente tempore. Consequatur in incidunt vero!
              </p>
            </div>
          </div>
        </section>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  name: 'Dialog',
  data () {
    return {
      dialog: false,
      maximizedToggle: true
    }
  }
}
</script>

<style scoped>
  .main-images {
    border: 1px solid rgb(232, 232, 232);
    border-radius: 5px;
    box-shadow: #cecece 0 0 20px;
  }
</style>
