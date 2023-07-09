<template>
  <template v-if="!isLoaded">
    <LoadingSpinner />
  </template>
  <template v-else>
    <NavBar />
    <div :class="[ device == 'mobile' ?  'mobile-layout' : 'desktop-layout' ]">
      <RouterView />
    </div>
    <Footer />
  </template>
</template>
<script setup>
//==================================
// Import
//==================================
import { ref } from "vue";
import { getViewport } from "./utils/screen_size";
import { RouterView } from "vue-router";
import { onBeforeMount, onUnmounted, onMounted } from "vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";

import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

//==================================
// Const
//==================================
const isLoaded = ref( false );
const device = getViewport();
const timeout = ref( undefined );
const data = ref([]);

//==================================
// Function
//==================================
function onLoad() {
  timeout.value = setTimeout(() => {
    isLoaded.value = true;
    clearTimeout( timeout.value );
  }, 200);

}

//==================================
// Life cycle
//==================================
onMounted(() => {
  const col = collection(db, 'video');
  getDocs( col ).then( snapshot => {
    snapshot.docs.forEach( doc => {
      data.value.push( { ...doc.data(), id: doc.id } );
    })
    console.log( data.value );
  })
})
onBeforeMount(() => {
  window.addEventListener("load", onLoad);
});

onUnmounted(() => {
  window.removeEventListener("load", onLoad);
});
</script>

<style lang="scss" scoped>
.mobile-layout {
  padding: 0 2.3rem;
}
.desktop-layout {
  margin: 0 auto;
  padding: 0 2.3rem;
  max-width: 110rem;
}
</style>
