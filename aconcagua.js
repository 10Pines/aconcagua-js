class BaseUnit {
  constructor(name) {
    this._name = name;
  }
  
  nameForOne() { return this._name };
  nameForMany() { return `${this._name}s` }
}

class SimpleMeasure {
  constructor(amount, unit) {
    this._amount = amount;
    this._unit = unit;
  }
  
  unitName() { return this._unit.nameForOne(); }
  
  negated() { return new SimpleMeasure(this._amount * -1, this._unit) }
}

module.exports = {
  BaseUnit: BaseUnit,
  SimpleMeasure: SimpleMeasure,
};