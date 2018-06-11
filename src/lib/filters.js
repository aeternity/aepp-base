import { round } from 'lodash'

export const formatWei = value => round(value / 1e12, 3)
