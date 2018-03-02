<template>
  <ae-modal class="modal-screen id-manager" :title="title" @close='goBack'>
    <div class="totalBalance v-pad">
      <ae-label>Total Balance</ae-label>
      <div class="balances">
        <div class="balance">
          <span class="amount">{{totalAmount.tokenAmount}}</span>
          <span class="currency-symbol">AE</span>
        </div>
        <div class="balance">
          <span class="amount">{{totalAmount.amount}}</span>
          <span class="currency-symbol">ETH</span>
        </div>
      </div>
      <ae-divider />
    </div>
    <ae-label class="v-pad">Active Identity</ae-label>
    <template v-if="identities.length > 0">
      <ae-identity :active="true" :identity="activeIdentity" size="big" class="id-manager__identity" :collapsed="false">
        <div  class="action-buttons">
          <ae-divider />
          <ae-button v-clipboard:copy="activeIdentity.address" size='small' type='boring' class="id-manager__ae-button">
            Copy
          </ae-button>
          <ae-button @click="activateId(activeIdentity)" :inactive="true" size='small' type='dramatic' :disabled="true" class="id-manager__ae-button">
            Active
          </ae-button>
        </div>
      </ae-identity>

      <div class="explanation" v-if="identities.length == 1">
        <p class="text center" v-if="identities.length === 1">This is your first Identity, it enables you to use our Æpps, get Tokens, trade them and much more!</p>
        <p class="text center">Quickly activate another identity or instantly create one or multiple ID’s. Each has it’s own address and Token Balance</p>
      </div>
      <div class="v-pad">
        <ae-divider/>
        <ae-label :help-text="inactiveIdentities.length.toString()">Inactive</ae-label>
        <div class="inactive-identities">
          <div
            v-for='(identity, index) in inactiveIdentities'
            :style="getStyle(index)"
            class="inactive-identity"
          >
            <ae-identity
              :active="false"
              :identity='identity'
              :size="'big'"
              class="id-manager__identity"
              :collapsed="true"
              @click="activateCard(index)"
            >
              <div v-show="index === activeIdentityCard" class="action-buttons">
                <ae-divider />
                <ae-button v-clipboard:copy="identity.address" size='small' type='boring' class="id-manager__ae-button">
                Copy Address
                </ae-button>
                <ae-button @click="activateId(identity)" size='small' type='dramatic' :disabled="activeIdentity === identity" class="id-manager__ae-button">
                  Activate
                </ae-button>
              </div>
            </ae-identity>
          </div>
        </div>
      </div>
    </template>
    <p v-else="" class="text center">
      Currently you don't have an identity. Feel free to create one.
    </p>
    <ae-button size='medium' type='dramatic' class="bottom-right" @click="generateNewIdentity">
      <ae-icon slot='icon' invert type='dramatic' name="plus"/>
    </ae-button>
  </ae-modal>
</template>

<style scoped src='./IdManager.scss' type="scss"/>
<script src='./IdManager.js'/>
