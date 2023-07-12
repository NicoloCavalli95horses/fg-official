<template>
  <!-- Hero section -->
  <VideoPreview v-if="main_video" :url="main_video.url" />

  <section class="body">
    <!-- Section -->
    <h3 :class="[device == 'mobile' ? 'bottom-12' : 'bottom-36']">Featured video</h3>
    <Carousel v-if="featured_video.length">
      <VideoThumbnail v-for="(video, i) in featured_video" :key="video.title + i" :item="video" :bigger="true" />
    </Carousel>
    <div class="separator" />

    <!-- Section -->
    <h3 :class="[device == 'mobile' ? 'bottom-12' : 'bottom-36']">Music video</h3>
    <Carousel v-if="featured_video.length">
      <VideoThumbnail v-for="(video, i) in featured_video" :key="video.title + i" :item="video" />
    </Carousel>
    <div class="separator" />

    <!-- Section -->
    <h3 :class="[device == 'mobile' ? 'bottom-12' : 'bottom-36']">Social</h3>
    <Carousel v-if="featured_video.length">
      <VideoThumbnail v-for="(video, i) in featured_video" :key="video.title + i" :item="video" />
    </Carousel>
    <div class="separator" />
  </section>

  <!-- Go back on top button -->
  <OnTopBtn />

  <!-- Login modal -->
  <Modal 
    v-if="show.login && device == 'desktop'"
    title="Login"
    max_width="40rem"
    max_height="35rem"
    :click_out_close="true"
    @closed="show.login = false"
  >

    <InputText label="Username" v-model="username" @reset="username = ''" />
    <InputText label="Password" v-model="password" :anonymize="true" @reset="password = ''" />
    <template #footer>
      <Btn text="conferma"></Btn>
    </template>
  </Modal>
</template>

<script setup>
//==============================
// Import
//==============================
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { getViewport } from '../utils/screen_size.js'
import { db } from '../../firebase/config'
import { getDocs, collection } from 'firebase/firestore'
import { apiGetYouTubeData } from '../utils/apis'

import Btn from '../components/Btn.vue'
import Modal from '../components/Modal.vue'
import InputText from '../components/InputText.vue'
import Carousel from '../components/Carousel.vue'
import OnTopBtn from '../components/OnTopBtn.vue'
import VideoPreview from '../components/VideoPreview.vue'
import VideoThumbnail from '../components/VideoThumbnail.vue'

//==============================
// Consts
//==============================
const device = getViewport()
const main_video = ref(null)
const featured_video = ref([])

const show = reactive({
  login: false,
})

const username = ref('');
const password = ref('');

// fake featured videos
const urls = ['rpAJV8znIps', 'rpAJV8znIps', 'rpAJV8znIps']

//==============================
// Functions
//==============================
async function loadFeaturedVideo() {
  for (const url of urls) {
    const data = await apiGetYouTubeData({ url })
    featured_video.value.push(data)
  }
}

//==============================
// Life cycle
//==============================

onBeforeMount(async () => {
  // main video id will be retrieved from the firebase database
  // consider exporting this in a utility function
  const col = collection(db, 'video')
  const response = await getDocs(col)
  response.docs.forEach((doc) => {
    main_video.value = { ...doc.data(), id: doc.id }
  })
})

onMounted(async () => {
  await loadFeaturedVideo()
})
</script>

<style lang="scss" scoped>
section.body {
  margin: 0 auto;
  padding: 0 4rem;
}
</style>
