
<template>
  <div>

    <notifyCmp ref="notify" />
    <b-btn class="bg-success button-right " v-on:click="guardar">GUARDAR</b-btn>
    <!--<b-btn class="bg-success button-right " v-on:click="imprimir">IMPRIMIR</b-btn>-->

    <h1>{{titulo}}</h1>
    
    <table class="table table-sm table-info" style="width:50%">
      <tbody>
        <tr>
          <td class="text-left" style="width:10%"><img src="../msiFormatos/msi21-1.jpg" width="100" /><br />CMSI-21 Registro de anestesia:</td>
          <td style="width:25%"><fileSelectorCmp max="2" v-model="msi21File"><input type="file" class="slotted" /></fileSelectorCmp></td>
          <td>
            <ul >
              <li v-for="img,index in msi21File">
                <img v-bind:src="img.name" width="100" />
                {{ img.name }}
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td class="text-left"><img src="../msiFormatos/msi30-1.jpg" width="100" /><br />CMSI-30 Hoja de Urgencias:</td>
          <td><fileSelectorCmp max="2" v-model="msi30File"><input type="file" class="slotted" /></fileSelectorCmp></td>
        </tr>
        <tr>
          <td class="text-left"><img src="../msiFormatos/msi31-1.jpg" width="100" /><br />CMSI-31 Hoja de hospitalización:</td>
          <td><fileSelectorCmp max="2" v-model="msi30File"><input type="file" class="slotted" /></fileSelectorCmp></td>
        </tr>

        <tr>
          <td class="text-left"><img src="../msiFormatos/msi32-1.jpg" width="100" /><br />CMSI-32	Hoja quirúrgica:</td>
          <td><fileSelectorCmp max="2" v-model="msi32File"><input type="file" class="slotted" /></fileSelectorCmp></td>
        </tr>
        <tr>
          <td class="text-left"><img src="../msiFormatos/msi33-1.jpg" width="100" /><br />CMSI-33	Hoja de terapia intensiva:</td>
          <td><fileSelectorCmp max="2" v-model="msi33File"><input type="file" class="slotted" /></fileSelectorCmp></td>
        </tr>

        <tr>
          <td class="text-left"><img src="../msiFormatos/msi40-1.jpg" width="100" /><br />CMSI-40	Historia clínica del recién nacido:</td>
          <td><fileSelectorCmp max="2" v-model="msi40File"><input type="file" class="slotted" /></fileSelectorCmp></td>
        </tr>
        <tr>
          <td class="text-left"><img src="../msiFormatos/msi41-1.jpg" width="100" /><br />CMSI-41	Registro clínico de Neonatología:</td>
          <td><fileSelectorCmp max="2" v-model="msi41File"><input type="file" class="slotted" /></fileSelectorCmp></td>
        </tr>
      </tbody>
    </table>

    <ul class="files">
      <li v-for="file,index in files">
        {{ file.name }}
      </li>
    </ul>

  </div>
</template>
<script>

  import axios from 'axios';
  import fileSelectorCmp from '~/components/fileSelectorCmp';
  import notifyCmp from '~/components/notifyCmp';


  //require('moment/locale/es');

  export default {
    name: 'progQuirurgicaCmp',
    components: {
      notifyCmp,
      fileSelectorCmp
    },
    data() {
      return {
        files: [],
        msi21File: '',
        msi30File: '',
        msi31File: '',
        msi32File: '',
        msi33File: '',
        msi40File: '',
        msi41File: '',
        tituloPagina: '-- SUBE LOS ARCHIVOS RESPECTIVOS DE CADA FORMATO--',

      }
    },
    computed: {

    },

    watch: {

    },

    created() {


    },

    methods: {
      getOtrosFormatos: function () {
        console.log('en getOtrosFormatos->->-> ');

        axios.get(process.env.urlServer + '/getOtrosFormatos/' + this.$store.state.pacienteId, {
          headers: {
            'token': this.$store.state.token
          }
        }).then((response) => {
          console.log('regresé exitósamente de leer la prog quirurgica....');
          this.pq = response.data.progQuirurgica;
          this.pq.fechaProgramada = moment(this.pq.fechaProgramada).format('YYYY-MM-DDTHH:mm');
          console.log('OK leí getProgQuirurgica-//->:');
        })
          .catch(err => {
            //console.log('>>>en getProgQuirurgica-> error', err);

            //this.pq = { fechaFirma: Date() };

            //this.$refs.notify.showNotify("ERROR AL LEER DOCUMENTO"+JSON.stringify(err.Error), 2.5);


            ////this.pq.sitioObtencion = figHumanaBase64;
            ////this.trazos = this.pq.sitioObtencion;
            this.pq = {};
            //console.log('hubo err al leer getSolicitudPzas-//->:', this.pq);
          });
      }


    }
  }

</script>
