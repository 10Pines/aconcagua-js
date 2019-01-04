const { Unit, BaseUnit, SimpleMeasure, NullUnit } = require('../aconcagua');
const { suite, test, assertEquals } = require('@pmoo/testy');

let assertUnitsAreEqual = (actual, expected) => assertEquals(actual, expected, Unit.equals);

let
  dollar = new BaseUnit('dollar'),
  tenDollars = new SimpleMeasure(10, dollar);

suite('Base units', () => {
  test('returning the base unit', () => assertUnitsAreEqual(dollar.baseUnit(), dollar));
  
  test('convert amount to base unit', () => {
    assertEquals(dollar.convertAmountToBaseUnit(0), 0);
    assertEquals(dollar.convertAmountToBaseUnit(10), 10);
  });
  
  test('convert to base unit', () =>
    assertEquals(dollar.convertToBaseUnit(tenDollars), tenDollars)
  );
  
  test('denominator is the null unit', () => assertEquals(dollar.denominator(), NullUnit));
  
  test('basic name', () => assertEquals(dollar.name(), 'dollar'));
  
  test('name for one', () => assertEquals(dollar.nameForOne(), 'dollar'));
  test('default name for many', () => assertEquals(dollar.nameForMany(), 'dollars'));
  
  test('name for quantity', () => {
    assertEquals(dollar.nameFor(1), dollar.nameForOne());
    assertEquals(dollar.nameFor(-1), dollar.nameForOne());
    assertEquals(dollar.nameFor(0.75), dollar.nameForMany());
    assertEquals(dollar.nameFor(2), dollar.nameForMany());
  });
});
