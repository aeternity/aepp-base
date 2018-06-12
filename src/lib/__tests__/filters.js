import { roundToken } from '../filters'

it('roundToken', () => {
  expect(roundToken(123456789012345)).toBe(123456789012345)
})
