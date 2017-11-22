<template>
  <table class='ae-transaction-summary'>
    <tbody>
      <tr>
        <th> From: </th>
        <td><ae-address :show-avatar='true' size='medium' :address='addressFrom'/></td>
      </tr>
      <tr>
        <th> To: </th>
        <td><ae-address :show-avatar='true' size='medium' :address='addressTo'/></td>
      </tr>
      <tr>
        <th> Amount: </th>
        <td> {{amount}} ETH
          <span class='amount-in-fiat'>
            ≈ {{amountInFiat}} USD
          </span>
        </td>
      </tr>
      <tr>
        <th>Fee:</th>
        <td>
          <span v-if='gas'>
            {{gas.total | fromWei }} ETH
          </span>
          <span class='amount-in-fiat'>
            <!--≈ {{amountInFiat}} USD-->
          </span>
        </td>
      </tr>
      <tr>
        <th>Total:</th>
        <td>
          <span v-if='gas'>
            {{ total | fromWei }} ETH
          </span>
          <span class='amount-in-fiat'>
            <!--≈ {{amountInFiat}} USD-->
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script src="./aeTransactionSummary.js"/>
<style src="./aeTransactionSummary.scss"/>
