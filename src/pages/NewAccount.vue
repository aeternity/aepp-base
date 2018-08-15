<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'intro' }"
    title="New Account"
    close-button
  >
    <h1>
      Set up your aeternity account
    </h1>
    <p>
      We are about to create a recovery phrase, please keep it safe on a piece of paper.
      Check the spelling of each word and never create a screenshot or photo of this phrase.
    </p>

    <ae-button
      slot="footer"
      :to="{ name: 'new-account-create' }"
      size="medium"
      type="exciting"
    >
      Generate Recovery Phrase
    </ae-button>
  </mobile-page>
</template>

<script>
import { AeButton } from '@aeternity/aepp-components';
import MobilePage from '../components/MobilePage';

export default {
  components: { MobilePage, AeButton },
};
</script>

<style lang="scss" src="../components/MobilePageContent.scss" scoped />
