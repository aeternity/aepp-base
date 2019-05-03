/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import Progress from '../components/Progress.vue';
import ProgressFake from '../components/ProgressFake.vue';

storiesOf('Progress', module)
  .add('default', () => ({
    components: { Progress },
    template: `
      <div>
        <Progress
          :value="value"
          max="100"
        />
        <br>
        <button
          v-for="v in new Array(5).fill().map((_, idx) => idx * 25)"
          @click="value = v"
        >
          Set {{ v }}%
        </button>
      </div>
    `,
    data: () => ({ value: 25 }),
  }))
  .add('fake', () => ({
    components: { ProgressFake },
    template: `
      <div>
        <ProgressFake v-if="show" />
        <button @click="show = !show">
          Toggle fake progress
        </button>
      </div>
    `,
    data: () => ({ show: true }),
  }));
