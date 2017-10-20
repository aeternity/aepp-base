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
    <!--template v-else>
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
    </template-->
  </div>
</template>
<script src="./Setup.js"/>
<style src='./Setup.css'/>
