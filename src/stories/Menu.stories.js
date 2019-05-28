/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import Menu from '../components/Menu.vue';
import MenuItem from '../components/MenuItem.vue';
import { Copy, Edit } from '../components/icons';

storiesOf('Menu', module)
  .add('transfer', () => ({
    components: {
      Menu, MenuItem, Copy, Edit,
    },
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
            <Copy />Copy Address
          </MenuItem>
          <MenuItem>
            <Edit />Rename
          </MenuItem>
        </Menu>
      </div>`,
    data: () => ({ showMenu: false }),
  }));
