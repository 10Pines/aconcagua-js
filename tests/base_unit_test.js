'use strict';

const { Unit, BaseUnit, SimpleMeasure, NullUnit } = require('../aconcagua');
const { suite, test, assert } = require('@pmoo/testy');

let assertUnitsAreEqual = (actual, expected) => assert.areEqual(actual, expected, Unit.equals);

let
  dollar = new BaseUnit('dollar'),
  tenDollars = new SimpleMeasure(10, dollar);

suite('Base units', () => {
  test('returning the base unit', () => assertUnitsAreEqual(dollar.baseUnit(), dollar));
  
  test('convert amount to base unit', () => {
    assert.areEqual(dollar.convertAmountToBaseUnit(0), 0);
    assert.areEqual(dollar.convertAmountToBaseUnit(10), 10);
  });
  
  test('convert to base unit', () =>
    assert.areEqual(dollar.convertToBaseUnit(tenDollars), tenDollars)
  );
  
  test('denominator is the null unit', () => assert.areEqual(dollar.denominator(), NullUnit));
  
  test('basic name', () => assert.areEqual(dollar.name(), 'dollar'));
  
  test('name for one', () => assert.areEqual(dollar.nameForOne(), 'dollar'));
  test('default name for many', () => assert.areEqual(dollar.nameForMany(), 'dollars'));
  
  test('name for quantity', () => {
    assert.areEqual(dollar.nameFor(1), dollar.nameForOne());
    assert.areEqual(dollar.nameFor(-1), dollar.nameForOne());
    assert.areEqual(dollar.nameFor(0.75), dollar.nameForMany());
    assert.areEqual(dollar.nameFor(2), dollar.nameForMany());
  });
});
