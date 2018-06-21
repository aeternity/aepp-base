<template>
  <mobile-page class="transfer" title="Transfer">
    <ae-switch
      v-if="identitiesTo.length"
      v-model="transactionType"
      :default="swiperOptionsTo.initialSlide === -1 ? 'external' : 'internal'"
      :choices="[
        { value: 'internal', label: 'To own identity' },
        { value: 'external', label: 'External address' }
      ]"
    />

    <swiper
      v-if="transactionType === 'internal'"
      class="swiper-container"
      :options="swiperOptionsTo"
      not-next-tick
    >
      <swiper-slide v-for="i in identitiesTo" :key="i.address">
        <ae-identity :active="false" :identity="i" size="big" :collapsed="false" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" />
    </swiper>
    <div v-else>
      <ae-label
        :for="`${_uid}-addressTo`"
        help-type="dramatic"
        :help-text="errors.first('addressTo')"
      >Receiving address</ae-label>
      <ae-address-input
        :id="`${_uid}-addressTo`"
        name="addressTo"
        v-model="to"
        v-validate="'required|min:51|max:53'"
        data-vv-delay="1"
        placeholder="ak$••••••••••••••••••••••••••••••••••••••••••••••••"
      />
      <div class="buttons">
        <ae-button
          :to="{
            name: 'address-book-choose',
            params: { redirectPathTemplate: `/transfer/{address}/${$route.params.amount || ''}` }
          }"
          type="exciting"
          size="small"
          uppercase
        >Contact</ae-button>
      </div>
    </div>

    <ae-label
      :for="`${_uid}-currency`"
      help-type="dramatic"
      :help-text="errors.first('currency')"
    >Amount</ae-label>
    <ae-amount-input
      :id="`${_uid}-currency`"
      name="currency"
      :value="{ amount, symbol: 'AE' }"
      @input="value => amount = value.amount"
      v-validate:amount="`required|decimal|min_value_exclusive:0|max_value:${maxAmount}`"
      data-vv-delay="1"
      placeholder="0.00"
      :units="[{ symbol: 'AE', name: 'æternity' }]"
    />
    <div class="fiat-amount">≈ {{fiatAmount}} CHF</div>

    <ae-button
      @click="send"
      type="dramatic"
      class="send-button"
      :inactive="errors.any()"
    >
      <img slot="icon" :src="require('emoji-datasource-apple/img/apple/64/1f4b8.png')" />
      Make Transaction
    </ae-button>
  </mobile-page>
</template>

<style lang="css" src="swiper/dist/css/swiper.css" />
<script src="./Transfer.js" />
<style lang="scss" src="../../components/MobilePageContent.scss" scoped />
<style lang="scss" src="./Transfer.scss" scoped />
