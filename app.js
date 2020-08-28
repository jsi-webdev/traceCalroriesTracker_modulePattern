// jshint esversion : 8

// Storage Controller

// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  class Item {
    constructor(id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
    }
  }

  // Data Structure / State
  const data = {
    items: [
      // { id: 0, name: "Steak Dinner", calories: 1200 },
      // { id: 1, name: "Cookies", calories: 400 },
      // { id: 2, name: "Eggs", calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // Public Methods
  return {
    getItems: function () {
      return data.items;
    },
    addItems: function (name, calories) {
      let ID;
      // Create ID logic
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      // Calories to number
      calories = parseInt(calories);
      // Create new item
      newItem = new Item(ID, name, calories);
      // Push newitems to data structure
      data.items.push(newItem);
      return newItem;
      // console.log(data);
    },
    getTotalCalories: function () {
      let total = 0;
      // Loop through items and add calories
      data.items.forEach((item) => {
        total += item.calories;
      });
      // Set total calories in data structure
      data.totalCalories = total;
      console.log(data.totalCalories);
      return data.totalCalories;
    },
  };
})();
// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
  };
  // Public Methods
  return {
    populateItemList: function (items) {
      let html = "";

      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name} : </strong> <em>${item.calories} calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      </li>`;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    getSelectors: function () {
      return UISelectors;
    },
    addListItem: function (item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // Create li element
      const li = document.createElement("li");
      // Add Class
      li.className = "collection-item";
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.name} : </strong> <em>${item.calories} calories</em>
      <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
      // Insert Item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
  };
})();
// App Controller
const App = (function (ItemCtrl, UICtrl) {
  // Load Event listeners
  const loadEventListeners = function () {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();
    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };
  // Add item submit
  const itemAddSubmit = function (e) {
    // Get form input from UI controller
    const input = UICtrl.getItemInput();
    // Check for name and calories input
    if (input.name !== "" && input.calories !== "") {
      // Add Item (return value is used for update UI itemList)
      const newItem = ItemCtrl.addItems(input.name, input.calories);
      UICtrl.addListItem(newItem);
      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);
      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };
  // Public Methods
  return {
    init: function () {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();
      console.log(items);
      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items

        UICtrl.populateItemList(items);
      }

      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

// Start App
App.init();
