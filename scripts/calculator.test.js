const {
  isNumber,
  isOperation
} = require('./calculator');

test('isNumber identifies numbers', () => {
    expect(isNumber('5')).toBe(true);
    expect(isNumber('x')).toBe(false);
    expect(isNumber('3672e')).toBe(false);
    expect(isNumber('&')).toBe(false);
    expect(isNumber('300')).toBe(true);
});

test('isOperation identifies operations', () => {
  expect(isOperation('5')).toBe(false);
  expect(isOperation('+')).toBe(true);
  expect(isOperation('=')).toBe(false);
});