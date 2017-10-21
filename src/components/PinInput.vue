<template>
  <div>
    <input
      :id="id"
      class="pin-input"
      type="password"
      pattern=".{4,}"
      title="4 characters minimum"
      required placeholder="Enter PIN..."
      @input="handleChange"
    >
  </div>
</template>

<script src='./PinInput.js'/>
<style scoped src='./PinInput.css'/>
