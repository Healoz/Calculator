// Unit testing using Jest
const {
  isNumber,
  isOperation,
  isClear,
  isDelete,
  isEquals,
  isDecimal,
  isPercent,
  getCurrentNumber,
  handlePercentage,
  handleDecimals,
  lastSelectedWasOperation,
  lastSelectedWasPercent
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

// Empty test blocks for the rest
test('isClear identifies "C" as clear', () => {
  expect(isClear('5')).toBe(false);
  expect(isClear('C')).toBe(true);
  expect(isClear('c')).toBe(false);
  expect(isClear('Clear')).toBe(false);
});

test('isDelete identifies "DEL" as delete', () => {
  expect(isDelete('DEL')).toBe(true);
  expect(isDelete('DELETE')).toBe(false);
});

test('isEquals identifies "=" as equals', () => {
  expect(isEquals('=')).toBe(true);
  expect(isEquals('==')).toBe(false);
});

test('isDecimal identifies "." as decimal', () => {
  expect(isDecimal('.')).toBe(true);
  expect(isDecimal(',')).toBe(false);
  expect(isDecimal('..')).toBe(false);
});

test('isPercent identifies "%" as percent', () => {
  expect(isPercent('%')).toBe(true);
  expect(isPercent('percent')).toBe(false);
  expect(isPercent('%%')).toBe(false);
});

test('getCurrentNumber returns correct number segment from expression', () => {
  expect(getCurrentNumber('12+34')).toBe('34');
  expect(getCurrentNumber('7x8')).toBe('8');
  expect(getCurrentNumber('100÷25')).toBe('25');
  expect(getCurrentNumber('42')).toBe('42');
  expect(getCurrentNumber('')).toBe('');
});

test('handlePercentage converts percentages to decimals', () => {
  expect(handlePercentage('50%')).toBe('0.5');
  expect(handlePercentage('25% + 10%')).toBe('0.25 + 0.1');
  expect(handlePercentage('100 + 5%')).toBe('100 + 0.05');
  expect(handlePercentage('5')).toBe('5');
});

test('handleDecimals trims long decimals to three places', () => {
  expect(handleDecimals(3.14159)).toBe(3.142);
  expect(handleDecimals(2.71828)).toBe(2.718);
  expect(handleDecimals(1.1)).toBe(1.1); // no trimming needed
  expect(handleDecimals(42)).toBe(42); // integer, no decimal
});

test('lastSelectedWasOperation returns true when last char is an operation', () => {
  expect(lastSelectedWasOperation('12+')).toBe(true);
  expect(lastSelectedWasOperation('7x')).toBe(true);
  expect(lastSelectedWasOperation('100')).toBe(false);
  expect(lastSelectedWasOperation('')).toBe(false);
});

test('lastSelectedWasPercent returns true when last char is a percent symbol', () => {
  expect(lastSelectedWasPercent('50%')).toBe(true);
  expect(lastSelectedWasPercent('100+5%')).toBe(true);
  expect(lastSelectedWasPercent('200')).toBe(false);
  expect(lastSelectedWasPercent('')).toBe(false);
});
