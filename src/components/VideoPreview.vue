<template>
  <a :href="href">
    <div class="wrapper">
      <div v-if="!loaded" class="placeholder"></div>

      <iframe
        :class="{ 'visible': loaded }"
        :width="width"
        :height="height"
        :src="src"
        :allow="ALLOW"
        allowfullscreen
        frameborder="0"
        @load="loaded = true"
      />
    </div>
  </a>
</template>

<script setup>
// ========================
// Import
// ========================
import {
  ref,
  computed,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'


// ========================
// Props and consts
// ========================
const props = defineProps({
  id: String
});

const OFFSET = 10;
const YT_BASE_URL = 'https://www.youtube.com/embed/';
const ALLOW = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
const QUERY = '?autoplay=1&mute=1&loop=1&controls=0&playsinline=0&autohide=0&fs=0&rel=0&showinfo=0&end=35&disablekb=0&playlist=';


const loaded = ref(false);
const width = ref( window.innerWidth - OFFSET );
const height = ref( window.innerHeight - OFFSET );

const href = computed(() => `https://youtu.be/${props.id}`);
const src = computed(() => `${YT_BASE_URL}${props.id}${QUERY}${props.id}`);

// ========================
// Functions
// ========================
function onWindowResize(){
  width.value = window.innerWidth - OFFSET;
  height.value = window.innerHeight - OFFSET;
}


// ========================
// Life cycle
// ========================
onBeforeMount(() => {
  window.addEventListener('resize', onWindowResize);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
})


</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  overflow: hidden;
  background: #111;
}

iframe {
  min-width: 100%;
  min-height: 100%;
  pointer-events: none;
  opacity: 0;
  transition: opacity .3s ease;
}

iframe.visible {
  opacity: 1;
}
</style>
