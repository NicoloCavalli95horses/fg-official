<template>
  <div class="logo" @click="$router.push('/')">
    <h4>KG</h4>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.logo {
  width: max-content;
  display: grid;
  place-content: center;
  user-select: none;
  background-color: black;
  border-radius: 50%;
  width: 8rem;
  height: 8rem;
}
</style>