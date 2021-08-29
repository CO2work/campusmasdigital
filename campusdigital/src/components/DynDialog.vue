<template>
  <q-dialog
    v-model="showDialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-grey-1 text-gray-10">

      <q-card-section>

        <q-btn flat round small icon="mdi-close" @click="showDialog=false">
        </q-btn>

        <section>
          <div class="row justify-center">
            <div class="col-xs-12 col-sm-10 col-md-5 col-lg-4">
              <div v-if="obj.tipo" class="text-h4 text-weight-bold text-gray-14 q-py-xl">
                {{ obj.title }}
              </div>
              <div v-else class="text-h4 text-weight-bold text-gray-14 q-py-xl">
              Título de Sección
              </div>

              <div v-if="obj.tipo==='plataformas'" >
                SUVIN: El Sistema Universitario Virtual Nicolaita (SUVIN) es la plataforma institucional tecnológica-educativa de la Universidad Michoacana de San Nicolás de Hidalgo, creada y desarrollada en esta casa de estudios. Es una herramienta novedosa, intuitiva y útil para la gestión de la educación en línea  que la Universidad ofrece a su comunidad educativa.
                A través de distintos programas, cursos y actividades interactivas, docentes y estudiantes navegan y comparten contenidos para el aprendizaje de forma sencilla y clara. Integra, además, elementos visuales y una interfaz amigable con los usuarios.
                ¡Es una herramienta ideal para aprender y compartir conocimiento!
                <br>

                <strong>Google Workspace for Education</strong>
                <br>

                Google trabajó con educadores de todo el país para crear Classroom: una herramienta ágil y fácil de usar que ayuda a los profesores a administrar el trabajo del curso. Con Classroom, los educadores pueden crear clases, repartir deberes, calificar, enviar comentarios y tener acceso a todo desde un solo lugar.
                Usando Classroom los cursos pueden ser accedidos por cualquier miembro de @umsnh que ingrese el código de la clase. Comunicación efectiva con los participantes, asignación y calificación de trabajos, tareas y exposiciones, incorpora salas de chat y todas las funcionalidades del trabajo colaborativo en tiempo real. Planea los períodos de asignación y entrega de trabajos, comparte el trabajo de profesor invitando a otros profesores a que participen del curso virtual.

              </div>

              <div v-if="obj.tipo==='servicios'" >
                Todos los sistemas que automatizan e integran la información y procesos de las diferentes áreas de la Universidad en un solo lugar, simplificando aún más el trabajo administrativo.
                <br>
                Servicios administrativos digitales:
                <br>

                <ul>
                  <li>SIIA - Sistema Integral de Información Administrativa</li>
                  <li>Titulación en línea</li>
                  <li>Calendario Escolar en Línea</li>
                  <li>Trámites de Tesorería en línea</li>

                </ul>
                <br>
                Transparencia Digital

              </div>

              <p v-if="obj.tipo==='publicaciones'" >
                SUVIN: El Sistema Universitario Virtual Nicolaita (SUVIN) es la plataforma institucional tecnológica-educativa de la Universidad Michoacana de San Nicolás de Hidalgo, creada y desarrollada en esta casa de estudios. Es una herramienta novedosa, intuitiva y útil para la gestión de la educación en línea  que la Universidad ofrece a su comunidad educativa.
                A través de distintos programas, cursos y actividades interactivas, docentes y estudiantes navegan y comparten contenidos para el aprendizaje de forma sencilla y clara. Integra, además, elementos visuales y una interfaz amigable con los usuarios.
                ¡Es una herramienta ideal para aprender y compartir conocimiento!
              </p>

              <div v-if="obj.tipo==='cultura'" >
                Como todo nuevo paradigma cultural, el proceso digital necesita de la apropiación de su elemento de una comunidad, por ello a través de diversos elementos educativos buscaremos socializar y culturizar la agenda digital con la finalidad de establecer una Agenda Digital Universitaria.
                <br>
                Conoce algunos de los proyectos:
                <br>

                Plataformas culturales digitales: Desarrollar programas que alienten la apropiación del entorno digital en las actividades culturales de la universidad
                <br>

                Centros Digitales: Instaurar centros digitales que propicien un mayor desarrollo de competencias digitales, AI, Big Data y Cloud, etc.
                <br>
                Programa "Hablemos de Mundos": Diálogos sobre el pensamiento y la cultura digital de la mano de expertos.
                <br>
                Programa cultural: "Intramuros":  El cual tiene como objetivo impulsar la producción de la comunidad artística local que a consecuencia de la pandemia provocada por el coronavirus se interrumpió.
                <br>
                Eventos en línea y foros digitales: Como "LADAS: Latino américa", Hackaton Cultural Región Centro Occidente, entre otros.
              </div>

              <div v-if="obj.tipo==='adini'" >
                La Agenda Digital Nicolaita busca articular políticas públicas universitarias transversales, orientadas a potenciar las actividades sustantivas de la universidad a fin de propiciar una Comunidad Nicolaita Conectada, a través del uso de herramientas y habilidades digitales.
                <br>
                <br>

                <strong>Consta de 5 ejes estratégicos:</strong>
                <br>

                <ul>
                   <li>Eje estratégico 1: Transformación Digital de la UMSNH </li>
                   <li>Eje estratégico 2: Inclusión digital </li>
                   <li>Eje estratégico 3: Impulso a la Educación Digital</li>
                   <li>Eje estratégico 4: Innovación y generación de conocimientos Digitales</li>
                   <li>Eje estratégico 5: Cultura digital</li>
                </ul>
              </div>

              <div v-if="obj.tipo==='adini'" class="q-pa-md">
                <q-video
                  :ratio="16/9"
                  src="https://www.youtube.com/watch?v=r4MALXVScq4"
                />
              </div>


              <hr>

              <div v-if="obj.tipo==='plataformas'" class="text-gray-14 q-py-xl">
                <h5>Educación continua / Cursos / Diplomados</h5>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, deserunt nobis provident quam quis sapiente temporibus! Asperiores deleniti dolor dolorum eaque ex, ipsum laboriosam, maxime nemo, numquam quibusdam quisquam repellat.
                </p>
              </div>

              <div v-if="obj.tipo==='repositorios'" class="text-gray-14 q-py-xl">
                <h5>Educación continua / Cursos / Diplomados</h5>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, deserunt nobis provident quam quis sapiente temporibus! Asperiores deleniti dolor dolorum eaque ex, ipsum laboriosam, maxime nemo, numquam quibusdam quisquam repellat.
                </p>
              </div>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
              </p>

            </div>

            <div v-if="obj.tipo==='plataformas'" class="col-xs-12 col-sm-10 col-md-5 col-lg-3 offset-lg-1 q-py-xl">
              <img class="q-img main-images" src="~assets/dialog_img/logo_suvin_01.png" alt="SUVIN">
            </div>

            <div v-if="obj.tipo==='publicaciones'" class="col-xs-12 col-sm-10 col-md-5 col-lg-3 offset-lg-1 q-py-xl">
              <img class="q-img main-images" src="~assets/dialog_img/mag_01.png" alt="SUVIN">
            </div>

            <div v-if="obj.tipo==='adini'" class="col-xs-12 col-sm-10 col-md-5 col-lg-3 offset-lg-1 q-py-xl">
              <img class="q-img main-images" src="~assets/dialog_img/ad_01.png" alt="AD">
            </div>

          </div>
          <div class="row justify-center dot-grid q-my-xl">
            <div class="col-xs-12 col-sm-10 col-md-4 col-lg-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis culpa cum cupiditate dolorem enim eveniet facere ipsum, libero minus obcaecati praesentium reiciendis rerum sapiente tempore. Consequatur in incidunt vero!
              </p>
            </div>

            <!-- TODO: implement Slides -->
            <div class="col-10">
              <div v-if="obj.slides">
                <div v-for="slide of obj.slides" :key="slide">
                  <p>{{ slide }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Dialog',
  props: ['show', 'obj'],
  setup () {
    return {
      maximizedToggle: ref(true)
    }
  },
  computed: {
    showDialog: {
      get () {
        return this.show
      },
      set (value) {
        if (!value) {
          this.$emit('hide')
        }
        return value
      }
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

.dot-grid {
  padding: 90px 0;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAAAXNSR0IArs4c6QAAANNJREFUOBG9UkEOwjAMG3BB8P+/ckLUXW2ZzJs6CVFpSuLaTlJtWabPBcwr6Ug6AgDJc0Tkt/b1IwYBj/2SPpAAeIzoxLWRWvtVBTcNN4D7u/qQqIW8d8q5Bld5DxLqikl/2Fqs4eA1col9mUr6qkGECrPyuVEnrMHrSe7Cpp9HCtruxVPENHjC1Cy5C5teRnaW8B0NimnkaQSTRKLdM428CqLBfSheLfLvpAnjLK/zaxOa1Bh5aeUqPFX/xTCuEsaMvArOPvYsr89Rm4Th9nk/f8MPzzwK0MfabhcAAAAASUVORK5CYII=);
  background-size: 20px 20px;
}
</style>
