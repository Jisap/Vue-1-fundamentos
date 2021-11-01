<template>
  <div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <Counter title="Entraron"/> -->
    <!-- <Counter :start="15"/>: equivale a v-bind y esto permite enlazar una variable de Vue con un atributo específico de una etiqueta HTML. -->
  
    <Indecision />
  
  </div>
</template>

<script>
//import Counter from './components/Counter.vue'
import Indecision from './components/Indecision.vue'


export default {
  name: 'App',
  components: {
    //Counter,
    Indecision
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
