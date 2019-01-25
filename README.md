# Aconcagua
Measure and Units model for Javascript

## Examples

```javascript
const { BaseUnit } = require('aconcagua');

const dollar = new BaseUnit('dollar');
const oneDollar = dollar.with(1);
oneDollar.amount(); // 1
const tenDollars = dollar.with(10);
const elevenDollars = tenDollars.plus(oneDollar);
elevenDollars.amount(); // 11
elevenDollars.unitName(); // 'dollars'
````
