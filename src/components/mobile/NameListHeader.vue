<template>
  <div class="name-list-header">
    <Guide>
      <em>{{ $t('name.title') }}</em>
    </Guide>

    <ButtonGroup>
      <ButtonFlat :to="{ name: 'auction-list', params: { view: 'ending-soonest' } }">
        <Clock />
      </ButtonFlat>
      <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
      <ButtonFlat :to="{ name: 'auction-list-character-length' }"> 3-4… </ButtonFlat>
      <ButtonFlat :to="{ name: 'auction-list', params: { view: 'max-bid' } }">
        <ArrowChart />
      </ButtonFlat>
      <ButtonFlat :to="{ name: 'name-list' }" highlighted-when-exact-active>
        <Contacts />
      </ButtonFlat>
    </ButtonGroup>
  </div>
</template>

<script>
import Guide from '../Guide.vue';
import ButtonGroup from './ButtonGroup.vue';
import ButtonFlat from './ButtonFlat.vue';
import { Clock, ArrowChart, Contacts } from '../icons';

export default {
  components: {
    Guide,
    ButtonGroup,
    ButtonFlat,
    Clock,
    ArrowChart,
    Contacts,
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/functions';

.name-list-header {
  margin-bottom: functions.rem(30px);
}
</style>
