<template>
  <div class="wrapper">
    <div :class="['logo', { 'c-margin' : show_info }]" @click="$router.push('/')">
      <h4>KG</h4>
    </div>
    <div v-if="show_info" class="top-12">
      <p class="c-text name">Francesco Gozzo</p>
      <p class="c-text">Art director and producer</p>
    </div>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
defineProps({
  show_info: Boolean,
})
</script>

<style lang="scss" scoped>
.wrapper {
  .logo {
    width: max-content;
    display: grid;
    place-content: center;
    user-select: none;
    background-color: black;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
}
.name {
  font-weight: bold;
  font-size: 1.6rem;
}
</style>