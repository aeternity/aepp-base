<template>
  <div class="screen setup">
      <div v-if="displayGeneratedSeed" class="wrapper">
        <h1 class="title">Create Account</h1>
          <textarea id="seed-in" class="seed-input" v-model="seed" required></textarea>
        <button class="copy-phrase-button action-button">COPY PHRASE</button>
        <p class="text center">
          is your new wallet seed. Please write it down on paper or in a password manager, you will need it to access your wallet. Do not let anyone see this seed or they can take your Ether.
        </p>

        <button v-on:click="nextStep" class="next-step-button action-button _primary">Got it!</button>
      </div>
      <div v-else-if="displayPasswordInput" class="password-input wrapper">
        <p class="text center" v-if="haveKeyStore"></p>
        <form @submit.prevent>
          <div>
            <input
              id="pin-input"
              class="pin-input"
              v-model="password"
              type="password"
              pattern=".{4,}"
              title="4 characters minimum"
              required placeholder="Enter PIN..."
            >
            <div ref="pwdinfo" class="password-info"></div>
            <label for="pin-input" class="pin-input-label text center">Please enter your password to encrypt/decrypt your seed.</label>
            <button v-on:click="savePassword" class="save-password-button action-button _primary">Save</button>
          </div>
        </form>
      </div>
  </div>
</template>
<script src="./Setup.js"/>
<style src='./Setup.css'/>
