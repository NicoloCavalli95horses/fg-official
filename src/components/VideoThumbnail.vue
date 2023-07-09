<template>
  <img :src="item.url">
  <p>{{  item  }}</p>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { 
  onBeforeMount,
  reactive
} from 'vue'
import filters from '../utils/filters';


// ==============================
// Props
// ==============================
const props = defineProps({
  url: String
})

const item = reactive({
  title: '',
  year: -1,
  url: '',
  link: '',
  length: {},
});


// ==============================
// Functions
// ==============================

// ==============================
// Life cycle
// ==============================
onBeforeMount(() => {
  // Fetch general information about (title, publishedAt, ecc)
  fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${props.url}&key=AIzaSyApcFqDDN0iy1-gy1gD6zYB-biOqxiTcus`
  )
    .then((data) => data.json())
    .then((data) => {
      item.title = data.items[0].snippet.title;
      item.year = new Date(data.items[0].snippet.publishedAt).getFullYear();
      item.url = data.items[0].snippet.thumbnails.high.url;
      item.link = 'https://youtu.be/' + props.url;
    })

  // Fetch specific information (video length)
  fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${props.url}&part=contentDetails&key=AIzaSyApcFqDDN0iy1-gy1gD6zYB-biOqxiTcus`
  )
    .then((data) => data.json())
    .then((data) => {
      item.length = filters.mmss(data.items[0].contentDetails.duration)
    })
})
</script>

<style lang="scss" scoped></style>
