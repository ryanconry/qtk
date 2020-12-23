<template>
  <div class="content-container">
    <div class="default-text" v-if="emptyResponse()">
      {{ defaultText }}
    </div>
    <div v-else class="drink-content">
      <div class="drink-header">
        <h2 class="drink-title">{{ this.apiRes.strDrink }}</h2>
        <img class="drink-image" :src="this.apiRes.strDrinkThumb" />
      </div>
      <div class="drink-body">
        <h3> Glass type: </h3>
        <p>{{this.apiRes.strGlass}}</p>
        <h3> Ingredients: </h3>
        <ol>
          <li v-for="item in getIngredients()" :key="item.id">
          {{item.ingredient}} - {{item.measurement}}
        </li>
        </ol>
        <h3>Instructions: </h3>
        <p>{{this.apiRes.strInstructions}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "DrinkContent",
  data: function () {
    return {
      parsedData: {},
    };
  },
  props: {
    defaultText: String,
    apiRes: Object,
  },
  methods: {
    getIngredients: function () {
      const ingredients = [];
      const ingredientString = 'strIngredient';
      const measurementString = 'strMeasure';

      for(let i=1; i<16; i++){
        // Ingredients index starts at 1 and goes up to 15
        if(this.apiRes[`${ingredientString}${i}`]){
          ingredients.push({
            id: i,
            ingredient: this.apiRes[`${ingredientString}${i}`],
            measurement: this.apiRes[`${measurementString}${i}`]
            })
        }
        else {
          break;
        }
      }

      return ingredients;
    },
    emptyResponse: function () {
      return _.isEmpty(this.apiRes);
    },
  },
};
</script>

<style scoped lang="less">
.content-container {
  .drink-content {
    .drink-header {
      text-align: center;
      .drink-title {
        margin-bottom: 16px;
      }

      .drink-image {
        height: 256px;
        width: 256px;
        margin-bottom: 16px;
      }
    }
    .drink-body {
      h3 {
        margin-bottom: 4px;
      }
      ol {
        margin-bottom: 16px;
      }
    }
  }
}
</style>