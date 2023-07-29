<template>
  <div class="wrapper" :class="{ 'opaque': show_actions }">
    <!-- thumbnail -->
    <template v-if="error">
      <div :class="['error-box', { 'featured' : bigger }]" >
        <p>Fetching error</p>
      </div>
      <div class="c-text top-12">
        <p>Loading error</p>
      </div>
    </template>
    <template v-else>
      <a :href="item.href" :class="{ 'no-touch': show_actions }">
        <img :src="item.src" :class="{ 'featured': bigger }" @error="error = true" />
        <div class="c-text top-12">
          <p>{{ filters.slice(item.title) }}</p>
          <p class="grey-text">{{ formatDuration }} ({{ item.year }})</p>
        </div>
      </a>
    </template>
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
import {
  ref,
  computed,
} from 'vue';

import filters from '../utils/filters';
import Btn from '../components/Btn.vue';
import { getViewport } from '../utils/screen_size.js';


// ==============================
// Props
// ==============================
const props = defineProps({
  item: Object, // title, year, srsc, href, duration
  bigger: Boolean,
  show_actions: Boolean
});

const emit = defineEmits(['edit', 'delete']);
const device = getViewport();
const formatDuration = computed( () => `${props.item.duration.mm}:${props.item.duration.ss}`);
const sizes = computed( () => {
  return {
    default: {
      w: device.value == 'mobile' ? '24rem' : '40rem',
      h: device.value == 'mobile' ? '13rem' : '22.5rem',
    },
    big: {
      w: device.value == 'mobile' ? '24rem' : '60rem',
      h: device.value == 'mobile' ? '13rem' : '33.7rem',
    }
  };
});
const error = ref( false );

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
  .error-box {
    display: grid;
    place-content: center;
    width: v-bind('sizes.default.w');
    height: v-bind('sizes.default.h');
    border: 0.1rem solid var(--error-color);
    border-radius: var(--radius-s);
    &.featured {
      width: v-bind('sizes.big.w');
      height: v-bind('sizes.big.h');
    }
  }
  img {
    object-fit: cover;
    object-position: 50% 50%;
    box-sizing: border-box;
    width: v-bind('sizes.default.w');
    height: v-bind('sizes.default.h');
    &.featured {
      width: v-bind('sizes.big.w');
      height: v-bind('sizes.big.h');
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
