<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-toolbar dark color="rgb(153, 74, 131)">
      <v-btn icon @click.stop="toggleDrawer">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-toolbar>

    <div class="location-content">
      <!-- There was an issue getting the geolocation of the browser -->
      <div v-if="geoError">{{ geoError }}</div>
      <!-- Geolocation is loading -->
      <div v-else-if="gettingLocation">Getting Location...</div>
      <!-- Successfully obtained user's country, try to navigate to worldometers -->
      <div v-else-if="country" class="covid-content">
        <h3 class="desc">View your country's COVID-19 status</h3>
        <v-btn
          class="button"
          dark
          color="rgb(246, 76, 114)"
          @click="navigateToURL"
        >
          Click Here
        </v-btn>
      </div>
      <!-- Last resort error reporting -->
      <div v-else>Can not obtain location.</div>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Drawer",
  props: {
    toggleDrawer: Function,
    drawer: Boolean,
    geoError: String,
    gettingLocation: Boolean,
    location: Object,
    country: String,
  },
  methods: {
    navigateToURL() {
      window.open(
        `https://www.worldometers.info/coronavirus/country/${this.country.toLowerCase()}`
      );
    },
  },
};
</script>

<style scoped>
.chevron-button {
  float: right;
  margin: 12px;
}
.desc {
  position: absolute;
  top: 25%;
  text-align: center;
  margin-left: 12px;
  margin-right: 12px;
}
.button {
  position: absolute;
  top: 50%;
  margin-left: 25%;
}
</style>
