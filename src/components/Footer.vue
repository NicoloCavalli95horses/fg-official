<template>
  <footer>
  </footer>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { getViewport } from "../utils/screen_size";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";


// ==============================
// Consts
// ==============================
library.add( fas );
const device = getViewport();


</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  height: 30rem;
  background-color: var(--footer-bg);
}
</style>
