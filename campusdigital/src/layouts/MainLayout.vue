<template>
  <q-layout view="lHr LpR ffr">
    <q-header class="col-auto bg-transparent" style="left: unset;">
      <q-toolbar class="col-auto bg-blue-5">
        <!-- <q-toolbar-title>Campus Digital UMSNH</q-toolbar-title> -->
        <q-btn
          flat
          dense
          round
          icon="las la-bars"
          aria-label="Menu"
          @click="rightDrawerOpen = !rightDrawerOpen"
        />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      show-if-above

      :mini="miniState"

      :width="400"
      :breakpoint="600"

      side="right"
      behavior="desktop"
      bordered
      class="bg-grey-1 row"
    >
      <q-scroll-area class="fit">
        <q-list v-if="1===1">
          <EssentialLink

            v-for="link of paginasIndex"
            :key="link.titulo"
            :link="link"
            v-bind="link"
          />
        </q-list>

      </q-scroll-area>

      <div class="absolute" style="bottom: 15px; left: -17px">
        <q-btn
          dense
          round
          unelevated
          color="primary"
          :icon="miniState ? 'las la-angle-left' : 'las la-angle-right'"
          @click="miniState = !miniState"
        ></q-btn>
      </div>
    </q-drawer>

    <vue-splash
      style="z-index: 9999"
      :show="showSplash"
      :logo="'https://upload.wikimedia.org/wikipedia/commons/1/14/Logo_de_la_UMSNH.svg'"
      title="Campus Digital UMSNH"
      color="#00bfa5"
      :size="300"
      :fixed="true"
    />

    <q-page-container style="padding-top: 0;">
      <router-view/>
    </q-page-container>

    <!--    <q-footer reveal class="bg-transparent text-white">-->
    <!--      <q-toolbar>-->
    <!--        <q-avatar>-->
    <!--          <img src="~assets/umsnh_escudo_svg_v1.svg" alt="Escudo UMSNH">-->
    <!--        </q-avatar>-->
    <!--        <p  class="text-overline text-white q-px-sm">-->
    <!--          <span>-->
    <!--            Universidad Michoacana de San nicolas de Hidalgo-->
    <!--          </span>-->
    <!--        </p>-->
    <!--      </q-toolbar>-->
    <!--    </q-footer>-->


  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import VueSplash from 'vue-splash'
