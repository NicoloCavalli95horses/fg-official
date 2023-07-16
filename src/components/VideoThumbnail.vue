<template>
  <a :href="item.href">
    <div :class="['thumb-wrapper', { 'bigger': bigger, 'opaque' : show_actions }]">
      <img :src="item.src" />
      <div class="c-text">
        <p>{{ filters.slice(item.title) }}</p>
        <p class="grey-text">{{ formatDuration }} ({{ item.year }})</p>
      </div>
      <template v-if="show_actions">
        <div class="btns">
          <Btn :def="true" @click="emit('edit', item)">
            <template #icon>
              <Icon icon="fa-solid fa-pencil" class="svg-18" />
            </template>
          </Btn>
          <Btn :def="true" class="top-12" @click="emit('delete', item)">
            <template #icon>
              <Icon icon="fa-solid fa-trash" class="svg-18" />
            </template>
          </Btn>
        </div>
      </template>
    </div>
  </a>
</template>

<script setup>
// ==============================
// Import
// ==============================
import {
  computed
} from 'vue'
import filters from '../utils/filters'
import Btn from '../components/Btn.vue'


// ==============================
// Props
// ==============================
const props = defineProps({
  item: Object, // title, year, srsc, href, duration
  bigger: Boolean,
  show_actions: Boolean,
})

const emit = defineEmits([
  "edit",
  "delete"
]);


const formatDuration = computed(() => `${props.item.duration.mm}:${props.item.duration.ss}`)
</script>

<style lang="scss" scoped>
.thumb-wrapper {
  display: inline-block;
  overflow: hidden;
  margin: 0 0.8rem;
  width: 45rem;
  cursor: pointer;
  position: relative;
  &.bigger {
    width: 65rem;
  }
  &.opaque img {
    filter: brightness(0.2);
  }
  img {
    width: 100%;
  }
  .btns {
    position: absolute;
    top: 25%;
    right: 2.2rem;
    transform: translate(0%, -50%);
  }
}
</style>
