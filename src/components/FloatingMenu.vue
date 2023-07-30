<template>
  <div class="menu-wrapper">
    <template v-for="opt in options" :key="opt">
      <span>
        <a :href="'#' + opt" :class="{ 'active' : active == opt }">
        {{ opt }}
        </a>
    </span>
    </template>
  </div>
</template>

<script setup>
//==============================
// Props
//==============================
defineProps({
  active: String,
  options: Array,
});


</script>

<style lang="scss" scoped>
.menu-wrapper {
  position: fixed;
  top: 50%;
  transform: translate(0, -50%);
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 10rem;
  span {
    a {
      font-size: 1.8rem;
      transition-duration: var(--transition-medium);
      text-transform: capitalize;
      &.active {
        color: var(--primary);
        transition-duration: var(--transition-medium);
      }
    }
    margin: 1rem;
  }
}
</style>
