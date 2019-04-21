
<template>
  <div>
    <!--<div>
      <h2 class="text-primary">{{tituloPagina}}</h2>
    </div>-->
    <notifyCmp ref="notify" />
    <b-btn class="bg-success button-right " v-on:click="guardar">GUARDAR</b-btn>

    <!--

      ?fechaFirma=&preoperatorio=&procedimientoQuirurgico=&testigo1=&testigo2=&SignBtn=#


      -->
    <!--<form action="#">-->
    <table class="table table-sm table-info">
      <tbody>
        <tr>
          <td>
            <!--              <input type="datetime-local" v-model="ci.fechaFirma" name="fechaFirma">-->
            <input type="date" v-model="ci.fechaFirma" name="fechaFirma">
          </td>
        </tr>
        <tr>
          <td>Caracter de la cirugía o procedimiento:</td>
          <td>
            <div>
              <input type="radio" id="electivo" value="N" v-model="ci.esUrgente">Electivo
              <input type="radio" id="Urgente" value="S" v-model="ci.esUrgente">Urgente
            </div>
          </td>
        </tr>
        <tr>
          <td style="width:25%;">Diagnóstico:</td>
          <td>{{paciente.diagnosticoEgreso}}</td>
        </tr>
        <tr>
          <td>Preoperatorio:</td>
          <td><input type="text" class="input-text" v-model="ci.preoperatorio" name="preoperatorio" size="80"></td>
        </tr>

        <tr>
          <td>Procedimiento:</td>
          <td><input type="text" class="input-text" v-model="ci.procedimientoQuirurgico" name="procedimientoQuirurgico" size="80"></td>
        </tr>
        <tr>
          <td>Testigo 1:</td>
          <td><input type="text" class="input-text" v-model="ci.nombreTestigo1" name="nombreTestigo1" size="80"></td>
        </tr>
        <tr>
          <td>Testigo 2:</td>
          <td><input type="text" class="input-text" v-model="ci.nombreTestigo2" name="nombreTestigo2" size="80"></td>
        </tr>


      </tbody>
    </table>

    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <b-btn class="bg-success" v-on:click="firmaPaciente">FIRMA PACIENTE</b-btn>
            </td>
            <td id="firmaPaciente">
              <firmaCmp id="firmaX" v-show="estaFirmando" @firmaCapturada="firmaBase64=$event" />
              <p><img v-bind:src="firma(ci.firmaBase64Paciente)" width="300" height="60" /></p>
            </td>

          </tr>
          <tr>
            <td>
              <b-btn class="bg-success" v-on:click="firmaTestigo1">FIRMA TESTIGO 1</b-btn>      
            </td>
            <td id="firmaTestigo1">
              <p><img v-bind:src="firma(ci.firmaBase64Testigo1)" width="300" height="60" /></p>
            </td>
          </tr>
          <tr>
            <td>
              <b-btn class="bg-success" v-on:click="firmaTestigo2">FIRMA TESTIGO 2</b-btn>
            </td>
            <td id="firmaTestigo2">
              <p><img v-bind:src="firma(ci.firmaBase64Testigo2)" width="300" height="60" /></p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--</form>-->
    <!--<b-btn class="bg-success" v-on:click="guardar">GUARDAR</b-btn>-->

  </div>
