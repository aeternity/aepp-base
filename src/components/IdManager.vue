<template>
  <div class="id-manager">
    <ae-identity v-for='a in addresses' :address='a'/>
    <p>This is your first Identity, it enables you to use our Æpps, get Tokens, trade them and much more!</p>
    <p>Use the sidemenu to start exploring.</p>

  </div>
</template>

<script src='./IdManager.js'/>
<style scoped src='./IdManager.css'/>
