<template>
  <form
    action="https://formsubmit.co/gozzofrancesco@gmail.com"
    method="POST"
    id="form"
    autocomplete="off"
    autofill="off"
    enctype="multipart/form-data"
    @keydown.enter.prevent="(e) => e.preventDefault()"
  >
  <div :class="{ 'flex-center' : device != 'mobile' }">
    <InputText
      label="Nome"
      placeholder="Nome"
      v-model="name.content"
      :is_required="true"
      :ext_class="device != 'mobile' ? 'w-50' : ''"
      @reset="name.content = ''"
    />
    <InputText
      label="Cognome"
      placeholder="Cognome"
      v-model="surname.content"
      :is_required="true"
      :ext_class="device != 'mobile' ? 'w-50 l-12' : ''"
      @reset="surname.content = ''"
    />
  </div>
    <InputText
      label="Email"
      placeholder="Email"
      v-model="email.content"
      :is_required="true"
      @reset="email.content = ''"
    />
    <InputText
      label="Oggetto"
      placeholder="Oggetto"
      v-model="subject.content"
      :is_required="true"
      @reset="subject.content = ''"
    />
    <InputText
      input_type="textarea"
      v-model="message.content"
      label="Messaggio"
      placeholder="Scrivi qui il tuo messaggio"
      :is_required="true"
      @reset="message.content = ''"
    />

    <Btn :def="true" :disabled="isConfirmDisabled" class="top-12 float-r" text="Invia" />

    <!-- Redirect -->
    <input type="hidden" name="_next" value="http://www.gozzofrancesco.it/" />
    <input type="hidden" name="_subject" :value="subject.content" />
    <input type="hidden" name="_template" value="table" />

    <!-- Email fields -->
    <input type="hidden" name="Nome" :value="name.content" />
    <input type="hidden" name="Cognome" :value="surname.content" />
    <input type="hidden" name="Email" :value="email.content" />
    <input type="hidden" name="Oggetto" :value="subject.content" />
    <input type="hidden" name="Messaggio" :value="message.content" />
  </form>
</template>

<script setup>
// ==============================
// Import
// ==============================
import {
  computed,
  reactive,
} from "vue";
import { getViewport } from "../utils/screen_size.js";

import Btn from './Btn.vue';
import InputText from './InputText.vue';


// ==============================
// Consts
// ==============================
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// ==============================
// Vars
// ==============================
const device = getViewport();

const name = reactive({
  content: "",
});
const surname = reactive({
  content: "",
});
const email = reactive({
  content: "",
});
const subject = reactive({
  content: "",
});
const message = reactive({
  content: "",
});

const isEmailValid = computed(() => email.content.length && EMAIL_REGEX.test(email.content));
const isConfirmDisabled = computed( () => !name.content.length || !surname.content.length || !isEmailValid.value || !subject.content.length || !message.content.length );
</script>

<style lang="scss" scoped>
  form {
    margin: 1.2rem auto;
    max-width: 70rem;
  }
</style>
