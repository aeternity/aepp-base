<template>
  <div class="transfer screen">
    <h1>Transfer</h1>
    <ae-button @click='close' class='transfer__close-button' size='small' type='plain'>
      <ae-icon slot='icon' name='close'/>
    </ae-button>

    <ae-switch class='transfer__switch-transaction-type' v-model='transactionType' name='transactionType' :choices="[{value:'internal',label:'To own identity'},{value:'external',label:'External address'}]" :default="transactionType" />
    <div v-if='transactionType === "internal"'>
      <swiper class="swiper-container transfer__identities-to" :options="swiperOptionsTo" ref="swiperTo" :not-next-tick="notNextTick">
        <swiper-slide v-for='(i, index) in identitiesTo' :key='i.address'>
          <ae-identity :active="false" :identity='i' :size="'big'" class="" :collapsed="false">
          </ae-identity>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <div v-else>
      <div class='foo'>
        <ae-address-input value='addressTo' v-model='addressTo'/>
      </div>
    </div>

    <div class='foo'>
      <ae-switch class='transfer__switch-transaction-currency' v-model='transactionCurrency' name='transactionCurrency' :choices="[{value:'AE',label:'AE'},{value:'ETH',label:'ETH'}]" :default="transactionCurrency"/>

      <div class='input-wrap'>
        <div>Amount</div>
        <ae-amount v-model="amount" :step='0.001' :min="0" :symbol='transactionCurrency'/>
        <span class='amount-in-fiat'>
          ≈ {{ fiatAmount }} CHF
        </span>
      </div>
    </div>
    <div v-if='hasErrors' class="errors">
      <li v-for='e in errors'>{{e}}</li>
    </div>

    <div class="center">
      <ae-button @click='send' type="dramatic" :inactive='hasErrors' class="transfer__send-button">
        Make Transaction
      </ae-button>
    </div>

    <div v-if='transactionHash' class="transaction">
      <ae-transaction :txhash='transactionHash '/>
    </div>

  </div>
</template>

<script src='./Transfer.js'/>
<style lang='scss' src='./Transfer.scss'/>
