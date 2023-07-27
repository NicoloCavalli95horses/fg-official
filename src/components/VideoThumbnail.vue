<template>
  <div class="wrapper" :class="{ opaque: show_actions }">
    <!-- thumbnail -->
    <a :href="item.href" :class="{ 'no-touch': show_actions }">
      <img :src="item.src" :class="{ 'featured': bigger }" />
      <div class="c-text top-12">
        <p>{{ filters.slice(item.title) }}</p>
        <p class="grey-text">{{ formatDuration }} ({{ item.year }})</p>
      </div>
    </a>
    <!-- actions -->
    <template v-if="show_actions">
      <div class="btns">
        <Btn :def="true" @click="emit('edit', item)">
          <template #icon>
            <Icon icon="fa-solid fa-pencil" class="svg-18" />
          </template>
        </Btn>
        <Btn :def="true" class="top-12" @click="emit('delete', item.firebase_id)">
          <template #icon>
            <Icon icon="fa-solid fa-trash" class="svg-18" />
          </template>
        </Btn>
      </div>
    </template>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { computed } from 'vue'
import filters from '../utils/filters'
import Btn from '../components/Btn.vue'

// ==============================
// Props
// ==============================
const props = defineProps({
  item: Object, // title, year, srsc, href, duration
  bigger: Boolean,
  show_actions: Boolean
})

const emit = defineEmits(['edit', 'delete'])

const formatDuration = computed(() => `${props.item.duration.mm}:${props.item.duration.ss}`)


</script>

<style lang="scss" scoped>
.wrapper {
  display: inline-block;
  overflow: hidden;
  margin: 0 0.8rem;
  cursor: pointer;
  position: relative;
  &.opaque img {
    filter: brightness(0.2);
  }
  img {
    object-fit: cover;
    object-position: 50% 50%;
    box-sizing: border-box;
    width: 40rem;
    height: 22.5rem;
    &.featured {
      width: 60rem;
      height: 33.7rem;
    }
  }
  .btns {
    position: absolute;
    top: 25%;
    right: 2.2rem;
    transform: translate(0%, -50%);
  }
}
</style>
