<template>
  <div class="approve">
    <template>
      <dialog-header title="Requests a transaction" :appName="appName" iconSrc="static/icons/aepps/default.svg" />
      <div class="transaction-flow">
        <div class="id" :title="`from ${transaction.from}`">
          <ae-identity-avatar :address="transaction.from" />
          <div>{{transaction.from}}</div>
        </div>
        <ae-icon name="arrow" class="approve__flow-direction" />
        <div class="id" :title="`to ${to}`">
          <ae-identity-avatar :address="to" />
          <div>{{to}}</div>
        </div>
      </div>
      <hr>
      <ae-amount class="approve__amount" color="black" size="med" :value="amount" :unit="unit" />
      <div v-if="amountFiat" class="fiat-value">{{amountFiat}}</div>
      <hr>
      <div class="additional-fees-table" v-if="!!fees">
        <span class="additional-fees-header"> Additional fees</span>
        <div class="additional-fees-value">
          <div class="additional-fees-eth">{{feesStr}}</div>
          <div v-if="!!feesFiat" class="fiat-value">{{feesFiat}}</div>
        </div>
      </div>
      <approve-buttons @approve="approve" @reject="close" />
    </template>
	</div>
</template>

<script src="./ApproveTransaction.js" />
<style scoped src="./ApproveTransaction.css" />
