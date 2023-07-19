<template>
  <form
    action="https://formsubmit.co/nicolo.cavalli95@gmail.com"
    method="POST"
    id="form"
    autocomplete="off"
    autofill="off"
    enctype="multipart/form-data"
    @keydown.enter.prevent="(e) => e.preventDefault()"
  >
    <InputText
      label="Nome"
      placeholder="Nome"
      v-model="name.content"
      :is_required="true"
      :error="name.error"
      @reset="name.content = ''"
    />
    <InputText
      label="Cognome"
      placeholder="Cognome"
      v-model="surname.content"
      :is_required="true"
      :error="surname.error"
      @reset="surname.content = ''"
    />
    <InputText
      label="Email"
      placeholder="Email"
      v-model="email.content"
      :is_required="true"
      :error_message="email.error_msg"
      :error="email.error"
      @reset="email.content = ''"
    />
    <InputText
      label="Oggetto"
      placeholder="Oggetto"
      v-model="subject.content"
      :error_message="subject.error_msg"
      :error="subject.error"
      :is_required="true"
      @reset="subject.content = ''"
    />
    <InputText
      input_type="textarea"
      v-model="message.content"
      label="Messaggio"
      placeholder="Ulteriori informazioni"
      :is_required="true"
      :error="message.error"
      @reset="message.content = ''"
    />

    <Btn :def="true" text="Invia" />

    <!-- Redirect -->
    <input type="hidden" name="_next" value="https://www.gozzofrancesco.it/thanks" />
    <input type="hidden" name="_subject" :value="subject.content" />
    <input type="hidden" name="_template" value="table" />

    <!-- Email fields -->
    <input type="hidden" name="Nome" :value="name.content" />
    <input type="hidden" name="Cognome" :value="surname.content" />
    <input type="hidden" name="Email" :value="email.content" />
    <input type="hidden" name="Messaggio" :value="message.content" />
  </form>
</template>

<script setup>
// ==============================
// Import
// ==============================
import {
  reactive,
} from "vue";
// import { getViewport } from "../utils/screen_size.js";
// import { config } from "../utils/config.js";

import Btn from './Btn.vue'
import InputText from './InputText.vue'

// ==============================
// Consts
// ==============================
const name = reactive({
  content: "",
  error: false,
});
const surname = reactive({
  content: "",
  error: false,
});
const email = reactive({
  content: "",
  error_msg: "",
  error: false,
});
const subject = reactive({
  content: "",
  error_msg: "",
  error: false,
});
const message = reactive({
  content: "",
  error_msg: "",
  error: false,
});
</script>

<style lang="scss" scoped></style>
