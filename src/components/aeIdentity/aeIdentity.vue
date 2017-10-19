<template>
	<div :class="{ 'identity-wrap' : true, 'show-payment-ui' : showPaymentUi }">

		<div v-if='showPaymentUi' class="payment">
			<p class="center">
			Please confirm the transaction of
			<br>
			<span class="price">
				<span class="amount">{{paymentRequest.amount}}</span>
				<span class="currency-symbol">ETH</span>
			</span>
			<br>
			</p>
			<div @click='pay' class="pink button pay">
				Pay {{paymentRequest.amount}} ETH
			</div>
			<div @click='cancel' class="button">
				cancel
			</div>
		</div>

		<div @click='toggle' :class="{identity:true, collapsed : collapsed, 'show-payment-ui' : showPaymentUi }">
			<div class="left">
				<ae-identity-avatar :address='identity.address'/>
        <ae-identity-info :identity='identity'/>
			</div>
			<div class="right">
				<div class="balance">
					<span class="amount">{{identity.balance}}</span>
					<span class="currency-symbol">ETH</span>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script src='./aeIdentity.js'/>

<style scoped>
</style>
