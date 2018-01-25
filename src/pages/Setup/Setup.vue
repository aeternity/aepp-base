<template>
  <div class="screen setup">
    <ae-button size='smaller' type='dramatic' v-if='haveKeyStore' class='go-to-unlock'>
      <router-link :to="{ name: 'unlock' }">Back to unlock</router-link>
    </ae-button>
    <div v-if="displayGeneratedSeed" class="wrapper">
      <h1 class="title">Account Setup 1/2</h1>
      <p class="text center">
      Save these 12 words to a safe place. You need them to recover your account in the future.
      Don't show them to anybody or you risk loosing all your funds.
      </p>
      <ae-button size='smaller' type='dramatic' class='generate-random-seed' @click="generateRandomSeed()">{{regenerateButtonText}}</ae-button>
      <div class="seed-wrap">
        <textarea readonly id="seed-in" class="seed-input" v-model="seed" ref="seed" required>{{seed}}</textarea>
        <ae-button size='small' type='boring' class="copy-phrase-button" @click="copySeed()">{{copyButtonText}}</ae-button>
      </div>

      <div>
        <ae-button v-on:click="nextStep" type="dramatic" class="next-step-button">
          Got it!
        </ae-button>
      </div>
      <ae-button size='smaller' type='dramatic' class='recover-with-seed' @click="recoverWidthSeed()">recover with seed phrase</ae-button>
    </div>
    <div v-else-if="displayPasswordInput" class="password-input wrapper">
      <p class="text center" v-if="haveKeyStore"></p>
      <form @submit.prevent>
        <div>
          <h1 class="title">Account Setup 2/2</h1>
          <!--<div ref="pwdinfo" class="password-info"></div>-->
          <label for="pin-input" class="pin-input-label text center">Please choose a password to encrypt your account.</label>
          <pin-input :id="'pin-input'" @change="password = $event.value"/>
          <ae-button v-on:click="savePassword" :inactive="working" type="dramatic" class="save-password-button">
            {{working ? 'Saving...' : 'Save'}}
          </ae-button>
        </div>
      </form>
      <ae-button size='smaller' type='dramatic' class='recover-with-seed' @click="stepIndex--">back</ae-button>
    </div>
  </div>
</template>
<script src="./Setup.js"/>
<style src='./Setup.css'/>
