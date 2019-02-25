/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { capitalize } from 'lodash-es';
import AePopover from '../components/AePopover.vue';

storiesOf('AePopover', module)
  .add('origin props', () => ({
    components: { AePopover },
    template: `
      <div>
        <button
          ref="button"
          style="margin: 50px"
          @click="showPopover = !showPopover"
        >
          Toggle popover
        </button>
        <AePopover
          :anchor="showPopover ? $refs.button : null"
          :anchor-origin="anchorOrigin"
          :transform-origin="transformOrigin"
          style="min-width: 130px; min-height: 40px; border: 1px solid red"
        >
          Popover content
        </AePopover>
        
        <form ref="form">
          <template v-for="field in ['anchorOrigin', 'transformOrigin']">
            <fieldset v-for="direction in ['vertical', 'horizontal']">
              <legend>{{ field }}.{{ direction }}</legend>
              <label v-for="value in values[direction]">
                <input
                  v-model="$data[field][direction]"
                  type="radio"
                  :value="value"
                >
                {{ value | capitalize }}
              </label>
            </fieldset>
          </template>
        </form>
        <button @click="showPopover = !showPopover">
          Toggle popover
        </button>
      </div>`,
    filters: { capitalize },
    data: () => ({
      showPopover: false,
      anchorOrigin: ({ vertical: 'top', horizontal: 'left' }),
      transformOrigin: ({ vertical: 'top', horizontal: 'left' }),
      values: {
        vertical: ['top', 'center', 'bottom'],
        horizontal: ['left', 'center', 'right'],
      },
    }),
  }));
