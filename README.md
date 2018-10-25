# Aconcagua
Measure and Units model for Javascript

## Examples

```javascript
let dollar = new BaseUnit('dollar');
let oneDollar = dollar.with(1);
let tenDollars = dollar.with(10);
let elevenDollars = tenDollars.plus(oneDollar);
elevenDollars.unitName() // 'dollars'
```