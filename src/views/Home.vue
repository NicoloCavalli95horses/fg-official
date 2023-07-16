<template>
  <!-- Hero section -->
  <div class="preview-wrapper">
    <VideoPreview v-if="main_video" :url="main_video.url" />
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
    <!-- Video section -->
    <template v-for="(video, category) in all_video" :key="category">
      <h3 class="capitalize">{{ category }} video</h3>
      <Carousel v-if="video.length">
        <VideoThumbnail
          v-for="(v, i) in video"
          :key="v.title + i"
          :item="v"
          :bigger="category == FEATURED"
        />
      </Carousel>
      <div class="separator" />
    </template>

    <div class="separator" />
    <Carousel>
      <Timeline  :events="events" />
    </Carousel>

    <div class="separator" />
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
    <form>
      <InputText label="Email" v-model="email" placeholder="example@gmail.com" @reset="email = ''" />
      <InputText label="Password" v-model="password" placeholder="password" :anonymize="true" @reset="password = ''" />
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
    :title="'Modifica ' + getEditLabel"
    max_width="50rem"
    min_width="50rem"
    max_height="30rem"
    :click_out_close="true"
    @closed="show.edit = false"
  >
    <InputText label="Video ID" v-model="edit_url" placeholder="Incollare qui video ID" @reset="edit_url = ''" />
    <p class="error top-12" v-if="error">{{ error }}</p>
    <template #footer>
      <Btn text="chiudi" @click="show.edit = false" />
      <Btn text="conferma" :def="true" @click="onConfirmEdit" />
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
import { 
  ref,
  reactive,
  computed,
  onBeforeMount,
} from 'vue'
import {
  login,
  getItem,
  updateItem
} from '../../firebase/utils'
import { getViewport } from '../utils/screen_size.js'
import { apiGetYouTubeData } from '../utils/apis'

import Btn from '../components/Btn.vue'
import Modal from '../components/Modal.vue'
import Timeline from '../components/Timeline.vue'
import Carousel from '../components/Carousel.vue'
import OnTopBtn from '../components/OnTopBtn.vue'
import InputText from '../components/InputText.vue'
import VideoPreview from '../components/VideoPreview.vue'
import VideoThumbnail from '../components/VideoThumbnail.vue'
import KeyboardShortcut from '../components/KeyboardShortcut.vue'


//==============================
// Consts
//==============================
const MAIN_VIDEO = 'main_video';
const FEATURED = 'featured';


//==============================
// Consts
//==============================
const device = getViewport();
const main_video = ref( null );
const is_logged = ref( false );
const edit_type = ref( '' );
const edit_url = ref( '' );

const events = [
  {
    year: 2011,
    title: 'Corso ENAIP',
    content: 'Conseguito corso di Tecnico Multimediale audio-video ENAIP'
  },
  {
    year: 2011,
    title: 'Majestic Studio',
    content: 'Stage formativo presso Majestic Studio'
  },
  {
    year: 2014,
    title: 'Teodasia tra i 10 migliori brani',
    content: "Teodasia classificato tra i primi 10 migliori brani di Cristina D'Avena"
  },
  {
    year: 2015,
    title: 'Composizione musica da film SAE',
    content: 'Conseguito corso di composizione professionale per musica da film (SAE, Milano)'
  },
  {
    year: 2016,
    title: 'iLike Social Business Network',
    content: 'Documentario per iLike Social Business Network'
  },
  {
    year: 2017,
    title: 'Festival Souramont',
    content: 'Teodasia miglior band al festival di Souramont'
  },
  {
    year: 2018,
    title: 'Insieme Idee Persone',
    content: 'Regia per trasmissione televisiva'
  },
  {
    year: 2018,
    title: 'Cattive Abitudini',
    content: "Documentario per Band 'Cattive Abitudini'"
  },
  {
    year: 2019,
    title: 'Direttore creativo Exozerol',
    content: 'Direttore creativo per Exozerol, Mirano (VE)'
  },
  {
    year: 2020,
    title: 'Premio festival di Latina',
    content: "Dolo Città Gentile - primo premio al festival di Latina, sezione 'Paese Mio'"
  }
]

const all_video = reactive({
  'featured' : [],
  'music' : [],
  'social' : [],
});

const show = reactive({
  login: false,
})

const email = ref('');
const password = ref('');
const error = ref( false );


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
async function loadAllVideo() {
  for ( const [ category, array ] of Object.entries( all_video ) ) {
    await loadVideo({ category, array })
  }
}

async function loadVideo({ category, array }) {
  const res = await getItem({ documentName: category });
  const data = res.value.data();
  for ( const url of data.urls ) {
    const data = await apiGetYouTubeData({ url });
    array.push( data );
  }
}


async function onLogin() {
  const res = await login({ email: email.value, password: password.value });
  error.value = res.value;
  email.value = '';
  password.value = '';
  if ( !error.value ) {
    is_logged.value = true;
    show.login = false;
  }
}


async function onConfirmEdit(){
  const err = await updateItem({ documentName: 'main', url: edit_url.value });
  error.value = err.value;
  edit_url.value = '';
  if ( !error.value ) {
    const res = await getItem({ documentName: 'main' });
    show.edit = false;
    main_video.value = res.value.data();
  }
}


//==============================
// Life cycle
//==============================
onBeforeMount(async () => {
  const res = await getItem({ documentName: 'main'});
  main_video.value = res.value.data();

  await loadAllVideo();
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
