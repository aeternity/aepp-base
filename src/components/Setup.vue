<template>
  <div class="screen setup">
      <div v-if="displayGeneratedSeed" class="wrapper">
        <h1 class="title">Create Account</h1>
          <textarea id="seed-in" class="seed-input" v-model="seed" required></textarea>
        <ae-button class="copy-phrase-button">
          <button>COPY PHRASE</button>
        </ae-button>
        <p class="text center">
          is your new wallet seed. Please write it down on paper or in a password manager, you will need it to access your wallet. Do not let anyone see this seed or they can take your Ether.
        </p>
        <ae-button :role="'primary'" class="next-step-button">
          <button v-on:click="nextStep">Got it!</button>
        </ae-button>
      </div>
      <div v-else-if="displayPasswordInput" class="password-input wrapper">
        <p class="text center" v-if="haveKeyStore"></p>
        <form @submit.prevent>
          <div>
            <pin-input :id="'pin-input'" @change="password = $event.value"/>
            <div ref="pwdinfo" class="password-info"></div>
            <label for="pin-input" class="pin-input-label text center">Please enter your password to encrypt/decrypt your seed.</label>
            <ae-button :role="'primary'" class="save-password-button">
              <button v-on:click="savePassword">Save</button>
            </ae-button>
          </div>
        </form>
      </div>
  </div>
</template>
<script src="./Setup.js"/>
<style src='./Setup.css'/>