</template>
<script>
  //const urlGetPacientes = process.env.urlServer + '/Pacientes?limite=0&desde=0';//'http://localhost:3000/Pacientes?limite=0&desde=0';
  //const MAX_SIZE_NOMBRE = 50;
  import axios from 'axios';

  import notifyCmp from '~/components/notifyCmp';
  import firmaCmp from '~/components/firmaCmp';

  //import moment from 'moment';
  //import consentimientoInformadoVue from '../pages/consentimientoInformado.vue';
  export default {
    name: 'consentimientoInformadoCmp',
    components: {
      notifyCmp,
      firmaCmp
    },
    data() {
      return {
        tituloPagina: '-- CONSENTIMIENTO PARA ANESTESIA --',
        tituloFirma: '',
        quienFirma: '',
        totalPacientes: 0,
        pacientes: {},
        token: '',
        paciente: {},
        ci: {},
        firmaBase64: '',
        firmaBase64Back: '',
        firmaBase64Paciente: '',
        firmaBase64Testigo1: '',
        firmaBase64Testigo2: '',
        estaFirmando: false,
      }
    },
    computed: {
      //getToken() {
      //  return this.$store.state.token;
      //},
      //urlApiPaciente: function () {
      //  return process.env.urlServer + '/Paciente/' + this.$store.state.pacienteId;//'http://localhost:3000/paciente/' + this.$store.state.pacienteId;
      //},
      //urlGetPaciente: function () {
      //  return process.env.urlServer + '/Paciente/' + this.$store.state.pacienteId;
      //  //'http://localhost:3000/paciente/' + this.$store.state.pacienteId;
      //},
      //getPacienteId() {
      //  return this.$store.state.pacienteId;
      //},
      seFirmo: function () {
        console.log('seFirmo()?->' + this.firmaBase64);
        return !(this.firmaBase64 === '');
      }
    },

    watch: {
      seFirmo: function () {
        //alert('watch:seFirmo->this.seFirmo? ' + this.seFirmo);
        if (this.seFirmo) {
          //this.guardar();
          ////alert('seFirmo--> firmado paciente!' + JSON.parse(JSON.stringify(this.firmaBase64)));
          //alert(this.quienFirma + '->' + JSON.parse(JSON.stringify(this.firmaBase64)));
          this.firmaBase64Back = JSON.parse(JSON.stringify(this.firmaBase64));

          switch (this.quienFirma) {
            case 'PACIENTE':
              this.ci.firmaBase64Paciente = this.firmaBase64Back;
              break;
            case 'TESTIGO1':
              this.ci.firmaBase64Testigo1 = this.firmaBase64Back;
              break;
            case 'TESTIGO2':
              this.ci.firmaBase64Testigo2 = this.firmaBase64Back;
              break;
            default:
            // code block
          }
          //console.log(this.firmaBase64Back);
          this.estaFirmando = false;
          this.tituloFirma = '';
          //alert('firmado!');
        }
      },
      getPacienteId() {
        this.getCurrentPaciente();
      }

    },
    created() {
      this.getCurrentPaciente();
      this.getConsentimientoInformado();
    },


    methods: {
      firma: function (firmaBase64) {
        if (firmaBase64) {
          return "data: image/png;base64," + firmaBase64
        };
        return "no-image.jpg"
      },
      firmaPaciente: function () {
        this.tituloFirma = 'FIRMA DE PACIENTE'
        this.quienFirma = 'PACIENTE';
        document.getElementById('firmaPaciente').appendChild(document.getElementById('firmaX'));
        this.firmar();
      },
      firmaTestigo1: function () {
        this.tituloFirma = 'FIRMA DE TESTIGO 1'
        this.quienFirma = 'TESTIGO1';
        document.getElementById('firmaTestigo1').appendChild(document.getElementById('firmaX'));
        this.firmar();
      },
      firmaTestigo2: function () {
        this.tituloFirma = 'FIRMA DE TESTIGO 2'
        this.quienFirma = 'TESTIGO2';
        document.getElementById('firmaTestigo2').appendChild(document.getElementById('firmaX'));
        this.firmar();
      },
      firmar: function () {
        this.estaFirmando = true;
        this.firmaBase64 = '';
        document.getElementById('btnIniciarFirma').click();
      },

      guardar: function () {
        this.token = this.getToken;
        const req = {
          method: this.ci.paciente ? 'put' : 'post',
          url: process.env.urlServer + '/ConsentimientoInformado/' + this.$store.state.pacienteId,
          headers: {
            token: this.$store.state.token
          },
          data: {

            lugarFirma: this.ci.lugarFirma,
            fechaFirma: this.ci.fechaFirma,

            esUrgente: this.ci.esUrgente,
            preoperatorio: this.ci.preoperatorio,
            procedimientoQuirurgico: this.ci.procedimientoQuirurgico,

            nombrePaciente: this.ci.nombrePaciente,
            firmaBase64Paciente: this.ci.firmaBase64Paciente,

            nombreTestigo1: this.ci.nombreTestigo1,
            firmaBase64Testigo1: this.ci.firmaBase64Testigo1,
            nombreTestigo2: this.ci.nombreTestigo2,
            firmaBase64Testigo2: this.ci.firmaBase64Testigo2,

            nombreRepresentanteLegal: this.ci.nombreRepresentanteLegal,
            firmaBase64RepresentanteLegal: this.ci.firmaBase64RepresentanteLegal,

          }
        };
        axios(req)
          .then((response) => {
            //console.log('En guardar hie-- success---->>> pasé ', response.data);
            this.$refs.notify.showNotify("DOCUMENTO GUARDADO", 2.5);
            this.$store.commit('setSocketDatosGenerales');

          })
          .catch(err => {
            //console.log('ERROR  al guardar HIE-- fail---->>> pasé ', err.response);
            this.$refs.notify.showNotify("ERROR AL GUARDAR: " + err.response, 2.5);
          });
      },
      eliminar: function () {
        return true;
      }
      ,
      archiva: () => {
        return true;

      },
      modificar: (pacienteId) => {
        this.$store.commit('setPacienteId', pacienteId)


      },
      seleccionar: function (pacienteId) {
        //console.log('aquí en seleccionar paciente, id: ', pacienteId);
        this.$store.commit('setPacienteId', pacienteId)


        //this.$router.push({ name: 'index' })
        //this.$forceUpdate();

      },
      addPaciente: function () {
        return true;

      },
      getCurrentPaciente: function () {

        axios.get(this.urlGetPaciente, {
          token: this.$store.state.token
        })
          .then((response) => {
            this.paciente = response.data.paciente;
            this.paciente.fechaNacimiento = moment(this.paciente.fechaNacimiento).format('YYYY-MM-DD');
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

      //getPacientes: function () {
      //  //console.log(new Date(), '-->en pacientesCmp--> getPacientes--> this.$store.state.token:', this.$store.state.token);
      //  this.token = this.$store.state.token;
      //  axios.get(urlGetPacientes, {
      //    headers: {
      //      'token': this.token
      //    }
      //  }).then((response) => {
      //    this.pacientes = response.data.pacientes;
      //    this.totalPacientes = this.pacientes.length
      //    //console.log('En pacientesCmp-- success---->>> pasé ', new Date(), '--', this.pacientes.length);

      //  })
      //    .catch(err => {
      //      //console.log('---->>> error en Leer la lista de Pacientes:' + err);
      //      this.totalPacientes = this.pacientes.length
      //      this.pacientes = {};
      //      //console.log('En pacientesCmp-- fail---->>> pasé ', new Date(), '--', this.pacientes.length);
      //    });
      //},
      getConsentimientoInformado: function () {

        axios.get(process.env.urlServer + '/ConsentimientoInformado/' + this.$store.state.pacienteId, {
          headers: {
            'token': this.$store.state.token
          }
        }).then((response) => {
          this.ci = response.data.consentimientoInformado;

        })
          .catch(err => {
            //this.ci = { fechaFirma: Date() };
            this.ci = {};
          });
      }
    }
  }

</script>