import firebaseDB from "boot/firebase"
import firebase from "firebase";
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'MainLayout',
  components: {EssentialLink, VueSplash},
  data() {
    return {
      showSplash: true,
      rightDrawerOpen: false,
      miniState: false,
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Campus Digital',
          caption: 'UMSNH',
          icon: 'las la-university',
          link: '/',
          obj: {
            tipo: 'index',
            title: 'Campus Digital'
          }
        },
        {
          title: 'Plataformas de Educación',
          caption: 'UMSNH',
          icon: 'las la-school',
          link: '',
          obj: {
            tipo: 'plataformas',
            title: 'Plataformas de Educación'
          }
        },
        {
          title: 'Servicios Digitales',
          caption: 'y de Información',
          icon: 'las la-comments',
          link: '',
          obj: {
            tipo: 'servicios',
            title: 'Servicios Digitales y de Información'
          }
        },
        {
          title: 'Publicaciones digitales',
          caption: 'Revistas, libros y blogs',
          icon: 'las la-atom',
          link: '',
          obj: {
            tipo: 'publicaciones',
            title: 'Publicaciones digitales y Revistas digitales'
          }
        },
        {
          title: 'Repositorios en línea',
          caption: 'Índices y repositorios',
          icon: 'las la-project-diagram',
          link: '',
          obj: {
            tipo: 'repositorios',
            title: 'Repositorios en línea',
            slidesNoAun: ['img1', 'img2']
          }
        },
        {
          title: 'Cultura Digital',
          caption: 'Cultura UMSNH',
          icon: 'las la-broadcast-tower',
          link: '',
          obj: {
            tipo: 'cultura',
            title: 'Cultura Digital'
          }
        },
        {
          title: 'ADINI - UMSNH',
          caption: 'Agenda Digital Nicolaita',
          icon: 'las la-vector-square',
          link: '',
          obj: {
            tipo: 'adini',
            title: 'ADINI - UMSNH'
          }
        }
      ],
      PlataformasEducativasFB: firebaseDB.collection('Plataformas_educativas'),
      ServiciosDigitalesFB: firebaseDB.collection('ServiciosDigitales'),
      RevistasFB: firebaseDB.collection('Revistas'),
      BibliotecasEnLineaFB: firebaseDB.collection('BibliotecasEnLinea'),
      ComunicacionDigitalFB: firebaseDB.collection('ComunicacionDigital'),
      AgendaDigitalNicolaitaFB: firebaseDB.collection('AgendaDigitalNicolaita'),
      RedesSocialesInstitucionalesFB: firebaseDB.collection('RedesSocialesInstitucionales'),
      PaginasFB: firebaseDB.collection('Paginas'),
    }
  },
  computed: {
    ...mapGetters('campus', ['plataformasEducativasGet', 'serviciosDigitalesGet', 'revistasGet',
      'bibliotecasEnLineaGet', 'comunicacionDigitalGet', 'agendaDigitalNicolaitaGet',
      'redesSocialesInstitucionalesGet', 'paginasGet', 'paginasIndexGet']),
    plataformasEducativas: {
      get() {
        return this.plataformasEducativasGet
      },
      set(value) {
        this.plataformasEducativasSet(value)
      }
    },
    serviciosDigitales: {
      get() {
        return this.serviciosDigitalesGet
      },
      set(value) {
        this.serviciosDigitalesSet(value)
      }
    },
    revistas: {
      get() {
        return this.revistasGet
      },
      set(value) {
        this.revistasSet(value)
      }
    },
    bibliotecasEnLinea: {
      get() {
        return this.bibliotecasEnLineaGet
      },
      set(value) {
        this.bibliotecasEnLineaSet(value)
      }
    },
    comunicacionDigital: {
      get() {
        return this.comunicacionDigitalGet
      },
      set(value) {
        this.comunicacionDigitalSet(value)
      }
    },
    agendaDigitalNicolaita: {
      get() {
        return this.agendaDigitalNicolaitaGet
      },
      set(value) {
        this.agendaDigitalNicolaitaSet(value)
      }
    },
    redesSocialesInstitucionales: {
      get() {
        return this.redesSocialesInstitucionalesGet
      },
      set(value) {
        this.redesSocialesInstitucionalesSet(value)
      }
    },
    paginas: {
      get() {
        return this.paginasGet
      },
      set(value) {
        this.paginasSet(value)
      }
    },
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
    ...mapActions('campus', ['plataformasEducativasSet', 'serviciosDigitalesSet', 'revistasSet',
      'bibliotecasEnLineaSet', 'comunicacionDigitalSet', 'agendaDigitalNicolaitaSet',
      'redesSocialesInstitucionalesSet', 'paginasSet', 'paginasIndexSet']),
    getPlataformasEducativas() {
      let plataformasEducativas = []
      this.PlataformasEducativasFB.get().then(response => {
        // console.log("getPlataformasEducativas", response)
        response.forEach(el => {
          plataformasEducativas.push(el.data())
        })
        this.plataformasEducativas = plataformasEducativas
      })
    },
    getServiciosDigitales() {
      let serviciosDigitales = []
      this.ServiciosDigitalesFB.get().then(response => {
        //console.log("response", response)
        response.forEach(el => {
          serviciosDigitales.push(el.data())
        })
        this.serviciosDigitales = serviciosDigitales
      })
    },
    getRevistas() {
      let revistas = []
      this.RevistasFB.get().then(response => {
        //console.log("response", response)
        response.forEach(el => {
          revistas.push(el.data())
        })
        this.revistas = revistas
      })
    },
    getBibliotecasEnLinea() {
      let bibliotecasEnLinea = []
      this.BibliotecasEnLineaFB.get().then(response => {
        //console.log("response", response)
        response.forEach(el => {
          bibliotecasEnLinea.push(el.data())
        })
        this.bibliotecasEnLinea = bibliotecasEnLinea
      })
    },
    getComunicacionDigital() {
      let comunicacionDigital = []
      this.ComunicacionDigitalFB.get().then(response => {
        //console.log("getComunicacionDigital", response)
        response.forEach(el => {
          comunicacionDigital.push(el.data())
        })
        this.comunicacionDigital = comunicacionDigital
      })
    },
    getAgendaDigitalNicolaita() {
      let agendaDigitalNicolaita = []
      this.AgendaDigitalNicolaitaFB.get().then(response => {
        //console.log("getAgendaDigitalNicolaita", response)
        response.forEach(el => {
          agendaDigitalNicolaita.push(el.data())
        })
        this.agendaDigitalNicolaita = agendaDigitalNicolaita
      })
    },
    getRedesSocialesInstitucionales() {
      let redesSocialesInstitucionales = []
      this.RedesSocialesInstitucionalesFB.get().then(response => {
        //console.log("getRedesSocialesInstitucionales", response)
        response.forEach(el => {
          redesSocialesInstitucionales.push(el.data())
        })
        this.redesSocialesInstitucionales = redesSocialesInstitucionales
      })
    },
    getPaginas() {
      let paginas = []
      this.PaginasFB.get().then(response => {
        console.log("Response", response)
        //console.log("getRedesSocialesInstitucionales", response)
        response.forEach(el => {
          console.log("el", el)
          console.log("el data", el.data())
          paginas.push(el.data())
        })
        this.paginas = paginas
      })
    },
    getPaginasIndex() {
      let paginasIndex = []
      this.PaginasFB.doc('Index').get().then(response => {
        console.log("Response", response)
        console.log("Response data", response.data())
        this.paginasIndex = response.data()
      })
    }

  },
  created() {
    this.showSplash = true
    //this.getPlataformasEducativas()
    //this.getServiciosDigitales()
    //this.getRevistas()
    //this.getBibliotecasEnLinea()
    //this.getComunicacionDigital()
    //this.getAgendaDigitalNicolaita()
    //this.getRedesSocialesInstitucionales()
    //this.getPaginas()
    this.getPaginasIndex()
  },
  mounted() {
    setTimeout(() => {
      this.showSplash = false
    }, 2800)
  },
}
</script>
