<template>
  <div class='approve'>
      <template>
        <div>
          <ae-app-icon src='static/icons/notary.svg'/>
        </div>

        <p class="app-name">{{appName}}</p>
        <!-- <p class="app-name">Identity Manager</p> -->
        <span>Requests a transaction</span>
        <div class="transaction-flow">
          <div class="id" :title="`from ${from}`">
            <ae-identity-avatar :address="from"></ae-identity-avatar>
            <div>{{from}}</div>
          </div>
          <ae-icon name='arrow' class="approve__flow-direction"></ae-icon>
          <div class="id" :title="`to ${to}`">
            <ae-identity-avatar :address="to"></ae-identity-avatar>
            <div>{{to}}</div>
          </div>
        </div>
        <hr>
        <ae-amount class='approve__amount' color="black" size="med" :value="amount"></ae-amount>
        <ae-amount v-if="isAeTokenTx" class='approve__amount' color="black" size="med" :value="tokenAmount" unit="Æ"></ae-amount>
        <span v-if="!!usdValue" class="usd-value">{{usdValueStr}}</span>
        <hr>
        <div class="additional-fees-table" v-if="!!gasEstimate">
          <span class="additional-fees-header"> Additional fees</span>
          <div class="additional-fees-value">
            <div class="additional-fees-eth">{{gasEstimateStr}}</div>
            <div v-if="!!usdGas" class="usd-value">{{usdGasStr}}</div>
          </div>
        </div>
        <div class="bottom-buttons">
          <ae-button size='smaller' type='normal' @click="reject">
            <ae-icon slot='icon' name='error'/>
            Cancel
          </ae-button>
          <ae-button size='smaller' type='dramatic' @click="accept">
            <ae-icon slot='icon' name='check'/>
            Approve
          </ae-button>
        </div>
      </template>
	</div>
</template>

<script src="./Approve.js"/>
<style src="./Approve.css"/>
