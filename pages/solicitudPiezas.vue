
<template>
  <div>
    <h2 class="text-primary text-center">{{tituloPagina}}</h2>
    <div>
      <trazosFiguraHumanaCmp></trazosFiguraHumanaCmp>
    </div>
  </div>


</template>
<script>
  import trazosFiguraHumanaCmp from '~/components/trazosFiguraHumanaCmp';
  export default {
    name: 'solicitudPiezas',
    components: {
      trazosFiguraHumanaCmp
    },
    data() {
      return {
        tituloPagina: 'SOLICITUD PIEZAS ANATOMOPATOLÓGICAS'
      }
    },
    mounted() {

      ;

    },

    created() {


      //this.sobreponer();
      // No hay sesion abierta, redirige a login
      if (this.$store.state.token === 'NONE') {
        this.$router.push({ name: 'login' })
      };
    },
    methods: {
      
    }
  };

</script>
