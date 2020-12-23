<template>
  <v-app>
    <Navbar :toggleDrawer="toggleDrawer" />
    <div class="layout-container">
      <div class="header">
        <div class="text">
          <h1>Quarantine Time Killer</h1>
          <h3>How do you want to kill some time?</h3>
        </div>
        <img src="./assets/watch.png" />
      </div>
      <div class="cards">
        <QTKCard
          v-for="item in items"
          :key="item.type"
          :type="item.type"
          :buttonText="getButtonText(item)"
          :clickHandler="clickHandler"
          :image="item.image"
          :text="item.cardText"
        />
      </div>
      <div class="tabs-container">
        <template>
          <v-card>
            <v-tabs
              v-model="tab"
              dark
              color="rgb(255, 255, 255)"
              background-color="rgb(36, 37, 130)"
              grow
            >
              <v-tabs-slider color="white"></v-tabs-slider>

              <v-tab v-for="item in items" :key="item.type">
                {{ item.type }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in items" :key="item.type">
                <v-card flat>
                  <!-- Dynamic component rendering -->
                  <component
                    v-bind:is="item.responseComponent"
                    :apiRes="item.apiRes"
                    :defaultText="item.defaultText"
                  />
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </template>
      </div>
    </div>
    <Footer />
    <Drawer
      :drawer="drawer"
      :toggleDrawer="toggleDrawer"
      :geoError="geoError"
      :gettingLocation="gettingLocation"
      :location="location"
      :country="country"
    />
  </v-app>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import QTKCard from "./components/QTKCard";
import Navbar from "./components/Navbar";
import Drawer from "./components/Drawer";
import TacoImage from "./assets/taco.png";
import DrinkImage from "./assets/drink.png";
import GamesImage from "./assets/games.png";
import TacoContent from "./components/TacoContent";
import DrinkContent from "./components/DrinkContent";
import TriviaContent from "./components/TriviaContent";
import Footer from "./components/Footer"

export default {
  name: "App",
  components: {
    Navbar,
    QTKCard,
    Drawer,
    Footer
  },
  data: () => {
    return {
      res: "",
      TacoImage,
      DrinkImage,
      GamesImage,
      drawer: false,
      // Location Data
      geoError: "",
      gettingLocation: false,
      location: {},
      country: "",
      // Tab Data
      items: [
        {
          type: "tacos",
          buttonText: "Eat Tacos!",
          selectedButtonText: "Eat More Tacos!",
          defaultText: `Click 'Eat Tacos!' to get taco recipe`,
          apiUrl: "https://taco-randomizer.herokuapp.com/random/",
          apiRes: {},
          resPath: 'data',
          cardText: "Hungry?",
          image: TacoImage,
          responseComponent: TacoContent,
        },
        {
          type: "drinks",
          buttonText: "Let's Drink",
          selectedButtonText: "Let's Drink More!",
          defaultText: `Click 'Let's Drink' to get drink recipe`,
          apiUrl: "https://www.thecocktaildb.com/api/json/v1/1/random.php",
          apiRes: {},
          resPath: 'data.drinks[0]',
          cardText: "Thirsty?",
          image: DrinkImage,
          responseComponent: DrinkContent,
        },
        {
          type: "trivia",
          buttonText: "Play Trivia!",
          selectedButtonText: "Play More Trivia!",
          defaultText: `Click 'Play Trivia!' to start playing trivia!`,
          apiUrl: "https://opentdb.com/api.php?amount=1",
          apiRes: {},
          resPath: 'data.results[0]',
          cardText: "Bored?",
          image: GamesImage,
          responseComponent: TriviaContent,
        },
      ],
      tab: null,
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    getButtonText(item) {
      return _.isEmpty(item.apiRes) ? item.buttonText : item.selectedButtonText;
    },
    clickHandler(type) {
      const index = this.items.findIndex((item) => item.type === type);
      const {
        apiUrl,
        resPath
      } = this.items[index];
      
        axios
          .get(apiUrl)
          .then((res) => {
            this.items[index].apiRes = _.get(res, resPath);
            this.tab = index;
          });
    },
    getCountry() {
      const url = `https://us1.locationiq.com/v1/reverse.php?key=pk.4586049950357ccc9c06120ec4c87e02&lat=${this.location.lat}&lon=${this.location.long}&format=json`;
      axios.get(url).then((res) => {
        this.country =
          // worldometers does not have a standard endpoint for countries
          // ex. Canada is .../country/canada and US is .../country/us
          res.data.address.country_code === "us"
            ? res.data.address.country_code
            : res.data.address.country;
      });
    },
  },
  created() {
    // Check if browser geolocation is supported
    if (!("geolocation" in navigator)) {
      this.geoError = "Geolocation is not available.";
      return;
    }

    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.gettingLocation = false;
        this.location = {
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        };
        this.getCountry();
      },
      (err) => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(252, 252, 252);
  overflow: auto;
}
.layout-container {
  display: flex;
  flex-flow: column nowrap;
  padding: 0 16.665% 5%;
  margin-top: 66px;

  .header {
    display: flex;

    .text {
      margin-right: 64px;
      .title {
        font-size: 48px;
      }
      .sub-title {
        font-size: 24px;
      }
    }

    img {
      margin: auto;
      height: 128px;
      width: 128px;
    }
  }

  .cards {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 24px 0px;
  }
  .tabs-container {
    width: 100%;
    margin: auto;
  }
}

.content-container {
  padding: 16px;
}
.default-text {
  text-align: center;
}
</style>
