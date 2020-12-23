<template>
  <div class="content-container">
    <div class="default-text" v-if="emptyResponse()">
      {{ defaultText }}
    </div>
    <div v-else class="trivia-content">
      <h3>Category:</h3>
      <p>{{ startCaseText(this.apiRes.category) }}</p>
      <h3>Difficulty:</h3>
      <p>{{ startCaseText(this.apiRes.difficulty) }}</p>
      <h3>Question:</h3>
      <p>{{ decodeHTMLText(this.apiRes.question) }}</p>
      <div class="answer-container">
        <div v-if="apiRes.type === 'boolean'" class="answers">
          <v-btn
            class="answer-button"
            dark
            color="rgb(246, 76, 114)"
            @click.stop="checkBoolean('True')"
          >
            True
            <v-icon v-if="trueIsIncorrect" dark right>
              mdi-alpha-x-circle
            </v-icon>
            <v-icon v-if="trueIsCorrect" dark right>
              mdi-checkbox-marked-circle
            </v-icon>
          </v-btn>
          <v-btn
            class="answer-button"
            dark
            color="rgb(246, 76, 114)"
            @click.stop="checkBoolean('False')"
          >
            False
            <v-icon v-if="falseIsIncorrect" dark right>
              mdi-alpha-x-circle
            </v-icon>
            <v-icon v-if="falseIsCorrect" dark right>
              mdi-checkbox-marked-circle
            </v-icon>
          </v-btn>
        </div>
        <div v-else class="answers">
          <v-btn
            v-for="answer in mcAnswers"
            :key="answer"
            class="answer-button"
            dark
            color="rgb(246, 76, 114)"
            @click.stop="checkMultipleChoice(answer)"
          >
            {{ decodeHTMLText(answer) }}
            <v-icon v-if="incorrectMcAnswer === answer" dark right>
              mdi-alpha-x-circle
            </v-icon>
            <v-icon v-if="correctMcAnswer === answer" dark right>
              mdi-checkbox-marked-circle
            </v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

export default {
  name: "TriviaContent",
  data: () => {
    return {
      entities,
      isQuestionAnswered: false,
      // Boolean question data
      trueIsCorrect: null,
      trueIsIncorrect: null,
      falseIsCorrect: null,
      falseIsIncorrect: null,
      // Multiple Choice question data,
      mcAnswers: [],
      correctMcAnswer: "",
      incorrectMcAnswer: "",
    };
  },
  props: {
    defaultText: String,
    apiRes: Object,
  },
  methods: {
    emptyResponse: function () {
      return _.isEmpty(this.apiRes);
    },
    startCaseText: function (text) {
      return _.startCase(text);
    },
    decodeHTMLText: function (text) {
      // Questions come with HTML encoded characters
      return this.entities.decode(text);
    },
    checkBoolean: function (answer) {
      // Answer can only be submitted once
      if (this.isQuestionAnswered) return;
      this.isQuestionAnswered = true;
      if (answer === this.apiRes.correct_answer) {
        if (answer === "True") {
          this.trueIsCorrect = true;
        } else {
          this.falseIsCorrect = true;
        }
      } else {
        // Answer is incorrect
        if (answer === "True") {
          this.trueIsIncorrect = true;
          this.falseIsCorrect = true;
        } else {
          this.falseIsIncorrect = true;
          this.trueIsCorrect = true;
        }
      }
    },
    checkMultipleChoice: function (answer) {
      // Answer can only be submitted once
      if (this.isQuestionAnswered) return;
      this.isQuestionAnswered = true;
      // Always report to the user the correct answer
      this.correctMcAnswer = this.apiRes.correct_answer;
      if (this.apiRes.incorrect_answers.includes(answer)) {
        // Report to the user if they selected the wrong answer
        this.incorrectMcAnswer = answer;
      }
    },
  },
  watch: {
    apiRes: {
      immediate: true,
      handler() {
        // Reset when new question is provided
        this.isQuestionAnswered = false;
        this.trueIsCorrect = null;
        this.trueIsIncorrect = null;
        this.falseIsCorrect = null;
        this.falseIsIncorrect = null;
        this.correctMcAnswer = "";
        this.incorrectMcAnswer = "";

        if (this.apiRes.type === "multiple") {
          const answers = [
            this.apiRes.correct_answer,
            ...this.apiRes.incorrect_answers,
          ];
          // Randomize answers array using Durstenfeld shuffle
          // https://stackoverflow.com/a/12646864
          for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
          }
          this.mcAnswers = answers;
        }
      },
    },
  },
};
</script>

<style scoped lang="less">
.answer-container {
  margin: 24px 0;

  .answers {
    padding: 0 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .answer-button {
      margin: 12px 0;
    }
  }
}
</style>