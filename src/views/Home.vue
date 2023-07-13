<template>
  <!-- Hero section -->
  <div class="preview-wrapper">
    <VideoPreview
      v-if="main_video"
      :url="main_video.url"
      :can_edit="is_logged"
    />
    <div v-if="is_logged" class="btn-layer">
      <div class="btn">
        <Btn :def="true" text="modifica" @click="() => { show.edit = true; edit_type = MAIN_VIDEO; }">
          <template #icon>
            <Icon icon="fa-solid fa-pencil" class="svg-18 l-12" />
          </template>
        </Btn>
      </div>
    </div>
  </div>

  <section class="body">
    <!-- Section -->
    <h3 :class="[device == 'mobile' ? 'bottom-12' : 'bottom-36']">Featured video</h3>
    <Carousel v-if="featured_video.length">
      <VideoThumbnail
        v-for="(video, i) in featured_video"
        :key="video.title + i"
        :item="video"
        :bigger="true"
        :edit="is_logged"
      />
    </Carousel>
    <div class="separator" />

    <!-- Section -->
    <h3 :class="[device == 'mobile' ? 'bottom-12' : 'bottom-36']">Music video</h3>
    <Carousel v-if="featured_video.length">
      <!-- <VideoThumbnail v-for="(video, i) in featured_video" :key="video.title + i" :item="video" /> -->
    </Carousel>
    <div class="separator" />

    <!-- Section -->
    <h3 :class="[device == 'mobile' ? 'bottom-12' : 'bottom-36']">Social</h3>
    <Carousel v-if="featured_video.length">
      <!-- <VideoThumbnail v-for="(video, i) in featured_video" :key="video.title + i" :item="video" /> -->
    </Carousel>
    <div class="separator" />
  </section>

  <!-- Go back on top button -->
  <OnTopBtn />

  <!-- Login modal -->
  <Modal 
    v-if="show.login && device != 'mobile'"
    title="Login"
    max_width="40rem"
    max_height="38rem"
    :click_out_close="true"
    @closed="show.login = false"
  >

    <InputText label="Email" v-model="email" @reset="email = ''" />
    <InputText label="Password" v-model="password" :anonymize="true" @reset="password = ''" />
    <p class="error top-12" v-if="error">Wrong email or password</p>
    <template #footer>
      <Btn text="conferma" @click="onSubmit"></Btn>
    </template>
  </Modal>

  <!-- Edit modal -->
  <Modal
    v-if="show.edit && device != 'mobile'"
    :title="'Modifica ' + getEditLabel"
    max_width="50rem"
    min_width="50rem"
    max_height="38rem"
    :click_out_close="true"
    @closed="show.edit = false"
  >
    <InputText label="Video ID" v-model="edit_url" placeholder="Incollare qui video ID" @reset="edit_url = ''" />
    <template #footer>
      <Btn text="conferma" @click="onConfirmEdit"></Btn>
    </template>
  </Modal>

  <KeyboardShortcut
    :keys="['k']"
    :modifiers="['Control', 'Alt']"
    @keydown="show.login = true"
  />
</template>

<script setup>
//==============================
// Import
//==============================
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue'
import { getViewport } from '../utils/screen_size.js'
import { db } from '../../firebase/config'
import { getDocs, doc, collection, updateDoc } from 'firebase/firestore'
import { apiGetYouTubeData } from '../utils/apis'
import useLogin from '../../firebase/useLogin'

import Btn from '../components/Btn.vue'
import Modal from '../components/Modal.vue'
import InputText from '../components/InputText.vue'
import Carousel from '../components/Carousel.vue'
import OnTopBtn from '../components/OnTopBtn.vue'
import VideoPreview from '../components/VideoPreview.vue'
import VideoThumbnail from '../components/VideoThumbnail.vue'
import KeyboardShortcut from '../components/KeyboardShortcut.vue'

//==============================
// Consts
//==============================
const MAIN_VIDEO = 'main_video';
const FEATURED_VIDEO = 'featured_video';

//==============================
// Consts
//==============================
const device = getViewport();
const main_video = ref( null );
const featured_video = ref( [] );
const is_logged = ref( false );
const edit_type = ref( '' );
const edit_url = ref( '' );

const show = reactive({
  login: false,
})

const email = ref('');
const password = ref('');

// fake featured videos
const urls = ['rpAJV8znIps', 'rpAJV8znIps', 'rpAJV8znIps']

const { login, error } = useLogin();

const getEditLabel = computed( () => {
  let str = '';
  if ( edit_type.value == MAIN_VIDEO ) {
    str = 'video principale';
  } else if ( edit_type.value == FEATURED_VIDEO ) {
    str = 'featured video';
  }
  return str;
});
//==============================
// Functions
//==============================
async function loadFeaturedVideo() {
  for (const url of urls) {
    const data = await apiGetYouTubeData({ url })
    featured_video.value.push(data)
  }
}

async function onSubmit() {
  await login( email.value, password.value );
  if (!error.value) {
    is_logged.value = true;
    show.login = false;
  }
  email.value = '';
  password.value = '';
}

async function onConfirmEdit(){
  const main_video_col = doc(db, 'video/mainVideo');
  await updateDoc(main_video_col, { url: edit_url.value })

  const col = collection(db, 'video')
  const response = await getDocs(col)
  response.docs.forEach((doc) => {
    main_video.value = { ...doc.data(), id: doc.id }
  })

  show.edit = false;
  edit_url.value = '';
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

.preview-wrapper {
  position: relative;
  .btn-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);

    .btn {
      position: absolute;
      top: 75%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
}
</style>
