
<template>
  <div>

    <notifyCmp ref="notify" />
    <b-btn class="bg-success button-right " v-on:click="guardar">GUARDAR</b-btn>
    <b-btn class="bg-success button-right " v-on:click="imprimir">IMPRIMIR</b-btn>


    <table class="table table-sm table-info">
      <tbody>
        
        <tr>
          <td class="text-right" style="width:15%;">Tipo cirugía:</td>
          <td>
            <div>
              <input type="radio" id="urgente" value="M" v-model="pq.esUrgente">URGENTE
              <input type="radio" id="Programa" value="P" v-model="pq.esUrgente">PROGRAMADA
            </div>
          </td>
          <td>
          Fecha:
          </td>
<input type="datetime-local" v-model="pq.fechaProgramada" name="fechaProgramada"></td>
         
        </tr>
       
        <tr>
          <td class="text-right" style="vertical-align: middle;">Disposición final de la pieza:</td>
          <td>
            Estudio patológico:<br /><input type="text" class="input-text" v-model="pq.estudio" name="estudio" size="40">
            <br />
            R.P.B.I.:<br /><input type="text" class="input-text" v-model="pq.RPBI" name="RPBI" size="40">
            <br />
            De acuerdo a la legalidad:<br />
            <div>
              <input type="radio" id="medicoTratante" value="M" v-model="pq.quien">Médico tratante
              <input type="radio" id="paciente" value="P" v-model="pq.quien">Paciente
              <input type="radio" id="familiar" value="F" v-model="pq.quien">Familiar
            </div>
          </td>
        </tr>

        <tr>
          <td class="text-right">Diagnóstico y/o datos clínicos:</td>
          <td><input type="text" v-model="pq.diagnostico" name="diagnostico" size="50"></td>
        </tr>
        <tr>
          <td class="text-right">Pieza anatómica:</td>
          <td><input type="text" v-model="pq.piezaAnatomica" name="piezaAnatomica" size="50"></td>
        </tr>

        <tr>
          <td class="text-right">Tipo intervención:</td>
          <td><input type="text" v-model="pq.tipoIntervencion" name="tipoIntervencion" size="50"></td>
        </tr>
        
        <tr>
          <td class="text-right" style="vertical-align: middle;">Sitio obtención:</td>
          <td class="text-left" >
            <trazosFiguraHumanaCmp v-bind:imgBase64Original="pq.sitioObtencion" @trazosHechos="pq.sitioObtencion=$event" />
          </td>
        </tr>
        
        <tr>
          <td class="text-right">Observaciones:</td>
          <td><input type="text" v-model="pq.observaciones" name="observaciones" size="50"></td>
        </tr>
        <tr>
          <td class="text-right">Nombre enfermera recibe:</td>
          <td><input type="text" v-model="pq.nombreEnfermera" name="nombreEnfermera" size="50"></td>
        </tr>
        <tr>
          <td class="text-right">Nombre entrega/recibe:</td>
          <td><input type="text" v-model="pq.nombreER" name="nombreER" size="50"></td>
        </tr>

      </tbody>
    </table>

    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <b-btn class="bg-success" v-on:click="firmaMedico">FIRMA MÉDICO</b-btn>
            </td>
            <td id="firmaMedico">
              <firmaCmp id="firmaX" v-show="estaFirmando" @firmaCapturada="firmaBase64=$event" />
              <p><img v-bind:src="firma(pq.firmaBase64MedicoTratante)" width="300" height="60" /></p>
            </td>
          </tr>

          <tr>
            <td>
              <b-btn class="bg-success" v-on:click="firmaEnfermera">FIRMA ENFERMERA</b-btn>
            </td>
            <td id="firmaEnfermera">
              <p><img v-bind:src="firma(pq.firmaBase64Enfermera)" width="300" height="60" /></p>
            </td>
          </tr>
          <tr>
            <td>
              <b-btn class="bg-success" v-on:click="firmaER">FIRMA ENTREGA/RECIBE</b-btn>
            </td>
            <td id="firmaER">
              <p><img v-bind:src="firma(pq.firmaBase64ER)" width="300" height="60" /></p>
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <!--<div>
      <textarea class="input-text textarea-size" type="text" v-model="pq.firmaBase64MedicoTratante" name="x1"></textarea>
      <textarea class="input-text textarea-size" type="text" v-model="pq.firmaBase64Enfermera" name="x2"></textarea>
      <textarea class="input-text textarea-size" type="text" v-model="pq.firmaBase64ER" name="x3"></textarea>

    </div>-->


  </div>
