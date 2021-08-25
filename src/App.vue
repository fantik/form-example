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
  },

  async mounted () {

    const hasHover = window.matchMedia('(hover: hover)').matches
    if (hasHover) {
      document.documentElement.classList.add('has-hover')
    }
  },
}
</script>

<style lang="scss">
#app {
  background-color: $c-grey;
  padding: 100px;
}
</style>
