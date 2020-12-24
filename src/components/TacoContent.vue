<template>
  <div class="content-container">
    <div class="default-text" v-if="emptyResponse()">
      {{ defaultText }}
    </div>
    <div
      v-else
      class="content-item"
      v-for="(item, key) in apiRes"
      v-bind:key="key"
    >
      <h3>{{ formatHeading(key) }}</h3>
      <VueShowdown :markdown="item.recipe" />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "TacoContent",
  props: {
    defaultText: String,
    apiRes: Object,
  },
  data() {
    return {
      content: [],
    };
  },
  methods: {
    formatHeading: function (heading) {
      return _.startCase(heading.replace(/[_]+/g, " "));
    },
    emptyResponse: function () {
      return _.isEmpty(this.apiRes);
    },
  },
};
</script>

<style scoped lang="less">
.content-container {
  .content-item {
    margin-bottom: 48px;
  }
  h3 {
    margin-bottom: 8px;
  }
  p {
    white-space: pre-wrap;
  }

  :last-child {
    margin-bottom: 0px;
  }
}
</style>