</template>
<script>

  import axios from 'axios';

  import notifyCmp from '~/components/notifyCmp';
  import firmaCmp from '~/components/firmaCmp';
  import trazosFiguraHumanaCmp from '~/components/trazosFiguraHumanaCmp';
  

  import moment from 'moment';
  //require('moment/locale/es');

  export default {
    name: 'solicitudPiezasCmp',
    components: {
      notifyCmp,
      firmaCmp,
      trazosFiguraHumanaCmp
    },
    data() {
      return {
        tituloPagina: '-- SOLICITUD ESTUDIO Y DISPOSICIÓN DE PIEZAS ANOTOMOPATOLÓGICAS--',
        tituloFirma: '',
        quienFirma: '',

        token: '',
        paciente: {},
        pq: {},
        firmaBase64: '',
        firmaBase64Back: '',
        estaFirmando: false
      }
    },
    computed: {

      seFirmo: function () {        
        return !(this.firmaBase64 === '');
      }
    },

    watch: {
      seFirmo: function () {

        if (this.seFirmo) {
          // Para clonar la firma en otro objeto y que nosean la misma referencia
          this.firmaBase64Back = JSON.parse(JSON.stringify(this.firmaBase64));

          //console.log(this.quienFirma, ':[', this.firmaBase64Back, ']');
          switch (this.quienFirma) {
            case 'MEDICO':
              this.pq.firmaBase64MedicoTratante = this.firmaBase64Back;
              break;
            case 'ENFERMERA':
              this.pq.firmaBase64Enfermera = this.firmaBase64Back;
              break;
            case 'ER':
              this.pq.firmaBase64ER = this.firmaBase64Back;
              break;
            default:
            // code block
          }


          this.estaFirmando = false;
          this.tituloFirma = '';

        }
      },
    },

    created() {
      //this.getCurrentPaciente();
      //this.getSolicitudPiezas();

    },

    methods: {
      firma: function (firmaBase64) {
        if (firmaBase64) {
          return "data: image/png;base64," + firmaBase64
        };
        return "no-image.jpg"
      },

   
      addHeaderBase64: function (imgBase64) {
        if (imgBase64) {
          return "data: image/png;base64," + imgBase64
        };
        return '';
      },
      firmaEnfermera: function () {
        this.quienFirma = 'ENFERMERA';
        document.getElementById('firmaEnfermera').appendChild(document.getElementById('firmaX'));
        this.firmar();
      },
      firmaMedico: function () {
        this.quienFirma = 'MEDICO';
        document.getElementById('firmaMedico').appendChild(document.getElementById('firmaX'));
        this.firmar();
      },

      firmaER: function () {
        this.quienFirma = 'ER';
        document.getElementById('firmaER').appendChild(document.getElementById('firmaX'));
        this.firmar();
      },

      firmar: function () {
        this.estaFirmando = true;
        this.firmaBase64 = '';
        document.getElementById('btnIniciarFirma').click();
      },



      guardar: function () {

      
        
        const req = {
          method: this.pq.paciente ? 'put' : 'post',
          url: process.env.urlServer + '/SolicitudPiezas/' + this.$store.state.pacienteId,
          headers: {
            token: this.$store.state.token
          },
          data: {

            //////////////////

            folio: this.pq.folio,
            sala: this.pq.sala,
            fechaSolicitud: this.pq.fechaSolicitud,

            estudio: this.pq.estudio,
            RPBI: this.pq.RPBI,
            quien: this.pq.quien,

            diagnostico: this.pq.diagnostico,
            piezaAnatomica: this.pq.piezaAnatomica,
            tipoIntervencion: this.pq.tipoIntervencion,
            sitioObtencion: this.pq.sitioObtencion,
            observaciones: this.pq.observaciones,

            firmaBase64MedicoTratante: this.pq.firmaBase64MedicoTratante,

            nombreEnfermera: this.pq.nombreEnfermera,
            firmaBase64Enfermera: this.pq.firmaBase64Enfermera,

            nombreER: this.pq.nombreER,
            firmaBase64ER: this.pq.firmaBase64ER,

            //////////////////
          }
        };
        axios(req)
          .then((response) => {
            this.pq = response.data.solicitudPiezas;
            this.pq.fechaSolicitud = moment(this.pq.fechaSolicitud).format('YYYY-MM-DDTHH:mm');

            this.$refs.notify.showNotify("DOCUMENTO GUARDADO", 2.5);
            this.$store.commit('setSocketDatosGenerales');

          })
          .catch(err => {
            //console.log('ERROR  al guardar HIE-- fail---->>> pasé ', err.response);
            this.$refs.notify.showNotify("ERROR AL GUARDAR: " + err.response, 2.5);

          });
      },

      getCurrentPaciente: function () {
        
        axios.get(process.env.urlServer + '/Paciente/' + this.$store.state.pacienteId, {
          token: this.$store.state.token
        })
          .then((response) => {

            this.paciente = response.data.paciente;
            console.log('getPaciente->', this.paciente);
          },
            (error) => {
              this.paciente = {};
              let p = {
                folioCuenta: '',
                nombre: '',
                genero: '',
                fechaNacimiento: '',
                calle: '',
                numeroInterior: '',
                numeroExterior: '',
                colonia: '',
                municipio: '',
                entidad: '',
                pais: '',
                cp: '',
                telefonos: '',
                ////////////////
                // Hoja inicial expediente
                fechaIngreso: '',
                alergias: '',
                diagnosticoIngreso: '',
                otrosDiagnosticos: '',
                tituloMT: '',
                tituloAbrMT: '',
                nombreMT: '',
                cedulaMT: '',
                institucionMT: '',
                especialidadMT: '',

                //////////////////////////
                //// Nota de urgencias
                fecha1: '',
                seguro: '',
                ocupacion: '',
                diagnosticoEgreso: '',
                FC: '',
                FR: '',
                TA: '',
                T: '',
                peso1: '',
                talla1: '',
                antecedentesImportancia1: '',
                resumenClinico1: '',
                indicaciones1: '',

                /////////////////////////
                // Historia clínica
                lugarOrigen: '',
                antHeredoFam: '',
                personalesPato: '',
                personalesNoPato: '',
                ago: '',
                tensionMens: '',
                ritmo: '',
                inicioVidaSexual: '',
                gestados: '',
                partos: '',
                abortos: '',
                cesareas: '',
                fechaUltimpoParto: '',
                fechaUltimoAborto: '',
                pesoProductos: '',
                fechaUltimaRegla: '',
                fechaUltimaCitoCervix: '',
                circuncision: '',
                protecciónMenstrual: '',
                otrosHistoriaClinica: '',
                padecimientoActual: '',
                peso: '',
                talla: '',
                temperatura: '',
                tensionArterial: '',
                craneo: '',
                cara: '',
                fondoOcular: '',
                cuello: '',
                cardioPulmunar: '',
                abdomen: '',
                mamas: '',
                tactoVaginal: '',
                tactoRectal: '',
                miembros: '',
                ID: '',
                TX: '',
                LAB: '',
                USG: '',
                RX: '',
                /////////////////////////
                //Sello
                fechaCreacionSe: '',
                fechaModificacionSe: '',
                situacionSe: 1, //1-activo
                //fechaBorrado: default nada
                usuarioSe: ''//req.usuario._id
              };
            });
      },

      imprimir: function () {
        if (!this.pq.paciente) {
          this.$refs.notify.showNotify("ANTES DEBES AGREGAR Y GUARDAR LOS DATOS", 4);
          return;
        }
        axios.get(process.env.urlServer + '/msi22/' + this.$store.state.pacienteId, {
          headers: {
            token: this.getToken,
            Accept: 'application/pdf',
            responseType: 'blob'
          }
        })
          .then((response) => {
            this.$refs.notify.showNotify("CLICK AQUÍ PARA VER EL FORMATO", 4, response.data.pdfFile, true);
          },
            (error) => {
              this.err = error.response.data.error;
              //console.log('Error en imprimir Nota Urgencias: ', this.err);
              this.$refs.notify.showNotify("ERROR AL GENERAR EL FORMATO", 5);
            });
      },

      getSolicitudPiezas: function () {
        console.log('engetSolicitudPiezas->->-> ');

        axios.get(process.env.urlServer + '/SolicitudPiezas/' + this.$store.state.pacienteId, {
          headers: {
            'token': this.$store.state.token
          }
        }).then((response) => {
          console.log('regresé exitósamente de leer la solci pzas....');
          this.pq = response.data.solicitudPiezas;
          this.pq.fechaSolicitud = moment(this.pq.fechaSolicitud).format('YYYY-MM-DDTHH:mm');
          console.log('OK leí getSolicitudPzas-//->:', this.pq.folio);
        })
          .catch(err => {
            //console.log('>>>en getSolicitudPiezas-> error', err);

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
