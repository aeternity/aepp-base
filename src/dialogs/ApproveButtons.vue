<template>
  <div class="bottom-buttons">
    <ae-button
      size="smaller"
      type="normal"
      @click="reject">
      <ae-icon
        slot="icon"
        name="error"/>
      {{ rejectLabel }}
    </ae-button>
    <ae-button
      size="smaller"
      type="dramatic"
      @click="approve">
      <ae-icon
        slot="icon"
        name="check"/>
      {{ approveLabel }}
    </ae-button>
  </div>
</template>

<script src="./ApproveButtons.js"/>
<style scoped src="./ApproveButtons.css"/>
