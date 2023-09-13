<template>
  <div class="wrapper">
    <h3 class="bottom-12 c-text">404 not found</h3>
    <p class="bottom-24 c-text">Questa pagina non esiste o non è al momento raggiungibile.</p>
    <div class="flex-center">
      <Btn text="homepage" :def="true" @click="$router.push('/')" />
    </div>
  </div>
</template>

<script setup>
//==============================
// Import
//==============================
import { onMounted } from "vue";
import Btn from "../components/Btn.vue";

const emit = defineEmits(['loaded']);

// ==============================
// Life cycle
// ==============================
onMounted(() => emit('loaded'));

</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  place-content: center;
  width: 100%;
  height: 100vh;
  h3 {
    text-transform: uppercase;
  }
}
</style>
