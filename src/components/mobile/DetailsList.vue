<template>
  <div class="details-list">
    <template v-for="fieldName in Object.keys(fieldRenderers)">
      <component
        :is="fieldRenderers[fieldName]"
        v-if="object[fieldName]"
        :key="fieldName"
        :value="object[fieldName]"
      />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    object: { type: Object, required: true },
    fieldRenderers: { type: Object, required: true },
  },
};
</script>
