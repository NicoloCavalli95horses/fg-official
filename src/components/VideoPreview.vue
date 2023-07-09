<template>
  <a :href="EXT_LINK">
    <div class="wrapper">
      <iframe
        :width="width"
        :height="height"
        :src="YT_BASE_URL + props.url + QUERY + props.url"
        :allow="ALLOW"
        allowfullscreen
        frameborder="0"
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
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'


// ========================
// Props and consts
// ========================
const props = defineProps({
  url: String
})

const OFFSET = 10;
const YT_BASE_URL = 'https://www.youtube.com/embed/';
const EXT_LINK = 'https://youtu.be/' + props.url;
const ALLOW = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
const QUERY = '?autoplay=1&mute=1&loop=1&controls=0&playsinline=0&autohide=0&fs=0&rel=0&showinfo=0&end=35&disablekb=0&playlist=';


// ========================
// Vars
// ========================
const width = ref(window.innerWidth - OFFSET);
const height = ref(window.innerHeight - OFFSET);


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

<style lang="scss">
.wrapper {
  overflow: hidden;
  iframe {
    min-width: 100%;
    min-height: 100%;
    pointer-events: none;
  }
}
</style>
