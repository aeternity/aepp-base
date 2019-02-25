/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { AeIcon } from '@aeternity/aepp-components-3';
import Menu from '../components/Menu.vue';
import MenuItem from '../components/MenuItem.vue';

storiesOf('Menu', module)
  .add('transfer', () => ({
    components: { Menu, MenuItem, AeIcon },
    template: `
      <div>
        <button
          ref="button"
          style="margin-left: 100px"
          @click="showMenu = true"
        >
          Open menu
        </button>
        
        <Menu
          :anchor="showMenu ? $refs.button : null"
          :anchor-origin="{ vertical: 'top', horizontal: 'right' }"
          :transform-origin="{ vertical: 'top', horizontal: 'right' }"
          @close="showMenu = false"
        >
          <MenuItem>
            <AeIcon name="copy" />Copy Address
          </MenuItem>
          <MenuItem>
            <AeIcon name="edit" />Rename
          </MenuItem>
        </Menu>
      </div>`,
    data: () => ({ showMenu: false }),
  }));
