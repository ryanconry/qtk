<template>
  <v-toolbar dark color="rgb(36, 37, 130)">
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title></v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    toggleDrawer: Function,
  },
};
</script>

<style scoped lang="less">
.location-content {
  margin-right: 24px;

  .covid-content {
    display: flex;
    align-items: center;

    .desc {
      font-size: 16px;
    }

    .button {
      margin-left: 12px;
      background-color: rgb(153, 74, 131);
      color: white;
      border: none;
      border-radius: 2px;
      padding: 0 4px;
      &:hover {
        cursor: pointer;
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>