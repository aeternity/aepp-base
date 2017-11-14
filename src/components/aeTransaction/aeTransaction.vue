<template>
  <div v-if='txhash'>
    <div>
      <a :href="`https://kovan.etherscan.io/tx/${txhash}`" target="_blank">
      {{txhash}}
      </a>
    </div>
    {{status}}
  </div>
</template>

<script src="./aeTransaction.js" />
<style scoped src="./aeTransaction.css" />
