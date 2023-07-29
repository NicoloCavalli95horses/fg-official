<template>
    <LoadingSpinner v-if="!is_loaded" />
    <NavBar />
    <RouterView @loaded="is_loaded = true" />
    <Footer />
</template>
<script setup>
//==================================
// Import
//==================================
import { ref } from "vue";
import { RouterView } from "vue-router";
import LoadingSpinner from "./components/LoadingSpinner.vue";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";


//==================================
// Const
//==================================
const is_loaded = ref( false );


</script>
