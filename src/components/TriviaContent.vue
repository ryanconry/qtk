<template>
  <div class="hello">
      {{getContent}}
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: 'TriviaContent',
  props: {
    defaultText: String,
    apiRes: Object
  },
  computed: {
    getContent: function() {
      return _.isEmpty(this.apiRes) ? this.defaultText : this.apiRes
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>