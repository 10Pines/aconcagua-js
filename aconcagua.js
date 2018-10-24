class BaseUnit {
  constructor(name) {
    this._name = name;
  }
  
  nameForOne() { return this._name };
  nameForMany() { return `${this._name}s` }
  with(amount) { return new SimpleMeasure(amount, this) }
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
  plus(measure) {
    return new SimpleMeasure(this.amount() + measure.amount(), this.unit())
  }
}

module.exports = {
  BaseUnit: BaseUnit,
  SimpleMeasure: SimpleMeasure,
};