const { BaseUnit, SimpleMeasure } = require('./aconcagua');
const { suite, test, assertEquals } = require('@pmoo/testy');

let
  dollar = new BaseUnit('dollar'),
  zeroDollars = new SimpleMeasure(0, dollar),
  oneDollar = new SimpleMeasure(1, dollar),
  tenDollars = new SimpleMeasure(10, dollar),
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
  });
});