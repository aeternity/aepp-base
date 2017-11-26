<template>
	<div class='approve'>
      <template>
        <div>
          <ae-app-icon src='static/icons/notary.svg'/>
        </div>

				<!--p>{{appName}}</p-->
        <p class="app-name">Identity Manager</p>
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
            <svg slot="icon"
                 class="icon cancel-icon"
                 xmlns="http://www.w3.org/2000/svg"
                 version="1.1"
                 viewBox="0 0 15.556 15.556"
            >
              <path
                d="m 12,13.414 6.364,6.364 1.414,-1.414 L 13.414,12 19.778,5.636 18.364,4.222 12,10.586 5.636,4.222 4.222,5.636 10.586,12 4.222,18.364 5.636,19.778 Z"
                id="a"
                transform="translate(-4.222,-4.222)"
                height="100%"
                width="100%"
                y="0"
                x="0"
              />
            </svg>
            Cancel
          </ae-button>
          <ae-button size='smaller' type='dramatic' @click="accept">
            <svg slot='icon'
                 class='icon check-icon'
                 version="1.1"
                 viewBox="0 0 12.2 9.192"
                 xmlns="http://www.w3.org/2000/svg"
            >
             <path transform="translate(-6.604,-8.25)" width="100%" height="100%" id="a" d="m11.025 17.442 7.779-7.778-1.415-1.414-6.364 6.364-3.007-3.008-1.414 1.415z"/>
            </svg>
            Approve
          </ae-button>
        </div>
      </template>
	</div>
</template>

<script src="./Approve.js"/>
<style src="./Approve.css"/>
