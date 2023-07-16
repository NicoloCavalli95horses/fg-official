<template>
  <div class="main">
    <div class="wrapper">
      <div class="line" />

      <!-- today -->
      <div class="rect">
        <div class="half noborder">
          <div class="today">
            <h3>Today</h3>
          </div>
        </div>
      </div>

      <div v-for="(ev, i) in orderedEvents" :key="ev.title" class="rect">
        <div class="half">
          <div v-if="i == 0 || (i > 0 && ev.year != orderedEvents[i - 1].year)" class="year">
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
import { computed } from 'vue'

// ==============================
// Import
// ==============================
const props = defineProps({
  events: Array,
  reverse: Boolean
})

// ==============================
// Consts
// ==============================
const orderedEvents = computed(() => (props.reverse ? props.events.reverse() : props.events))
</script>

<style lang="scss" scoped>
$rect-h: 35rem;
$rect-w: 45rem;
$left-rect-border: 0.3rem;

.main {
  display: inline-block;
  .wrapper {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 15rem;
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
      .year,
      .today {
        position: absolute;
        transform: translate(-50%, -50%);
        padding: 1.5rem 2rem;
        box-sizing: border-box;
        background-color: var(--black);
      }
      .today {
        top: 100%;
        width: max-content;
      }
      .year {
        width: 13rem;
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
}
</style>
