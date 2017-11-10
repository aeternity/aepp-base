<template>
  <div class="transfer screen">
    Transfer
    <div>
    <input v-model='addressTo' type="text" value="" name="" id=""/>
    </div>
    <div>
    <input v-model='amount' type="text" value="" name="" id=""/>
    </div>
    <div>

    <button @click='send'>Send</button>
    </div>
    {{  transactionHash }}
  </div>
</template>

<script src='./Transfer.js'/>
<style scoped src='./Transfer.css'/>
