'use strict';

class Unit {
}

const NullUnit = {};

class BaseUnit extends Unit {
  constructor(nameForOne) {
    super();
    this._nameForOne = nameForOne;
  }
  
  name() {
    return this.nameForOne();
  }

  nameForOne() {
    return this._nameForOne;
  }

  nameForMany() {
    return `${this.nameForOne()}s`;
  }

  nameFor(amount) {
    return Math.abs(amount) === 1 ? this.nameForOne() : this.nameForMany();
  }
  
  with(amount) {
    return new SimpleMeasure(amount, this);
  }

  baseUnit() {
    return this;
  }

  convertAmountToBaseUnit(amount) {
    return amount;
  }

  convertToBaseUnit(measure) {
    return measure;
  }

  denominator() {
    return NullUnit;
  }
  
  equals(unit) {
    return this.name() === unit.name();
  }
}

class Measure {
}

class SimpleMeasure extends Measure {
  constructor(amount, unit) {
    super();
    this._amount = amount;
    this._unit = unit;
  }
  
  amount() {
    return this._amount;
  }

  unit() {
    return this._unit;
  }

  unitName() {
    return this.unit().nameFor(this.amount());
  }

  negated() {
    return new SimpleMeasure(this.amount() * -1, this.unit());
  }

  isNegative() {
    return this.amount() < 0;
  }

  isPositive() {
    return !this.isNegative();
  }
  
  equals(measure) {
    return this.amount() === measure.amount() && this.unit().equals(measure.unit());
  }
  
  plus(measure) {
    if (measure === 0) return this;
    return new SimpleMeasure(this.amount() + measure.amount(), this.unit());
  }
  
  minus(measure) {
    if (measure === 0) return this;
    return new SimpleMeasure(this.amount() - measure.amount(), this.unit());
  }
}

module.exports = {
  Unit,
  NullUnit,
  BaseUnit,
  Measure,
  SimpleMeasure,
};
