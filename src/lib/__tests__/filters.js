import { formatWei } from '../filters'

it('formatWei', () => {
  expect(formatWei(123456789012345)).toBe(123456789012345)
})
