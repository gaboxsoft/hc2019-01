<template>

  <div>
    <!--<button id="showFirma" v-on:click="showFirma">Muestra Firma</button>-->

    <!--<p>BASE64: {{firmaPngBase64}}</p>
    <img v-bind:src="firmaPngBase64" width="500" height="100" />-->

    <div>
      <table id="table-cnv" border="1" cellpadding="0" width="500" >
        <tbody>
          <tr>
            <td height="100" width="500">
              <canvas id="cnv" name="cnv" style="background-color:black;" width="500" height="100"></canvas>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!--<canvas name="SigImg" id="SigImg" width="500" height="100"></canvas>-->
      <!-- v-show="seFirmo" -->
      <div>
        <!--<p>Firmado?{{noFirmado==false}}-- capturandoFirma:{{capturandoFirma}}{{firmaBase64}}</p>-->
        <!--<input id="SignBtn" name="SignBtn" type="button" v-show="!capturandoFirma" value="FIRMAR" onclick="javascript:onSign()" />--> <!--&nbsp;&nbsp;&nbsp;&nbsp;-->
        <button id="btnIniciarFirma" name="SignBtn" v-show="capturandoFirma==false" v-on:click="iniciarFirma()">INICIAR FIRMA</button>

        <!--<input id="button1" name="ClearBtn" type="button" v-show="capturandoFirma" value="LIMPIAR" onclick="javascript:onClear()" />--> <!--&nbsp;&nbsp;&nbsp;&nbsp-->
        <!-- Se dehabilitó este botón por que al iniciar firma ya incluye limpiar firma -->
        <button id="btnLimpiarFirma" name="ClearBtn" v-show="capturandoFirma" v-on:click="limpiarFirma()">LIMPIAR</button>

        <!--style="display:none;"-->
        <!--<input id="button2" name="DoneBtn" type="button" value="ACEPTAR FIRMA" onclick="javascript:onDone(callbackOnDone)" />--> <!--&nbsp;&nbsp;&nbsp;&nbsp-->
        <button id="btnAceptarFirma" name="DoneBtn" v-show="capturandoFirma" v-on:click="aceptarFirma()">ACEPTAR FIRMA</button>

        <!--<textarea id="xfirmaBase64" name="xfirmaBase64" style="display:none;">HOLA TEXTAREA</textarea>-->


      </div>


    </div>

  </div>
</template>

<script>


  export default {
    name: 'Firma',
    data() {
      return {
        tituloPagina: 'Firma',
        firmaBase64: '',
        ancho: 500,
        alto: 100,
        capturandoFirma:false,
      }
    },

    computed: {
      firmaPngBase64: function () {
        return "data:image/png;base64," + this.$store.state.firmaBase64;
      },
      noFirmado: function () {
        return (this.firmaBase64 === '');
      },
    },

    watch: {
      noFirmado: function () {
        console.log((noFirmado ? "NO FIRMADO" : 'FIRMADO!'));
      },
    },

    created() {
      this.firmaBase64 = '';
      //this.$store.commit('setFirmaBase64', '');
    },

    mounted() {
      //console.log('textarea=', document.DATA.firmaBase64.value);
      //console.log('\r\n\r\n\r\n 1.- ==============>>>>  la firma base64 es', this.firmaBase64);
      let scriptSigWeb = document.createElement('script');
      scriptSigWeb.setAttribute('src', 'SigWebTablet.js');
      document.head.appendChild(scriptSigWeb);

      let scriptSigWebController = document.createElement('script');
      scriptSigWebController.setAttribute('src', 'SigWebTabletController.js');
      document.head.appendChild(scriptSigWebController);
    },
    
    methods: {

      showFirma: function () {
        //this.firmaPngBase64 = "data: image/png;base64," + this.firmaBase64;
        console.log('****************',this.firmaPngBase64,"<<== FIRMAPNGBASE64");
      }, 

      getController: function () {
        console.log('en GETcontroller:', controller());
      },

      iniciarFirma: function () {
        //console.log('1.- OnSig.... capturandoFirma=', this.capturandoFirma);
        this.capturandoFirma = true;
        document.getElementById('cnv').style = 'background-color:white;'
        this.firmaBase64 = '';
        onSign();
      },

      limpiarFirma: function () {
        //console.log('1.- OnClear.... capturandoFirma=', this.capturandoFirma);
        this.firmaBase64 = '';
        //this.$store.commit('setFirmaBase64', '');
        document.getElementById('cnv').style = 'background-color:white;'
        onClear();
      },

      aceptarFirma: function () {
        //console.log('1.- OnClear.... capturandoFirma=', this.capturandoFirma);
        onDone(this.callbackOnDone);
      },

      callbackOnDone: function (imgBase64) {
        //console.log(' 1x.1 en callbackOnDone');
        //console.log('2.2.- callbackOnDone.... capturandoFirma=', this.capturandoFirma);
        //console.log('2.3.- en callbackOnDone imgBase64=', imgBase64);
        
        document.getElementById('cnv').style = 'background-color: black;'
        //document.getElementById('btnIniciarFirma').click();
        this.capturandoFirma = false;
        
        this.$emit('firmaCapturada', imgBase64);
        

        //console.log(' 1x.2 TERMINE DE CAPTURAR imgBASE64');
        //alert('callBackOnDone: '+imgBase64);
        //alert('1x.3 ALERTA: TERMINE DE CAPTURAR FIRMA...');
      }
    }
  }
</script>

