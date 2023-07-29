<template>
  <div />
</template>

<script setup>
//=============================
// Imports
//=============================
import {
  onMounted,
  onBeforeUnmount,
} from 'vue'



//=============================
// Props, emits, consts
//=============================
const props = defineProps({
  keys: {
    type: Array,
    default : () => [],
  },
  modifiers: {
    type: Array,
    validator: value => Array.isArray( value ) && value.filter( val => ['Control', 'Alt', 'Shift', 'Meta'].includes(val ) ).length == value.length,
    default : () => [],
  },
  prevent_default: Boolean,
  disabled: Boolean,
});

const emit = defineEmits([
  'keydown',
]);



//=============================
// Const
//=============================
const KEY_MODIFIERS = ['Control', 'Alt', 'Shift', 'Meta'];



//=============================
// Functions
//=============================
function onKeydown( e ) {
  if ( props.disabled ) {
    return;
  } else if ( props.keys.includes( e.key ) ) {
    if (
      ( !props.modifiers.length && areModifierPressed( {event: e, modifiers: KEY_MODIFIERS, arePressed: false} ) )
      || ( props.modifiers.length && areModifierPressed( {event: e, modifiers: props.modifiers, arePressed: true} ) )
    ) {
      if ( props.prevent_default ) {
        e.preventDefault();
      }
      emit( 'keydown', e );
    }
  }
}

function areModifierPressed( {event, modifiers, arePressed} ) {
  return modifiers.every( m => event.getModifierState( m ) == arePressed );
}



//=============================
// Life cycle
//=============================
onMounted( () => {
  document.addEventListener( 'keydown', onKeydown );
})

onBeforeUnmount( () => {
  document.removeEventListener( 'keydown', onKeydown );
})

</script>
