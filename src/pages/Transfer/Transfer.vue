<template>
  <mobile-page
    class="transfer"
    title="Transfer">
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
      :options="swiperOptionsTo"
      class="swiper-container"
    >
      <swiper-slide
        v-for="i in identitiesTo"
        :key="i.address">
        <ae-identity
          :active="false"
          :identity="i"
          :collapsed="false"
          size="big" />
      </swiper-slide>
      <div
        slot="pagination"
        class="swiper-pagination" />
    </swiper>
    <div v-else>
      <ae-label
        :for="`${_uid}-addressTo`"
        :help-text="errors.first('addressTo')"
        help-type="dramatic"
      >Receiving address</ae-label>
      <ae-address-input
        v-validate="'required|min:51|max:53'"
        :id="`${_uid}-addressTo`"
        v-model="to"
        name="addressTo"
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
      :help-text="errors.first('currency')"
      help-type="dramatic"
    >Amount</ae-label>
    <ae-amount-input
      v-validate:amount="`required|decimal|min_value_exclusive:0|max_value:${maxAmount}`"
      :id="`${_uid}-currency`"
      :value="{ amount, symbol: 'AE' }"
      :units="[{ symbol: 'AE', name: 'æternity' }]"
      name="currency"
      data-vv-delay="1"
      placeholder="0.00"
      @input="value => amount = value.amount"
    />
    <div class="fiat-amount">≈ {{ fiatAmount }} CHF</div>

    <ae-button
      :inactive="errors.any()"
      type="dramatic"
      class="send-button"
      @click="send"
    >
      <img
        slot="icon"
        :src="require('emoji-datasource-apple/img/apple/64/1f4b8.png')" >
      Make Transaction
    </ae-button>
  </mobile-page>
</template>

<style lang="css" src="swiper/dist/css/swiper.css" />
<script src="./Transfer.js" />
<style lang="scss" src="../../components/MobilePageContent.scss" scoped />
<style lang="scss" src="./Transfer.scss" scoped />
