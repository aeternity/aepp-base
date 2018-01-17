<template>
  <button :class="[sizeModifier, typeModifier, cssClass, 'label', 'ae-button']"  @click="$emit('click')">
    <!-- Button icon -->
    <slot name='icon' :class="['ae-button__icon', sizeModifier, hasLabelModifier]">
    </slot>

    <!-- Button content -->
    <slot v-if='hasLabel'></slot>
  </button>
</template>

<script src='./aeButton.js'/>
<style scoped src='./aeButton.scss' lang='scss'/>
