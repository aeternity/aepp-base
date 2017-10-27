<template>
  <div class="quick-id">
    <ae-identity :identity='identity' :active="true" @click="showIdManager" :collapsed="true" class="quick-id__identity"/>
  </div>
</template>

<script src='./QuickId.js'/>
<style scoped src='./QuickId.css'/>
