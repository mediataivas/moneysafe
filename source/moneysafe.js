const m$ = ({
  centsPerDollar = 100,
  decimals = 2,
  symbol = '$',
  round = Math.round,
  symbolAfter = false,
  symbolDelimiter = ''
} = {}) => {
  function $ (dollars, {
    cents = round(dollars * centsPerDollar),
    in$ = round(cents) / centsPerDollar
  } = {}) {
    const add = a$ => $.of(cents + a$);
    const subtract = a$ => $.of(cents - a$);

    return Object.assign(add, {
      valueOf () {
        return cents;
      },
      get cents () {
        return round(cents);
      },
      get $ () {
        return in$;
      },
      round () {
        return $.of(round(cents));
      },
      add,
      subtract,
      constructor: $,
      toString () {
        if(symbolAfter) {
          return `${ this.$.toFixed(decimals) }${ symbolDelimiter }${ symbol }`;
        } else {
          return `${ symbol }${ symbolDelimiter }${ this.$.toFixed(decimals) }`;
        }
      }
    });
  }

  $.of = cents => $(undefined, { cents });
  $.cents = cents => $.of(round(cents));

  return $;
};

const $ = m$();
const in$ = n => $.cents(n).$;
const eur = m$({symbol: '€', symbolDelimiter: ' ', symbolAfter: true});
const inEur = n => eur.cents(n).$;

module.exports = {
  m$,
  $,
  in$,
  eur,
  inEur,
};
