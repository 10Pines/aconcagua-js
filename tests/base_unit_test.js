const { Unit, BaseUnit, SimpleMeasure } = require('../aconcagua');
const { suite, test, assertEquals } = require('@pmoo/testy');

let assertUnitsAreEqual = (actual, expected) => assertEquals(actual, expected, Unit.equals);

let
  dollar = new BaseUnit('dollar'),
  tenDollars = new SimpleMeasure(10, dollar);

suite('Base units', () => {
  test('base unit on a base unit', () =>
    assertUnitsAreEqual(dollar.baseUnit(), dollar)
  );
  
  test('base unit - convert amount to base unit', () => {
    assertEquals(dollar.convertAmountToBaseUnit(0), 0);
    assertEquals(dollar.convertAmountToBaseUnit(10), 10);
  });
  
  test('base unit - convert to base unit', () => {
    assertEquals(dollar.convertToBaseUnit(tenDollars), tenDollars);
  });
});