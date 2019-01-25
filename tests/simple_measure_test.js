'use strict';

const { BaseUnit, Measure, SimpleMeasure } = require('../aconcagua');
const { suite, test, assert } = require('@pmoo/testy');

const assertMeasuresAreEqual = (actual, expected) => assert.areEqual(actual, expected, Measure.equals);

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
    assertMeasuresAreEqual(tenDollars.negated(), minusTenDollars);
    assertMeasuresAreEqual(zeroDollars.negated(), zeroDollars);
    assertMeasuresAreEqual(oneDollar.negated().negated(), oneDollar);
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
    assertMeasuresAreEqual(dollar.with(10), tenDollars)
  );
  
  test('addition - values', () => {
    assertMeasuresAreEqual(tenDollars.plus(oneDollar), elevenDollars);
    assert.areEqual(tenDollars.plus(oneDollar).amount(), 11);
    assert.areEqual(tenDollars.plus(oneDollar).unit(), dollar);
  });
  
  test('addition - neutral', () =>
    assertMeasuresAreEqual(tenDollars.plus(zeroDollars), tenDollars)
  );
  
  test('addition - commutativity', () =>
    assertMeasuresAreEqual(tenDollars.plus(oneDollar), oneDollar.plus(tenDollars))
  );
  
  test('addition - associativity', () =>
    assertMeasuresAreEqual(tenDollars.plus(zeroDollars.plus(oneDollar)), tenDollars.plus(zeroDollars).plus(oneDollar))
  );
  
  test('addition - number zero', () =>
    assertMeasuresAreEqual(tenDollars.plus(0), tenDollars)
  );
  
  test('substraction - values', () => {
    assertMeasuresAreEqual(elevenDollars.minus(oneDollar), tenDollars);
    assert.areEqual(elevenDollars.minus(oneDollar).amount(), 10);
    assert.areEqual(tenDollars.minus(oneDollar).unit(), dollar);
  });
  
  test('substraction - neutral', () =>
    assertMeasuresAreEqual(tenDollars.minus(zeroDollars), tenDollars)
  );
  
  test('substraction - associativity', () =>
    assertMeasuresAreEqual(elevenDollars.minus(oneDollar.minus(zeroDollars)), elevenDollars.minus(oneDollar).minus(zeroDollars))
  );
  
  test('substraction - number zero', () =>
    assertMeasuresAreEqual(tenDollars.minus(0), tenDollars)
  );
});
