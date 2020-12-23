<template>
  <div>
    <v-btn dark color="rgb(246, 76, 114)" @click.stop="clickHandler(type)">
      {{ buttonText }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "QTKButton",
  props: {
    buttonText: String,
    type: String,
    clickHandler: Function,
  },
};
</script>

<style scoped lang="less">
button {
  width: 200px;
  margin: 32px 32px;
}
</style>