<template>
  <footer>
    <!-- logo and contact details -->
    <section class="logo">
      <div class="logo-wrapper">
        <Logo :show_info="true" />
      </div>
      <div :class="['info', { 'top-24': device != 'desktop' }]">
        <div class="info-row">
          <Icon class="mini-icon" icon="fa-solid fa-envelope" />
          <p>gozzofrancesco@gmail.com</p>
        </div>
        <div class="info-row">
          <Icon class="mini-icon" icon="fa-solid fa-phone" />
          <p>+3489357118</p>
        </div>
        <div class="info-row">
          <Icon class="mini-icon" icon="fa-solid fa-address-card" />
          <p>P.IVA: 04508650274</p>
        </div>
        <div class="info-row">
          <Icon class="mini-icon" icon="fa-solid fa-location-pin" />
          <p>Mira(VE) 30034</p>
        </div>
      </div>
    </section>

    <!-- social network -->
    <section class="social">
      <a href="https://www.facebook.com/fgozzo1">
        <Icon icon="fa-brands fa-facebook" />
      </a>
      <a href="https://www.youtube.com/channel/UC-lmsrehL8zl0B6uoqHz-xw">
        <Icon icon="fa-brands fa-youtube" />
      </a>
      <a href="https://www.instagram.com/kg_creator/">
        <Icon icon="fa-brands fa-instagram" />
      </a>
    </section>

    <!-- sign -->
    <span class="sign">Nicolò Cavalli  &copy; {{ new Date().getFullYear() }}</span>
  </footer>
</template>

<script setup>
// ==============================
// Import
// ==============================
import {
  faYoutube,
  faFacebook,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { getViewport } from '../utils/screen_size'
import Logo from './Logo.vue'


// ==============================
// Consts
// ==============================
library.add(faYoutube, faFacebook, faInstagram);
const device = getViewport();


</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--footer-bg);
  padding: 0 0 10rem 0;
  section.logo {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 0.1rem solid rgba(255, 255, 255, 0.1);
    margin: 3rem 0;
    padding: 4.5rem 0;
    justify-content: center;
    .logo-wrapper {
      width: 50%;
      flex-basis: 30rem;
      min-width: 20rem;
      display: grid;
      place-content: center;
    }
    .info {
      width: 50%;
      flex-basis: 30rem;
      min-width: 20rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .info-row {
        display: flex;
        align-items: center;
        padding: 0.1rem;
      }
      .mini-icon {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 1.2rem;
      }
    }
  }
  section.social {
    margin-top: 2rem;
    width: 20rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    svg {
      width: 2.5rem;
      height: 2.5rem;
      padding: 1.2rem;
      border: 0.1rem solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
    }
  }
}

span.sign {
  padding-top: 4rem;
  font-size: 0.8rem;
}
</style>
