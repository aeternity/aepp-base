import transferIcon from '../assets/icons/aepps/transfer.svg'
import settingsIcon from '../assets/icons/aepps/settings.svg'
import addressesIcon from '../assets/icons/aepps/addresses.svg'

export { default as DEFAULT_ICON } from '../assets/icons/aepps/default.svg'

export const appsRegistry = {
  2: {
    name: 'Transfer',
    icon: transferIcon,
    path: 'transfer'
  },
  4: {
    name: 'Settings',
    icon: settingsIcon,
    path: 'settings',
    unremovable: true
  },
  5: {
    name: 'Addresses',
    icon: addressesIcon,
    iconFullSize: true,
    path: 'addresses'
  }
}
