<template>
  <footer>
    <Logo />
    <div class="social">
      <Icon icon="fa-brands fa-youtube" />
      <Icon icon="fa-brands fa-facebook" />
      <Icon icon="fa-brands fa-instagram" />
    </div>
  </footer>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { getViewport } from "../utils/screen_size";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faYoutube, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import Logo from './Logo.vue'

// ==============================
// Consts
// ==============================
library.add( faYoutube, faFacebook, faInstagram );
const device = getViewport();


</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--footer-bg);
  .social {
    margin-top: 2rem;
    width: 20rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    svg {
      width: 3rem;
      height: 3rem;
    }
  }
}
</style>
