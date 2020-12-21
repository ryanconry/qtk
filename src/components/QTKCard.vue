<template>
  <div class="card-container">
      <img v-bind:src="image"/>
      <h3>{{text}}</h3>
    <QTKButton
      :type="type"
      :buttonText="buttonText"
      :clickHandler="clickHandler"
    />
  </div>
</template>

<script>
import QTKButton from "./QTKButton";
export default {
  name: "QTKCard",
  components: {
    QTKButton,
  },
  props: {
    buttonText: String,
    type: String,
    clickHandler: Function,
    image: String,
    text: String,
  },
};
</script>

<style scoped lang="less">
.card-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  height: 384px;
  width: 256px;
  border: 4px solid rgb(36, 37, 130);
  border-radius: 8px;

  img {
    height: 128px;
    margin: auto;
  }
}
</style>