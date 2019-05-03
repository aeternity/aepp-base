/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import Guide from '../components/Guide.vue';
import AeFraction from '../components/AeFraction.vue';
import { lorem } from './mock-data';

storiesOf('Guide', module)
  .add('with Fraction', () => ({
    components: { Guide, AeFraction },
    template: `
      <div>
        <guide size="small">
          <ae-fraction
            slot="icon"
            numerator="1"
            denominator="8"
          />
          ${lorem[4]}
        </guide>
        <guide>
          <ae-fraction
            slot="icon"
            numerator="1"
            denominator="8"
          />
          ${lorem[4]}
        </guide>
        <guide size="big">
          <ae-fraction
            slot="icon"
            numerator="1"
            denominator="8"
          />
          ${lorem[4]}
        </guide>
      </div>`,
  }));
