const { BaseUnit, SimpleMeasure } = require('./aconcagua');
const { suite, test, assertEquals, assertTrue, assertFalse } = require('@pmoo/testy');

let
  dollar = new BaseUnit('dollar'),
  zeroDollars = new SimpleMeasure(0, dollar),
  oneDollar = new SimpleMeasure(1, dollar),
  tenDollars = new SimpleMeasure(10, dollar),
  elevenDollars = new SimpleMeasure(11, dollar),
  minusTenDollars = new SimpleMeasure(-10, dollar);

suite('Simple Measures', () => {
  test('unit names', () => {
    assertEquals(oneDollar.unitName(), dollar.nameForOne());
    assertEquals(tenDollars.unitName(), dollar.nameForMany());
    assertEquals(zeroDollars.unitName(), dollar.nameForMany());
    assertEquals(oneDollar.negated().unitName(), dollar.nameForOne());
  });
  
  test('negation', () => {
    assertEquals(tenDollars.negated(), minusTenDollars);
    assertEquals(zeroDollars.negated(), zeroDollars);
  });
  
  test('negative check', () => {
    assertTrue(minusTenDollars.isNegative());
    assertFalse(oneDollar.isNegative());
  });
  
  test('positive check', () => {
    assertFalse(minusTenDollars.isPositive());
    assertTrue(oneDollar.isPositive());
    assertTrue(zeroDollars.isPositive());
  });
  
  test('"with" message', () => {
    assertEquals(dollar.with(10), tenDollars);
  });
  
  test('addition - values', () => {
    assertEquals(tenDollars.plus(oneDollar), elevenDollars);
    assertEquals(tenDollars.plus(oneDollar).amount(), 11);
    assertEquals(tenDollars.plus(oneDollar).unit(), dollar);
  });
  
  test('addition - neutral', () => {
    assertEquals(tenDollars.plus(zeroDollars), tenDollars)
  });
  
  test('addition - commutativity', () => {
    assertEquals(tenDollars.plus(oneDollar), oneDollar.plus(tenDollars))
  });
  
  test('addition - associativity', () => {
    assertEquals(tenDollars.plus(zeroDollars.plus(oneDollar)), tenDollars.plus(zeroDollars).plus(oneDollar))
  });
});