<template>
  <div class="main">
  
    <div v-if="device == 'mobile'" class="wrapper-mobile">
      <div v-for="ev in orderedEvents" :key="ev.title" class="rect">
        <Icon :icon="ev.icon" class="icon" />
        <div class="text-wrapper">
          <h4 class="title">{{ ev.title }}</h4>
          <p class="content">{{ ev.content }}</p>
        </div>
        <div class="year"> <h3>{{ ev.year }}</h3> </div>
      </div>
    </div>

    <div v-else class="wrapper-desktop">
      <div class="line" />
      <div v-for="(ev, i) in orderedEvents" :key="ev.title" class="rect">
        <div class="half">
          <div v-if="canShowYear(i, ev)" class="year">
            <h3>{{ ev.year }}</h3>
          </div>
          <h4 class="title">{{ ev.title }}</h4>
          <p class="content">{{ ev.content }}</p>
          <Icon :icon="ev.icon" class="icon svg-18" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { computed } from 'vue';
import { getViewport } from '../utils/screen_size.js';


// ==============================
// Import
// ==============================
const props = defineProps({
  events: Array,
  reverse: Boolean
});


// ==============================
// Consts
// ==============================
const device = getViewport();
const orderedEvents = computed( () => props.reverse ? [ ...props.events].reverse() : props.events );


// ==============================
// Functions
// ==============================
function canShowYear(i, ev) {
  return i == 0 || (i > 0 && ev.year != orderedEvents.value[i - 1].year);
}

</script>

<style lang="scss" scoped>
$rect-h: 30rem;
$rect-w: 40rem;
$left-rect-border: 0.3rem;

.main {
  display: inline-block;
  .wrapper-desktop {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 10rem;
    height: 40rem;
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
      .year, .today {
        position: absolute;
        transform: translate(-50%, -50%);
        padding: 1rem;
        box-sizing: border-box;
        background-color: var(--black);
      }
      .today {
        top: 100%;
        width: max-content;
      }
      .year {
        width: 10rem;
      }
      &:nth-of-type(odd) .half .year {
        top: 0;
        left: 0;
      }
      &:nth-of-type(even) .half .year {
        top: 100%;
        left: 0;
      }
      &:nth-of-type(odd) .half .icon {
        top: 100%;
        left: 0;
      }
      &:nth-of-type(even) .half .icon {
        top: 0;
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
        position: relative;
        border-left: $left-rect-border solid rgb(255, 255, 255, 0.1);
        &.noborder {
          border: none;
        }
        h4.title {
          padding: 0 4rem;
          font-size: 2rem;
          color: var(--primary);
          text-align: left;
        }
        p.content {
          margin-top: 1rem;
          padding: 0 4rem;
          text-align: left;
        }

        .icon {
          position: absolute;
          background-color: var(--background);
          width: 4.5rem;
          height: 4.5rem;
          box-sizing: border-box;
          padding: 0.8rem;
          border-radius: 50%;
          transform: translate(calc(-50% - ($left-rect-border / 2)), -50%);
        }
      }
    }
  }
  .wrapper-mobile {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 18rem;
    .line {
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translate(0, -50%);
      width: 100%;
      height: 0.6rem;
      background-color: var(--primary);
      opacity: 0.7;
    }
    .rect {
      width: 26rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      white-space: normal;
      .icon {
        box-sizing: border-box;
        max-width: 3.5rem;
        min-width: 3.5rem;
        min-height: 3.5rem;
        height: 20%;
        margin: 0.8rem 0;
      }
      .text-wrapper {
        box-sizing: border-box;
        padding: 0.5rem 1.2rem 0 1.2rem;
        max-height: 40%;
        min-height: 40%;
        .content {
          padding-top: 0.3rem;
          opacity: 0.9;
        }
      }
      .year {
        box-sizing: border-box;
        max-height: 40%;
        min-height: 40%;
        display: grid;
        place-content: center;
        h3 {
          color: var(--secondary);
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
