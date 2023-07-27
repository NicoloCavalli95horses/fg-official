<template>
  <template v-if="!isLoaded">
    <LoadingSpinner />
  </template>
  <template v-else>
    <NavBar />
    <RouterView />
    <Footer />
  </template>
</template>
<script setup>
//==================================
// Import
//==================================
import { ref } from "vue";
import { RouterView } from "vue-router";
import { 
  onBeforeMount,
  onUnmounted
} from "vue";

import LoadingSpinner from "./components/LoadingSpinner.vue";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";


//==================================
// Const
//==================================
const isLoaded = ref( false );
const timeout = ref( undefined );


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
onBeforeMount(() => {
  window.addEventListener("load", onLoad);
});

onUnmounted(() => {
  window.removeEventListener("load", onLoad);
});
</script>
