<template>
  <div id="app">
		<div v-if="needSetup" id="setup">
			<div v-if="!haveKeyStore">
        <div>
          <span v-for="(it, idx) in seedList" v-bind:class="[idx % 2 ? '' : 'seed-odd', 'seed']">{{ it + ' ' }}</span>
          <input id="seed-in" v-model="seed" width="250" required>
        </div>
        <div>
          is your new wallet seed. Please write it down on paper or in a password manager, you will need it to access your wallet. Do not let anyone see this seed or they can take your Ether.
        </div>
			</div>
      <div v-else>
        Found a saved keystore.
			</div>
			<div class="password-input">
        <form @submit.prevent>
          <label>Please enter your password to encrypt/decrypt your seed.</label>
          <div>
            <input v-model="password" type="password" pattern=".{4,}" title="4 characters minimum" required>
            <button v-on:click="savePassword">Save</button>
            <div ref="pwdinfo" id=""></div>
          </div>
        </form>
			</div>
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

<script src='./App.js'/>
<style src='./App.css'/>
