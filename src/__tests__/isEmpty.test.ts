import isEmpty from '../lib/isEmpty'

test('basic', () => {
    const a = {}
    expect(isEmpty(a)).toBe(true)
})

test('basic again', () => {
    const a = '1'
    expect(isEmpty(a)).toBe(false)
});