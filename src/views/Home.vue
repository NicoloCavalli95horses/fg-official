<template>
  <!-- Hero section -->
  <div class="w-100 h-100 flex-column"> <h1>Hero section</h1></div>

  <!-- Section -->
  <h3 :class="[ device == 'mobile' ? 'bottom-12' : 'bottom-36']">Section name</h3>
  <div class="separator" />

  <!-- Section -->
  <h3 :class="[ device == 'mobile' ? 'bottom-12' : 'bottom-36']">Section name</h3>
  <div class="separator" />

  <!-- Section -->
  <h3 :class="[ device == 'mobile' ? 'bottom-12' : 'bottom-36']">Section name</h3>
  <div class="separator" />

  <!-- Go back on top button -->
  <OnTopBtn />
</template>

<script setup>
//==============================
// Import
//==============================
import { getViewport } from "../utils/screen_size.js";
import OnTopBtn from "../components/OnTopBtn.vue";
// import { db } from "../../firebase/config";
// import { collection, getDocs } from "firebase/firestore";
// import { onMounted } from "vue";

//==============================
// Consts
//==============================
const device = getViewport();


//==============================
// Life cycle
//==============================
// onMounted(() => {
  // const col = collection(db, 'video');
  // getDocs( col )
    // .then( snapshot => {
      // console.log( snapshot.docs );
    // })
// })

</script>

<style lang="scss" scoped>
</style>
