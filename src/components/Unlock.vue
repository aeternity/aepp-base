<template>
  <div class="unlock screen">
    Unlock
    <div class="password-input">
      <form @submit.prevent>
        <input v-model="password" type="password" pattern=".{4,}" title="4 characters minimum" required>
        <p v-if='error' class="error">
          {{error}}
        </p>
        <p>To access your account, please enter your secret Passphrase and the matching PIN.</p>
        <ae-button :primary="true">
          <button @click="unlockSavedKeystore">
            Unlock
          </button>
        </ae-button>
      </form>
    </div>
  </div>
</template>

<script src='./Unlock.js'/>
<style scoped src='./Unlock.css'/>
