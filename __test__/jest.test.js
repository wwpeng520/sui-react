test('number test', () => {
  expect(2 + 2).toBe(4);
  expect(2 + 3).not.toBe(4);

  expect(4).toBeGreaterThan(3);
  expect(4).toBeLessThan(8);
});

test('object test', () => {
  // expect({ name: 'lili' }).toBe({ name: 'lili' });
  expect({ name: 'lili' }).toEqual({ name: 'lili' });
});

// 获取数组最大值
function findMax(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('not array');
  }
  return Math.max(...arr);
}

test('fn findMax test', () => {
  expect(findMax([1, 2, 4, 3])).toBe(4);
});
