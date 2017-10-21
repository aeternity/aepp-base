<template>
  <div class="unlock screen">
    <h1>Unlock</h1>
    <form @submit.prevent class="unlock-form">
      <pin-input @change="password = $event.value" :id="'unlock__pin-input'"/>
      <p v-if='error' class="error">
        {{error}}
      </p>
      <label class="explanation text center" for="unlock__pin-input">
        To access your account, please enter your secret Passphrase and the matching PIN.
      </label>
      <ae-button :role="'primary'" class="unlock-button">
        <button @click="unlockSavedKeystore">
          Unlock
        </button>
      </ae-button>
    </form>
  </div>
</template>

<script src='./Unlock.js'/>
<style scoped src='./Unlock.css'/>
