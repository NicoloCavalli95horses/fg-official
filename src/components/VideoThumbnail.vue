<template></template>

<script setup>
// ==============================
// Import
// ==============================
import { onBeforeMount } from 'vue'

// ==============================
// Props, const
// ==============================
const props = defineProps({
  url: String
})

onBeforeMount(() => {
  console.log( props.url );
  // Fetch general information about (title, publishedAt, ecc)
  fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${props.url}&key=AIzaSyApcFqDDN0iy1-gy1gD6zYB-biOqxiTcus`
  )
    .then((data) => data.json())
    .then((data) => {
      console.log(data)
      // title.value[index] = data.items[0].snippet.title
      // publishedAt.value[index] = filter.timestamp(data.items[0].snippet.publishedAt)
      // thumbnail.value[index] = data.items[0].snippet.thumbnails.high.url
      // externalLink.value[index] = 'https://youtu.be/' + id.url
    })

  // Fetch specific information (video length)
  fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${props.url}&part=contentDetails&key=AIzaSyApcFqDDN0iy1-gy1gD6zYB-biOqxiTcus`
  )
    .then((data) => data.json())
    .then((data) => {
      console.log( data )
      // videoLength.value[index] = filter.videoLength(data.items[0].contentDetails.duration)
    })
})
</script>

<style lang="scss" scoped></style>
