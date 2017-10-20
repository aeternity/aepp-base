<template>
  <div class="id-manager screen">

    <ae-identity v-for='i in identities' :identity='i' :key='i.address'/>

    <p>This is your first Identity, it enables you to use our Æpps, get Tokens, trade them and much more!</p>
    <p>Use the sidemenu to start exploring.</p>

    <ae-button>
      <button @click='generateNewIdentity'>
        Create new Identity
      </button>
    </ae-button>

  </div>
</template>

<script src='./IdManager.js'/>
<style scoped src='./IdManager.css'/>
