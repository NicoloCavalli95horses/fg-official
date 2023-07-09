<template>
  <!-- Hero section -->
  <VideoPreview v-if="video[0]" :url="video[0].url" />

  <section class="body">
    <!-- Section -->
    <h3 :class="[ device == 'mobile' ? 'bottom-12' : 'bottom-36']">Section name</h3>
    <div class="separator" />
    
    <!-- Section -->
    <h3 :class="[ device == 'mobile' ? 'bottom-12' : 'bottom-36']">Section name</h3>
    <div class="separator" />
    
    <!-- Section -->
    <h3 :class="[ device == 'mobile' ? 'bottom-12' : 'bottom-36']">Section name</h3>
    <div class="separator" />
  </section>

  <!-- Go back on top button -->
  <OnTopBtn />
</template>

<script setup>
//==============================
// Import
//==============================
import { 
  onMounted,
  ref
} from "vue";
import { 
  getViewport 
} from "../utils/screen_size.js";
import { 
  db
} from "../../firebase/config";
import { 
  getDocs,
  collection,
} from "firebase/firestore";

import OnTopBtn from "../components/OnTopBtn.vue";
import VideoPreview from "../components/VideoPreview.vue";


//==============================
// Consts
//==============================
const device = getViewport();
const video = ref([]);

//==============================
// Life cycle
//==============================
onMounted(() => {
  const col = collection(db, 'video');
  getDocs( col ).then( snapshot => {
    snapshot.docs.forEach( doc => {
      video.value.push( { ...doc.data(), id: doc.id } );
    })
  })
})

</script>

<style lang="scss" scoped>
section.body {
  margin: 0 auto;
  padding: 0 4rem;
}
</style>
