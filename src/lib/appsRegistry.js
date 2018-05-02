export const DEFAULT_ICON = 'static/icons/aepps/default.svg'

export const appsRegistry = {
  1: {
    name: 'Proof',
    icon: 'static/icons/aepps/proof.svg',
    path: `${process.env.IS_STAGE ? 'stage-' : ''}proof.aepps.com`
  },
  2: {
    name: 'Transfer',
    icon: 'static/icons/aepps/transfer.svg',
    path: 'transfer'
  },
  3: {
    name: 'Wall',
    icon: 'static/icons/aepps/wall.svg',
    path: 'wall.aepps.com'
  },
  4: {
    name: 'Settings',
    path: 'settings'
  },
  5: {
    name: 'Addresses',
    icon: 'static/icons/aepps/addresses.svg',
    iconFullSize: true,
    path: 'addresses'
  }
}
