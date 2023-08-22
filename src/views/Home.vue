<template>
  <!-- Hero section -->
  <div class="preview-wrapper">
    <VideoPreview v-if="main_video" :id="main_video?.url" @loaded="emit('loaded')" />
    <div v-if="is_logged" class="btn-layer">
      <div class="btn">
        <Btn :def="true" text="modifica" @click="onEditMain">
          <template #icon>
            <Icon icon="fa-solid fa-pencil" class="svg-18 l-12" />
          </template>
        </Btn>
      </div>
    </div>
  </div>

  <Separator />

  <section
    :class="['body', { 'max-width padded' : device != 'mobile' }]"
    :style="{ 'padding' : device == 'desktop' ? '0 12rem' : device == 'tablet' ? '0 4rem' : '0'}"
  >
    <!-- Video section -->
    <template v-for="(video, category) in all_video" :key="category">
      <h3 :class="['capitalize', { 'padded' : device == 'mobile' }]" id="video"> {{ category }} </h3>
      <Carousel class="top-24" :show_arrows="true">
        <div v-if="is_logged" :class="['placeholder-card', { bigger: category == 'featured' }]">
          <Btn :def="true" text="aggiungi" class="add-btn" @click="onAddVideo({ category })">
            <template #icon>
              <Icon icon="fa-solid fa-plus" class="svg-18 l-12" />
            </template>
          </Btn>
        </div>
        <template v-if="video.length">
          <VideoThumbnail
            v-for="(v, i) in video"
            :key="v.title + i"
            :item="v"
            :bigger="category == FEATURED"
            :show_actions="is_logged"
            @delete="(firebase_id) => onVideoDelete({ category: category, id: firebase_id })"
            @edit="(item) => onVideoUpdate({category: category, yt_id: item.yt_id, firebase_id: item.firebase_id })"
          />
        </template>
      </Carousel>
      <Separator />
    </template>
    
    <!-- About section -->
    <h3 id="about" :class="{ 'padded' : device == 'mobile' }">About me</h3>
    <Carousel class="top-24" :show_arrows="true">
      <Timeline :events="events" :reverse="true" />
    </Carousel>
    <Separator />

    <!-- Music section -->
    <h3 id="music" :class="{ 'padded' : device == 'mobile' }">Original compositions</h3>
    <Carousel class="top-24">
      <MusicPreview
        v-for="(src, i) in iframes_src"
        :key="src"
        :src="src"
        :class="{ 'l-12': i > 0 }"
      />
    </Carousel>
    <Separator v-if="device != 'mobile'" />
    
    <!-- Contact section -->
    <h3 id="contact" :class="{ 'padded' : device == 'mobile' }">Contact me</h3>
    <ContactForm :class="{ 'padded' : device == 'mobile' }" />
    <Separator />
    <Separator />
  </section>

  <!-- Go back on top button -->
  <OnTopBtn v-show="device != 'mobile'" />

  <!-- Login modal -->
  <Modal
    v-if="show.login && device != 'mobile'"
    title="Login"
    max_width="40rem"
    max_height="38rem"
    :click_out_close="true"
    @closed="show.login = false"
  >
    <form>
      <InputText
        label="Email"
        v-model="email"
        placeholder="example@gmail.com"
        @reset="email = ''"
      />
      <InputText
        label="Password"
        v-model="password"
        placeholder="password"
        :anonymize="true"
        @reset="password = ''"
      />
      <p class="error top-12" v-if="error">{{ error }}</p>
    </form>
    <template #footer>
      <Btn text="chiudi" @click="show.login = false" />
      <Btn :def="true" text="conferma" @click="onLogin" />
    </template>
  </Modal>

  <!-- Edit modal -->
  <Modal
    v-if="show.edit && device != 'mobile'"
    title="Modifica"
    max_width="50rem"
    min_width="50rem"
    max_height="30rem"
    :click_out_close="true"
    @closed="show.edit = false"
  >
    <InputText
      label="Video ID"
      v-model="edit_yt_id"
      placeholder="Incollare qui video ID"
      @reset="edit_yt_id = ''"
    />
    <p class="error top-12" v-if="error">{{ error }}</p>
    <template #footer>
      <Btn text="chiudi" @click="show.edit = false" />
      <Btn text="conferma" :def="true" @click="onConfirmEdit" />
    </template>
  </Modal>

  <!-- Add new modal -->
  <Modal
    v-if="show.add && device != 'mobile'"
    title="Aggiungi video"
    max_width="50rem"
    min_width="50rem"
    max_height="30rem"
    :click_out_close="true"
    @closed="show.add = false"
  >
    <InputText
      label="Video ID"
      v-model="edit_yt_id"
      placeholder="Incollare qui video ID"
      @reset="edit_yt_id = ''"
    />
    <p class="error top-12" v-if="error">{{ error }}</p>
    <template #footer>
      <Btn text="chiudi" @click="show.add = false" />
      <Btn text="conferma" :def="true" @click="onConfirmAdd" />
    </template>
  </Modal>

  <KeyboardShortcut
    :modifiers="['Control', 'Alt']"
    :keys="['k']"
    @keydown="show.login = true"
  />
