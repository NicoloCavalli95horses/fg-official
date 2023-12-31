<template>
  <div :class="['main-wrapper', { 'mobile-padding' : device == 'mobile' }]">
    <div
      ref="scrollable_content"
      class="scroller-wrapper"
      :style="{ 'width': width || '100%' }"
      @mouseenter="isOvering = true"
      @mouseleave="isOvering = false"
    >
      <slot />
  </div>

    <!-- arrows -->
    <template v-if="device == 'desktop' && show_arrows">
      <Btn
        :class="['left', isOvering || isActive.left ? 'show' : 'hide']"
        @mouseenter="isActive.left = true"
        @mouseleave="isActive.left = false"
        @click="scroll({ left: true })"
      >
        <template #icon>
          <Icon icon="fa-solid fa-chevron-left" class="svg-18" />
        </template>
      </Btn>
      <Btn
        :class="['right', isOvering || isActive.right ? 'show' : 'hide']"
        @mouseenter="isActive.right = true"
        @mouseleave="isActive.right = false"
        @click="scroll({ right: true})"
      >
        <template #icon>
          <Icon icon="fa-solid fa-chevron-right" class="svg-18" />
        </template>
      </Btn>
    </template>    
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { 
  ref,
  reactive,
} from 'vue';

import Btn from './Btn.vue';
import { getViewport } from '../utils/screen_size.js';


// ==============================
// Props
// ==============================
const props = defineProps({
  width: String,
  show_arrows: Boolean,
  step: Number, // force the scrolling step
});

const device = getViewport();
const isOvering = ref( false );
const isActive = reactive({
  left: false,
  right: false,
});
const item = reactive({
  width: 0,
})

const scrollable_content = ref( undefined );


// ==============================
// Functions
// ==============================
function scroll({ left, right }) {
  getChildWidth();
  if ( props.step ) {
    const val = right ? props.step : left ? -props.step : null;
    scrollable_content.value.scrollLeft += val;
    console.log( scrollable_content.value.scrollLeft );
  } else {
    const val = right ? item.width : left ? -item.width : null;
    scrollable_content.value.scrollLeft += val;
  }
}

function getChildWidth(){
  if ( item.width ) { return; }
  const node = scrollable_content.value?.firstElementChild;
  const margins = parseInt( getComputedStyle(node).marginLeft ) + parseInt( getComputedStyle(node).marginRight );
  item.width = node.offsetWidth + margins;
}


</script>

<style lang="scss" scoped>

.main-wrapper {
  position: relative;
  &.mobile-padding {
    padding-left: 4rem;
  }
  .scroller-wrapper {
    text-align: center;
    overflow: auto;
    white-space: nowrap;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
 .left, .right {
   position: absolute;
   top: 50%;
   transform: translate(0%, -100%);
   background-color: var(--primary-05);
   transition-duration: var(--transition-medium);
   &.show {
     opacity: 1;
     transition-duration: var(--transition-medium);
   }
   &.hide {
    opacity: 0;
    transition-duration: var(--transition-medium);
   }
 }
 .left {
   left: 1.2rem;
 }
 .right {
   right: 1.2rem;
 }
}

</style>
