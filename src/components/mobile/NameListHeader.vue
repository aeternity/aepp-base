<template>
  <div class="name-list-header">
    <Guide>
      <em>{{ $t('name.title') }}</em>
    </Guide>

    <div>
      <ButtonFlat :to="{ name: 'name-list', params: { view: 'ending-soonest' } }">
        <Clock />
      </ButtonFlat>
      <ButtonFlat :to="{ name: 'name-list-character-length' }">
        3-4…
      </ButtonFlat>
      <ButtonFlat :to="{ name: 'name-list', params: { view: 'max-bid' } }">
        <ArrowChart />
      </ButtonFlat>
      <ButtonFlat :to="{ name: 'name-list-personal' }">
        <Contacts />
      </ButtonFlat>
    </div>
  </div>
</template>

<script>
import Guide from '../Guide.vue';
import ButtonFlat from './ButtonFlat.vue';
import { Clock, ArrowChart, Contacts } from '../icons';

export default {
  components: {
    Guide, ButtonFlat, Clock, ArrowChart, Contacts,
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/functions';

.name-list-header {
  margin-bottom: rem(30px);
}
</style>