</template>

<script setup>
//==============================
// Import
//==============================
import {
  ref,
  reactive,
  onBeforeMount,
} from 'vue';
import {
  login,
  addItem,
  getItem,
  updateItem,
  deleteItem,
} from '../../firebase/utils';

import { getViewport } from '../utils/screen_size.js';
import { apiGetYouTubeData } from '../utils/apis';

import Btn from '../components/Btn.vue';
import Modal from '../components/Modal.vue';
import Timeline from '../components/Timeline.vue';
import Carousel from '../components/Carousel.vue';
import OnTopBtn from '../components/OnTopBtn.vue';
import InputText from '../components/InputText.vue';
import Separator from '../components/Separator.vue';
import ContactForm from '../components/ContactForm.vue';
import VideoPreview from '../components/VideoPreview.vue';
import MusicPreview from '../components/MusicPreview.vue';
import VideoThumbnail from '../components/VideoThumbnail.vue';
import KeyboardShortcut from '../components/KeyboardShortcut.vue';


//==============================
// Props and emits
//==============================
const emit = defineEmits([
  'loaded'
]);

//==============================
// Consts
//==============================
const MAIN_VIDEO = 'main';
const FEATURED = 'featured';

//==============================
// Vars
//==============================
const device = getViewport();
const main_video = ref( null );
const is_logged = ref( false );
const edit_type = ref( '' );
const edit_yt_id = ref( '' );
const edit_firebase_id = ref( '' );
const email = ref( '' );
const password = ref( '' );
const error = ref( false );
const events = [
  {
    year: 2011,
    title: 'Corso ENAIP',
    content: 'Conseguito corso di Tecnico Multimediale audio-video ENAIP',
    icon: 'fa-solid fa-school'
  },
  {
    year: 2011,
    title: 'Majestic Studio',
    content: 'Stage formativo presso Majestic Studio',
    icon: 'fa-solid fa-school'
  },
  {
    year: 2014,
    title: 'Teodasia tra i 10 migliori brani',
    content: "Teodasia classificato tra i primi 10 migliori brani di Cristina D'Avena",
    icon: 'fa-solid fa-music'
  },
  {
    year: 2015,
    title: 'Composizione musica da film SAE',
    content: 'Corso SAE di composizione professionale per musica da film',
    icon: 'fa-solid fa-music'
  },
  {
    year: 2016,
    title: 'iLike Social Business Network',
    content: 'Documentario per iLike Social Business Network',
    icon: 'fa-solid fa-video'
  },
  {
    year: 2017,
    title: 'Festival Souramont',
    content: 'Teodasia miglior band al festival di Souramont',
    icon: 'fa-solid fa-award'
  },
  {
    year: 2018,
    title: 'Insieme Idee Persone',
    content: 'Regia per trasmissione televisiva',
    icon: 'fa-solid fa-tv'
  },
  {
    year: 2018,
    title: 'Cattive Abitudini',
    content: "Documentario per Band 'Cattive Abitudini'",
    icon: 'fa-solid fa-video'
  },
  {
    year: 2019,
    title: 'Direttore creativo Exozerol',
    content: 'Direttore creativo per Exozerol, Mirano (VE)',
    icon: 'fa-solid fa-video'
  },
  {
    year: 2020,
    title: 'Premio festival di Latina',
    content: "Dolo Città Gentile - primo premio al festival di Latina, sezione 'Paese Mio'",
    icon: 'fa-solid fa-award'
  }
];
const iframes_src = [
  'https://open.spotify.com/embed/artist/2o59zMoStcmwcT2fKxC2vo?utm_source=generator&theme=0',
  'https://open.spotify.com/embed/artist/16JXnESerYvanRg1CGhkLz?utm_source=generator&theme=0'
];

