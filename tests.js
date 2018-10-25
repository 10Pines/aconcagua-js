const { BaseUnit, Measure, SimpleMeasure } = require('./aconcagua');
const { suite, test, assertEquals, assertTrue, assertFalse } = require('@pmoo/testy');

let assertUnitsAreEqual = (actual, expected) => assertEquals(actual, expected, Measure.equals);

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
    assertUnitsAreEqual(tenDollars.negated(), minusTenDollars);
    assertUnitsAreEqual(zeroDollars.negated(), zeroDollars);
    assertUnitsAreEqual(oneDollar.negated().negated(), oneDollar);
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
  
  test('"with" message', () =>
    assertUnitsAreEqual(dollar.with(10), tenDollars)
  );
  
  test('addition - values', () => {
    assertUnitsAreEqual(tenDollars.plus(oneDollar), elevenDollars);
    assertEquals(tenDollars.plus(oneDollar).amount(), 11);
    assertEquals(tenDollars.plus(oneDollar).unit(), dollar);
  });
  
  test('addition - neutral', () =>
    assertUnitsAreEqual(tenDollars.plus(zeroDollars), tenDollars)
  );
  
  test('addition - commutativity', () =>
    assertUnitsAreEqual(tenDollars.plus(oneDollar), oneDollar.plus(tenDollars))
  );
  
  test('addition - associativity', () =>
    assertUnitsAreEqual(tenDollars.plus(zeroDollars.plus(oneDollar)), tenDollars.plus(zeroDollars).plus(oneDollar))
  );
  
  test('addition - number zero', () =>
    assertUnitsAreEqual(tenDollars.plus(0), tenDollars)
  );
  
  test('substraction - values', () => {
    assertUnitsAreEqual(elevenDollars.minus(oneDollar), tenDollars);
    assertEquals(elevenDollars.minus(oneDollar).amount(), 10);
    assertEquals(tenDollars.minus(oneDollar).unit(), dollar);
  });
  
  test('substraction - neutral', () =>
    assertUnitsAreEqual(tenDollars.minus(zeroDollars), tenDollars)
  );
  
  test('substraction - associativity', () =>
    assertUnitsAreEqual(elevenDollars.minus(oneDollar.minus(zeroDollars)), elevenDollars.minus(oneDollar).minus(zeroDollars))
  );
  
  test('substraction - number zero', () =>
    assertUnitsAreEqual(tenDollars.minus(0), tenDollars)
  );
});