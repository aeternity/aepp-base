<template>
  <div class="unlock screen">
    <h1>Unlock</h1>
    <form @submit.prevent class="unlock-form">
      <label class="explanation text center" for="unlock__pin-input">
        To access your account, please enter your password.
        <!--your secret Passphrase and the matching-->
      </label>
      <pin-input :focus-on-mount='true' @change="password = $event.value" :id="'unlock__pin-input'"/>
      <p v-if='error' class="error">
        {{error}}
      </p>
      <ae-button :role="'primary'" class="unlock-button">
        <button @click="unlockSavedKeystore">
          Unlock
        </button>
      </ae-button>
      <button class='small-btn unlock-different-keystore' @click="unlockDifferentKeystore">
        Unlock a different account
      </button>
    </form>
  </div>
</template>

<script src='./Unlock.js'/>
<style scoped src='./Unlock.css'/>
