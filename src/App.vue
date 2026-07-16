<template>
  <NavBar />
  <RouterView />
  <Footer />
</template>
<script setup>
//==================================
// Import
//==================================
import { ref } from "vue";
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";


</script>
