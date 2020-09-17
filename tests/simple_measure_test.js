'use strict';

const { BaseUnit, SimpleMeasure } = require('../aconcagua');
const { suite, test, assert } = require('@pmoo/testy');

const
  dollar = new BaseUnit('dollar'),
  zeroDollars = new SimpleMeasure(0, dollar),
  oneDollar = new SimpleMeasure(1, dollar),
  tenDollars = new SimpleMeasure(10, dollar),
  elevenDollars = new SimpleMeasure(11, dollar),
  minusTenDollars = new SimpleMeasure(-10, dollar);

suite('Simple Measures', () => {
  test('unit names', () => {
    assert.areEqual(oneDollar.unitName(), dollar.nameForOne());
    assert.areEqual(tenDollars.unitName(), dollar.nameForMany());
    assert.areEqual(zeroDollars.unitName(), dollar.nameForMany());
    assert.areEqual(oneDollar.negated().unitName(), dollar.nameForOne());
  });
  
  test('negation', () => {
    assert.areEqual(tenDollars.negated(), minusTenDollars);
    assert.areEqual(zeroDollars.negated(), zeroDollars);
    assert.areEqual(oneDollar.negated().negated(), oneDollar);
  });
  
  test('negative check', () => {
    assert.isTrue(minusTenDollars.isNegative());
    assert.isFalse(oneDollar.isNegative());
  });
  
  test('positive check', () => {
    assert.isFalse(minusTenDollars.isPositive());
    assert.isTrue(oneDollar.isPositive());
    assert.isTrue(zeroDollars.isPositive());
  });
  
  test('"with" message', () =>
    assert.areEqual(dollar.with(10), tenDollars)
  );
  
  test('addition - values', () => {
    assert.areEqual(tenDollars.plus(oneDollar), elevenDollars);
    assert.areEqual(tenDollars.plus(oneDollar).amount(), 11);
    assert.areEqual(tenDollars.plus(oneDollar).unit(), dollar);
  });
  
  test('addition - neutral', () =>
    assert.areEqual(tenDollars.plus(zeroDollars), tenDollars)
  );
  
  test('addition - commutativity', () =>
    assert.areEqual(tenDollars.plus(oneDollar), oneDollar.plus(tenDollars))
  );
  
  test('addition - associativity', () =>
    assert.areEqual(tenDollars.plus(zeroDollars.plus(oneDollar)), tenDollars.plus(zeroDollars).plus(oneDollar))
  );
  
  test('addition - number zero', () =>
    assert.areEqual(tenDollars.plus(0), tenDollars)
  );
  
  test('substraction - values', () => {
    assert.areEqual(elevenDollars.minus(oneDollar), tenDollars);
    assert.areEqual(elevenDollars.minus(oneDollar).amount(), 10);
    assert.areEqual(tenDollars.minus(oneDollar).unit(), dollar);
  });
  
  test('substraction - neutral', () =>
    assert.areEqual(tenDollars.minus(zeroDollars), tenDollars)
  );
  
  test('substraction - associativity', () =>
    assert.areEqual(elevenDollars.minus(oneDollar.minus(zeroDollars)), elevenDollars.minus(oneDollar).minus(zeroDollars))
  );
  
  test('substraction - number zero', () =>
    assert.areEqual(tenDollars.minus(0), tenDollars)
  );
});