const all_video = reactive({
  featured: [],
  music: [],
  social: [],
  commercial: []
});

const show = reactive({
  edit: false,
  add: false,
  login: false
});

//==============================
// Functions
//==============================
async function loadMainVideo() {
  const res = await getItem({ category: MAIN_VIDEO });
  main_video.value = res.value.data();
}

async function loadAllVideo() {
  for (const [category, array] of Object.entries(all_video)) {
    await loadVideo({ category, array });
  }
}

async function loadVideo({ category, array }) {
  const items = await getItem({ category });
  for (const item of items) {
    const data = await apiGetYouTubeData({ firebase_id: item.id, yt_id: item.url });
    array.push(data);
  }
}

async function onLogin() {
  const res = await login({ email: email.value, password: password.value });
  if ( res.value?.auth ) {
    is_logged.value = true;
    show.login = false;
    email.value = '';
    password.value = '';
  } else {
    error.value = res;
  }
}

async function onConfirmEdit() {
  if ( edit_type.value == MAIN_VIDEO ) {
    const res = await updateItem({ category: edit_type.value, newVal: edit_yt_id.value })
    res && await loadMainVideo();
  } else {
    const res = await updateItem({
      category: edit_type.value,
      id: edit_firebase_id.value,
      newVal: edit_yt_id.value
    })
    if ( res ) {
      all_video[edit_type.value] = [];
      await loadVideo({ category: edit_type.value, array: all_video[edit_type.value] });
    }
  }
  edit_yt_id.value = '';
  edit_type.value = '';
  show.edit = false;
}

function onEditMain() {
  show.edit = true;
  edit_type.value = MAIN_VIDEO;
}

async function onVideoDelete({ category, id }) {
  await deleteItem({ category, id });
  all_video[category] = [];
  await loadVideo({ category, array: all_video[category] });
}

async function onVideoUpdate({ category, yt_id, firebase_id }) {
  edit_type.value = category;
  edit_yt_id.value = yt_id;
  edit_firebase_id.value = firebase_id;
  show.edit = true;
}

function onAddVideo({ category }) {
  show.add = true;
  edit_type.value = category;
}

async function onConfirmAdd() {
  await addItem({ category: edit_type.value, url: edit_yt_id.value });
  all_video[edit_type.value] = [];
  await loadVideo({ category: edit_type.value, array: all_video[edit_type.value] });
  show.add = false;
  edit_yt_id.value = '';
  edit_type.value = '';
}

//==============================
// Life cycle
//==============================
onBeforeMount(async () => {
  await loadMainVideo();
  await loadAllVideo();
})


</script>

<style lang="scss" scoped>
section.body {
  margin: 0 auto;
  &.max-width {
    max-width: 130rem;
  }
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
      transform: translate(-50%, -50%);
    }
  }
}

.placeholder-card {
  border: 0.2rem dashed var(--primary);
  display: inline-block;
  overflow: hidden;
  margin: 0 0.8rem;
  width: 45rem;
  height: 27.5rem;
  cursor: pointer;
  border-radius: var(--radius-s);
  position: relative;
  box-sizing: border-box;
  &.bigger {
    height: 38.7rem;
  }
  .add-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
