<template>
  <div id="app">
    <id-manager v-if="showIdManager" :title="'Quick Id Manager'"></id-manager>
    <router-view></router-view>
  </div>
</template>

<script src='./App.js'/>
<style src='./App.css'/>
