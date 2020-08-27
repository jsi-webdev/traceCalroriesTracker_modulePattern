// jshint esversion : 6

// Storage Controller

// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    item: [
      { id: 0, name: "Steak Dinner", calories: 1200 },
      { id: 1, name: "Cookies", calories: 400 },
      { id: 2, name: "Eggs", calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // Public Methods
  return {};
})();
// UI Controller
const UICtrl = (function () {
  // Public Methods
  return {};
})();
// App Controller
const App = (function (ItemCtrl, UICtrl) {
  // Public Methods
  return {
    init: null,
  };
})(ItemCtrl, UICtrl);

// Start App
App.init();
