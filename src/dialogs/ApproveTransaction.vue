<template>
  <div class='approve'>
      <template>
        <dialog-header title="Requests a transaction" :appName="appName" iconSrc="static/icons/notary.svg"/>
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
        <ae-amount class='approve__amount' color="black" size="med" :value="amount" :unit="unit"></ae-amount>
        <div v-if="!!fiatValue" class="fiat-value">{{fiatValueStr}}</div>
        <hr>
        <div class="additional-fees-table" v-if="!!gasEstimate">
          <span class="additional-fees-header"> Additional fees</span>
          <div class="additional-fees-value">
            <div class="additional-fees-eth">{{gasEstimateStr}}</div>
            <div v-if="!!fiatGas" class="fiat-value">{{fiatGasStr}}</div>
          </div>
        </div>
        <approve-buttons @approve="approve" @reject="reject"/>
      </template>
	</div>
</template>

<script src="./ApproveTransaction.js"/>
<style scoped src="./ApproveTransaction.css"/>
