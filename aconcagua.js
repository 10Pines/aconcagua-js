class Unit {
  static equals(unitOne, unitTwo) { return unitOne.equals(unitTwo) }
}

class BaseUnit {
  constructor(name) { this._name = name; }
  
  name() { return this._name }
  nameForOne() { return this.name() };
  nameForMany() { return `${this.name()}s` }
  with(amount) { return new SimpleMeasure(amount, this) }
  baseUnit() { return this }
  convertAmountToBaseUnit(amount) { return amount }
  convertToBaseUnit(measure) { return measure }
  
  equals(unit) { return this.name() === unit.name() }
}

class Measure {
  static equals(measureOne, measureTwo) { return measureOne.equals(measureTwo) }
}

class SimpleMeasure {
  constructor(amount, unit) {
    this._amount = amount;
    this._unit = unit;
  }
  
  amount() { return this._amount }
  unit() { return this._unit }
  unitName() { return this.unit().nameForOne(); }
  negated() { return new SimpleMeasure(this.amount() * -1, this.unit()) }
  isNegative() { return this.amount() < 0 }
  isPositive() { return !this.isNegative() }
  
  equals(measure) {
    return this.amount() === measure.amount() && this.unit().equals(measure.unit())
  }
  
  plus(measure) {
    if (measure === 0) return this;
    return new SimpleMeasure(this.amount() + measure.amount(), this.unit())
  }
  
  minus(measure) {
    if (measure === 0) return this;
    return new SimpleMeasure(this.amount() - measure.amount(), this.unit())
  }
}

module.exports = {
  Unit: Unit,
  BaseUnit: BaseUnit,
  Measure: Measure,
  SimpleMeasure: SimpleMeasure,
};