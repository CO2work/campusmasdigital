<template>
  <q-page class="flex flex-center">
    <div class="main">

      <!--
        <q-card class="fixed-center text-center text-white bg-transparent no-border-radius no-border no-shadow"
              style="text-shadow: #1D1D1D 0 0 5px;">
        <q-card-section class="text-weight-bold">
          <img src="~assets/logopng.png" alt="Escudo UMSNH">
          <h3 class="q-mt-sm q-mb-md">Campus Digital</h3>
          <h5 class="q-my-sm">
            Universidad Michoacana
            <br>
            de San Nicolás de Hidalgo
          </h5>
        </q-card-section>

        <q-card-section>
          <p class="text-h6 text-weight-regular">
            <strong>La Universidad más cerca de ti</strong>. En este espacio encontrarás un repositorio de los servicios que la Casa de Hidalgo oferta en formato digital.
          </p>
        </q-card-section>

      </q-card>
      -->

      <p>AgendaDigitalNicolaitaFB</p>
      <p>{{ AgendaDigitalNicolaitaFB }}</p>
      <p></p>
      <p>BibliotecasEnLineaFB</p>
      <p>{{ BibliotecasEnLineaFB }}</p>
      <p></p>
      <p>ComunicacionDigitalFB</p>
      <p>{{ ComunicacionDigitalFB }}</p>
      <p></p>
      <p>PlataformasEducativasFB</p>
      <p>{{ PlataformasEducativasFB }}</p>
      <p></p>
      <p>RedesSocialesInstitucionalesFB</p>
      <p>{{ RedesSocialesInstitucionalesFB }}</p>
      <p></p>
      <p>RevistasFB</p>
      <p>{{ RevistasFB }}</p>
      <p></p>
      <p>ServiciosDigitalesFB</p>
      <p>{{ ServiciosDigitalesFB }}</p>
      <p></p>

    </div>

  </q-page>
</template>

<script>
import firebaseDB from "boot/firebase"
import firebase from "firebase";

export default {
  name: 'PageIndex',
  components: {

  },
  data() {
    return {
      AgendaDigitalNicolaitaFB: firebaseDB.collection('AgendaDigitalNicolaita'),
      BibliotecasEnLineaFB: firebaseDB.collection('BibliotecasEnLinea'),
      ComunicacionDigitalFB: firebaseDB.collection('ComunicacionDigital'),
      PlataformasEducativasFB: firebaseDB.collection('Plataformas_educativas'),
      RedesSocialesInstitucionalesFB: firebaseDB.collection('RedesSocialesInstitucionales'),
      RevistasFB: firebaseDB.collection('Revistas'),
      ServiciosDigitalesFB: firebaseDB.collection('ServiciosDigitales'),
    }
  }

}
</script>
