<template>
  <q-layout view="hHr lpR fFr">
    <q-header v-if="!showDynDialog" class="col-auto bg-transparent">
      <q-toolbar class="col-auto bg-transparent">
         <q-toolbar-title class="text-primary q-ma-lg">
            <q-avatar>
              <img src="~assets/umsnh_escudo_svg_v2.svg" />
            </q-avatar>
<!--            Campus Digital UMSNH-->
           </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          size="xl"
          class="text-primary q-ma-md fixed-top-right z-max"
          icon="las la-bars"
          aria-label="Menu"
          @click="showRightDrawer = !showRightDrawer"
          style="z-index: 3001;"
        />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="showRightDrawer"
      :width="290"
      overlay

      side="right"
      class="row"
      content-class="bg-primary text-white"
      behavior="desktop"
    >
      <q-btn
        flat
        dense
        round
        color="blue-5"
        size="xl"
        class="q-ma-md fixed-top-right z-max"
        icon="las la-times"
        aria-label="Menu"
        @click="showRightDrawer = !showRightDrawer"
        style="z-index: 3001;"
      />


      <q-scroll-area class="fit">
        <q-img class="full-width bg-white" src="" style="height: 135px">
          <div class="bg-white">
            <q-avatar size="52px" class="q-mb-sm">
              <img src="~assets/logo_campus_v1.svg">
            </q-avatar>
            <div class="text-primary text-weight-bold">Campus Digital</div>
            <div class="text-primary">UMSNH</div>
          </div>
        </q-img>
        <q-list v-if="1===1">
          <q-item class="header bg-blue-10">
            <span class="text-weight-light">
              Un indice de los servicios y proyectos digitales de nuestra Universidad.
            </span>
          </q-item>

          <q-item>
              <q-item-section>
                <q-item-label class="text-overline">Proyectos</q-item-label>
              </q-item-section>
          </q-item>

          <q-separator color="gray-5" />
          <EssentialLink
            v-for="link of paginasIndex"
            :key="link.titulo"
            :link="link"
            v-bind="link"
          />

          <q-separator color="gray-5" />

          <q-item>
              <q-item-section>
                <q-item-label class="text-overline">Acerca del Campus</q-item-label>
              </q-item-section>
          </q-item>
          <q-separator color="gray-5" />
          <q-item
            clickable
            v-ripple
            tag="a"
            @click="showConocerMas=false"
            exact
            >
            <q-item-section
              avatar
              class="text-white"
              >
              <q-icon name="las la-plus" size="lg" />
            </q-item-section>

            <q-item-section class="q-py-md">
              <q-item-label>Conocer más</q-item-label>
              <q-item-label caption class="text-weight-light text-blue-3">
                Información de este sitio
              </q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <vue-splash
      style="z-index: 9999"
      :show="showSplash"
      :logo="'https://firebasestorage.googleapis.com/v0/b/campus-b4087.appspot.com/o/Temp%2Flogo_campus_v1.svg?alt=media&token=8660d9f0-033f-4ff6-8d6f-7df9674823b6'"
      color="#33bbee"
      :size="300"
      :fixed="true"
      class="dot-grid"
    />

    <q-page-container style="padding-top: 0; padding-bottom: 0;" class="dot-grid">
      <router-view/>
    </q-page-container>

        <q-footer reveal class="bg-transparent">
          <q-toolbar class="q-px-lg q-py-none">
            <q-toolbar-title class="text-overline text-primary q-ma-none" style="line-height: 1.4;">
                Universidad Michoacana <wbr>de San Nicolás de Hidalgo
            </q-toolbar-title>
          </q-toolbar>
        </q-footer>


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
      miniState: true,
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
      'redesSocialesInstitucionalesGet', 'paginasGet', 'paginasIndexGet', 'pageReadyGet',
    'showRightDrawerGet', 'showDynDialogGet']),
    pageReady: {
      get() {
        return this.pageReadyGet
      },
      set(value) {
        this.pageReadySet(value)
      }
    },
    showRightDrawer: {
      get() {
        return this.showRightDrawerGet
      },
      set(value) {
        this.showRightDrawerSet(value)
      }
    },
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
    showDynDialog: {
      get() {
        return this.showDynDialogGet
      },
      set(value) {
        this.showDynDialogSet(value)
      }
    },
  },
  methods: {
    ...mapActions('campus', ['plataformasEducativasSet', 'serviciosDigitalesSet', 'revistasSet',
      'bibliotecasEnLineaSet', 'comunicacionDigitalSet', 'agendaDigitalNicolaitaSet',
      'redesSocialesInstitucionalesSet', 'paginasSet', 'paginasIndexSet', 'pageReadySet',
      'showRightDrawerSet', 'showDynDialogSet']),
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
      this.pageReady = true
    }, 3400)
  },
}
</script>
