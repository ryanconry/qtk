<template>
  <v-toolbar dark color="rgb(36, 37, 130)">
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
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
</style>