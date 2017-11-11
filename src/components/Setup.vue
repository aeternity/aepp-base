<template>
  <div class="screen setup">
    <button class='small-btn go-to-unlock'>
      <router-link v-if='haveKeyStore' :to="{path:unlockPath}">Back to unlock</router-link>
    </button>
    <div v-if="displayGeneratedSeed" class="wrapper">
      <h1 class="title">Account Setup 1/2</h1>
      <p class="text center">
      Save these 12 words to a safe place. You need them to recover your account in the future.
      Don't show them to anybody or you risk loosing all your funds.
      </p>
      <button class='small-btn generate-random-seed' @click="generateRandomSeed()">{{regenerateButtonText}}</button>
      <div class="seed-wrap">
        <textarea readonly id="seed-in" class="seed-input" v-model="seed" ref="seed" required>{{seed}}</textarea>
      <ae-button>
        <button class="copy-phrase-button" @click="copySeed()">{{copyButtonText}}</button>
      </ae-button>
      </div>

      <ae-button :role="'primary'" class="next-step-button">
        <button v-on:click="nextStep">Got it!</button>
      </ae-button>
      <button class='gray small-btn recover-with-seed' @click="recoverWidthSeed()">recover with seed phrase</button>
    </div>
    <div v-else-if="displayPasswordInput" class="password-input wrapper">
      <p class="text center" v-if="haveKeyStore"></p>
      <form @submit.prevent>
        <div>
          <h1 class="title">Account Setup 2/2</h1>
          <!--<div ref="pwdinfo" class="password-info"></div>-->
          <label for="pin-input" class="pin-input-label text center">Please choose a password to encrypt your account.</label>
          <pin-input :id="'pin-input'" @change="password = $event.value"/>
          <ae-button :role="'primary'" class="save-password-button">
            <button v-on:click="savePassword" :disabled="working">{{working ? 'Saving...' : 'Save'}}</button>
          </ae-button>
        </div>
      </form>
      <button class='gray small-btn recover-with-seed' @click="stepIndex--">back</button>
    </div>
  </div>
</template>
<script src="./Setup.js"/>
<style src='./Setup.css'/>
