
<template>
  <div>

    <!--<button id="btnDibuja" name="dibujaBtn" v-on:click="dibujaFiguraHumana()">MUESTRA FIGURA HUMANA</button>
    <br />-->
    <!--<img id="scream" style="display: none;" src="~/../msiformatos/figuraHumana.png" alt="figuraHumana" height="200">-->
    <!--<br />-->
    <!--<p id="estado"></p>
    <br />-->
    <!--<button id="btnMostrar" name="mostrarBtn" v-on:click="getTrazosFiguraHumana()">MOSTRAR CAPTURA</button>-->

    <div align="center">


      <button id="btnLimpiar" name="limpiarBtn" v-on:click="limpiarTrazosFiguraHumana()">LIMPIAR TRAZOS</button>
      <br />
      <canvas id="pizarra" @mouseleave="mouseLeavePizarra" @mouseover="mouseOverPizarra" style="width: 300px;height: 300px;background-color: black;"></canvas>

      <!--<td>
        <img id="imagenCapturada" src="" width="300" height="300" />
      </td>-->
      <!--<table>
        <tbody>

          <tr>
            <td>
              <textarea class="input-text" style="font-size:12px;" v-model="imgBase64" name="imgBase64" rows="25" cols="210"></textarea>
            </td>
          </tr>
        </tbody>
      </table>-->
      <!--<p>
                IMG64-><br />

              </p>
      -->


    </div>
    <!--style="display: none;"-->
    <img id="imgFiguraHumana" style="display: none;" src="~/../msiformatos/figuraHumana.png" alt="figuraHumana" height="200">
   

  </div>
</template>
<script>

  export default {
    name: 'trazosFiguraHumanaCmp',
    components: {

    },
    props: ['imgBase64Original'],
    data() {
      return {
        primeraVez: true,
        imgBase64: ''
      }
    },
    computed: {

    },
    watch: {

    },

    created() {


    },
    mounted() {

      let script = document.createElement('script');
      script.setAttribute('src', 'figuraHumana.js');
      document.head.appendChild(script);

    },

    methods: {
      dibujaFiguraHumana: function () {
        //console.log('img original: ', this.imgBase64Original)
        var f = document.getElementById("imgFiguraHumana");
        f.source = "data:image/png;base64," + this.imgBase64Original;
        var c = document.getElementById("pizarra");
        var ctx = c.getContext("2d");
        var img = document.getElementById("imgFiguraHumana");
        ctx.drawImage(img, 0, 0, 300, 300);
      },

      //muestraFiguraHumanaEnPizarra: function () {
      //  var c = document.getElementById("pizarra");
      //  var ctx = c.getContext("2d");
      //  var img = document.getElementById("scream");
      //  ctx.drawImage(img, 0, 0, 300, 300);
      //},
      getTrazosFiguraHumana() {
        var canvas = document.getElementById("pizarra");
        this.imgBase64 = canvas.toDataURL();
        var imageElement = document.getElementById("imagenCapturada");
        //if (!imageElement) {
        //  imageElement.src = this.imgBase64;
        //};
        this.imgBase64 = this.imgBase64.slice(this.imgBase64.indexOf(',') + 1);
        this.$emit('trazosCapturados', this.imgBase64);
        
      },
      limpiarTrazosFiguraHumana() {
        lineas = [];
        this.dibujaFiguraHumana();
        this.getTrazosFiguraHumana();
      },
      mouseLeavePizarra() {
        this.getTrazosFiguraHumana();
      },
      mouseOverPizarra() {
        if (this.primeraVez) {
          this.primeraVez = !this.primeraVez;
          this.dibujaFiguraHumana();
        }
      }
    }
  }

</script>
