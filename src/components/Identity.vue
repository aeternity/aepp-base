<<template>
  <div class="">
  </div>
</template>

<script src='./'/>
<style scoped src='./'/>template>
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
				<avatar :image='identity.avatar' :address='identity.address'></avatar>
				<div class="account-info">
					<div class="name">{{identity.name}}</div>
					<div class="address">{{identity.address}}</div>
				</div>
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

<script src='./Identity.js'/>

<style scoped>
</style>
