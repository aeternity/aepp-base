<template>
  <div class="screen">
    <div v-if="needSetup" id="setup" class="setup">
      <div v-if="!haveKeyStore" class="wrapper">
        <h1 class="title">Create Account</h1>
          <textarea id="seed-in" class="seed-input" v-model="seed" required></textarea>
        <button class="copy-phrase-button action-button">COPY PHRASE</button>
        <p class="text center">
          is your new wallet seed. Please write it down on paper or in a password manager, you will need it to access your wallet. Do not let anyone see this seed or they can take your Ether.
        </p>

        <button v-on:click="savePassword" class="action-button _primary">Got it!</button>
      </div>
      <div v-else>
        Found a saved keystore.
      </div>
      <!--div class="password-input wrapper">
        <form @submit.prevent>
          <label>Please enter your password to encrypt/decrypt your seed.</label>
          <div>
            <input v-model="password" type="password" pattern=".{4,}" title="4 characters minimum" required>
            <button v-on:click="savePassword">Save</button>
            <div ref="pwdinfo" id=""></div>
          </div>
        </form>
      </div-->
    </div>
    <div><input v-model="iname"><button v-on:click="loadIFrame">Load</button></div>
    <iframe ref="appframe" id="appframe"></iframe>
    <div class="status">{{ status }}</div>
    <div v-if="addrList.length > 0">
      Make this identity available to the loaded app.
      <button v-on:click="setProvider">Share Identity</button>
    </div>
    <div>
      <button v-on:click="generateAddress">Generate Identity</button>
      <ul>
        <li v-for="(addr, idx) in addrList" v-bind:class="{ 'active-addr': addrIdx === idx}">
          {{ addr }} has {{ tokenDisplay[idx] }} AE <button @click="selectAddress(idx)">select</button>
          <input v-model="tokenTransferValue" type="number" min="0.000000000000000001" v-if="addrIdx !== idx"><button v-if="addrIdx !== idx" @click="transfer(addr, tokenTransferValue)">send to</button>
        </li>
      </ul>
    </div>
    <div>
      <input v-model="message">
      <button v-on:click="signMsg">sign message</button>
    </div>
    <div>
      <button v-on:click="logout">logout</button>
    </div>
  </div>
</template>
<script src="./Setup.js"/>
<style src='./Setup.css'/>
