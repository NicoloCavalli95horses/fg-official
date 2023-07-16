<template>
  <div class="main">
    <div class="wrapper">
      <div class="line" />
      <div v-for="ev in orderedEvents" :key="ev.title" class="rect">
        <div class="half">
          <div class="year">
            <h3>{{ ev.year }}</h3>
          </div>
          <h4 class="title">{{ ev.title }}</h4>
          <p class="content">{{ ev.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import {
  computed
} from "vue"

// ==============================
// Import
// ==============================
const props = defineProps({
  events: Array,
  reverse: Boolean,
})

// ==============================
// Consts
// ==============================
const orderedEvents = computed(() => props.reverse ? props.events.reverse() : props.events );
</script>

<style lang="scss" scoped>
$rect-h: 35rem;
$rect-w: 45rem;

.main {
  display: inline-block;
  .wrapper {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 15rem;
    .line {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      width: 100%;
      height: 1rem;
      background-color: var(--primary);
      opacity: 0.7;
    }
    .rect {
      min-width: $rect-w;
      max-width: $rect-w;
      height: $rect-h;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      &:nth-of-type(even) {
        align-items: flex-start;
      }
      &:nth-of-type(odd) {
        align-items: flex-end;
      }
      .year {
        position: absolute;
        transform: translate(-50%, -50%);
        padding: 1.5rem 2rem;
        width: 13rem;
        box-sizing: border-box;
        background-color: var(--black);
      }
      &:nth-of-type(odd) .half .year {
        top: 0;
        left: 0;
      }
      &:nth-of-type(even) .half .year {
        top: 100%;
        left: 0;
      }
      .half {
        box-sizing: border-box;
        width: 100%;
        height: calc($rect-h / 2);
        display: flex;
        flex-direction: column;
        justify-content: center;
        white-space: normal;
        border-left: 0.3rem solid rgb(255, 255, 255, 0.1);
        position: relative;
        h4.title {
          padding: 0 3.5rem;
          font-size: 2rem;
          color: var(--primary);
          text-align: left;
        }
        p.content {
          margin-top: 1rem;
          padding: 0 3.5rem;
          text-align: left;
        }
      }
    }
  }
}
</style>
