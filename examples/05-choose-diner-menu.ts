import { peco, PecoOption } from '../src';

const candidates = {
  appetizers: [
    'Pickled Shrimp with Creamy Spinach Dip',
    'Deviled Eggs With Country Ham',
    'Blue-Cheese-and-Walnut Dip with Waldorf Crudités',
    'Traditional Mexican Guacamole',
    'Radish-Anchovy Canapes',
  ],
  mainDish: [
    'Boeuf Bourguignon',
    'Potatoes Dauphinoise',
    'Cassoulet',
    'Croque Monsieur',
    'Croque Madame',
    'Jambon-Beurre',
    'Concombre a la Menthe',
    'Cherry Clafoutis',
  ],
  drinks: [
    'Château Léoville Barton St.-Julien+',
    'Mayacamas Cabernet Sauvignon Mount Veeder+',
    'San Giusto a Rentennano Chianti Classico+',
    'Groth Cabernet Sauvignon Oakville Reserve+',
    "Roederer Estate Brut Anderson Valley L'Ermitage+",
    'Château de Beaucastel Châteauneuf-du-Pape+',
    'Ramey Chardonnay Napa Valley Carneros Hyde Vineyard+',
    'Château Pichon Baron Pauillac+',
    'Penfolds Shiraz Barossa Valley RWT Bin 798+',
    'Viña Almaviva Puente Alto+',
  ],
};
const result: any = {};
const onCancel = (): void => console.log('canceled');
const options = (prompt: string): PecoOption => ({
  onCancel: 'reject',
  layout: 'bottom-up',
  selectionPrefix: '*',
  prompt,
});

const selectAppetizers = (): Promise<void> =>
  peco(candidates.appetizers, options('appetizers'))
    .then(appetizers => {
      result.appetizers = appetizers;
      return selectMainDish();
    })
    .catch(onCancel);

const selectMainDish = (): Promise<void> =>
  peco(candidates.mainDish, options('main menu'))
    .then(mainDish => {
      result.mainDish = mainDish;
      return selectDrinks();
    })
    .catch(selectAppetizers);

const selectDrinks = (): Promise<void> =>
  peco(candidates.drinks, options('drinks'))
    .then(drinks => {
      result.drinks = drinks;
      return result;
    })
    .catch(selectMainDish);

/**
 * Asking dinner menu
 */

(async (): Promise<void> => {
  await selectAppetizers();
  console.log(result);
})();
