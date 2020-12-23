<template>
  <v-toolbar dark color="rgb(36, 37, 130)">
    <v-spacer></v-spacer>
    <v-icon class="footer-icon" @click.stop="openLinkedIn">mdi-linkedin</v-icon>
    <v-icon class="footer-icon" @click.stop="openGithub">mdi-github</v-icon>
  </v-toolbar>
</template>

<script>
export default {
  name: "Footer",
  methods: {
      openLinkedIn: function() {
          window.open('https://www.linkedin.com/in/ryan-conry-bb98a715a/');
      },
      openGithub: function() {
          window.open('https://github.com/ryanconry');
      }
  }
};
</script>

<style scoped lang="less">
.footer-icon {
    margin: 0 4px
}
</style>
