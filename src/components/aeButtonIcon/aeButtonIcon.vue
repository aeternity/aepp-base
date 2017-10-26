<template>
  <div class="ae-button-icon" @click="$emit('click', $event)">
    <svg v-if="icon === 'add'" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <g fill="#FFFFFF" fill-rule="evenodd"><path d="M0 9h20v2H0z"/><path d="M11 0v20H9V0z"/></g>
    </svg>
    <slot></slot>
  </div>
</template>

<script src='./aeButtonIcon.js'/>
<style scoped src='./aeButtonIcon.css'/>
