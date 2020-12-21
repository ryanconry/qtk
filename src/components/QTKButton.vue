<template>
  <div class="button-container">
    <v-btn dark color="rgb(246, 76, 114)" @click.stop="clickHandler(type)">
      {{buttonText}}
    </v-btn>

    <!-- <button @click="clickHandler(type)">
      <span class="button-text">{{ buttonText }}</span>
    </button> -->
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
.button-container {
  button {
    width: 200px;
    margin: 32px 32px;
    padding: 12px;
    border-radius: 4px;
    background-color: rgb(246, 76, 114);
    border: 0;
    outline: none;
    .button-text {
      color: white;
      font-weight: 600;
    }
    &:hover {
      cursor: pointer;
      box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
    }
  }
}
</style>