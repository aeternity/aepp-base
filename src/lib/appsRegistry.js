export const DEFAULT_ICON = 'static/icons/notary.svg'

export const appsRegistry = {
  1: {
    name: 'Proof',
    icon: 'static/icons/notary.svg',
    path: `${process.env.IS_STAGE ? 'stage-' : ''}proof.aepps.com`
  },
  2: {
    name: 'Transfer',
    path: 'transfer'
  },
  3: {
    name: 'Wall',
    icon: 'static/icons/wall.svg',
    path: 'wall.aepps.com'
  },
  4: {
    name: 'Network',
    path: 'network'
  },
  5: {
    name: 'Æddress Book',
    path: 'address-book'
  }
}
