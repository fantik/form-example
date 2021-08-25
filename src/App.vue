<template>
  <div id="app">
    <FormBlock 
      :title="'Sign up'"
      :btnLabel="'Sign up'"
    />
  </div>
</template>

<script>
import FormBlock from './components/FormBlock.vue'

export default {
  name: 'App',
  components: {
    FormBlock
  }
}
</script>

<style lang="scss">
#app {
  background-color: $c-grey;
  padding: 100px;
}
</style>
