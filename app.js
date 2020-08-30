// jshint esversion : 8

// Storage Controller
const StorageCtrl = (function () {
  // Public method
  return {
    storeItem: function (item) {
      let items;
      // Check if any items in Ls
      if (localStorage.getItem("items") === null) {
        items = [];
        // Push new item
        items.push(item);
        // Set LS
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        // Get what is already in LS
        items = JSON.parse(localStorage.getItem("items"));
        // Push new item
        items.push(item);
        // Reset LS
        localStorage.setItem("items", JSON.stringify(items));
      }
    },
    getItemsFromStorage: function () {
      let items;
      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }
      return items;
    },
  };
})();
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
    // items: [
    //   // { id: 0, name: "Steak Dinner", calories: 1200 },
    //   // { id: 1, name: "Cookies", calories: 400 },
    //   // { id: 2, name: "Eggs", calories: 300 },
    // ],
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0,
  };

  // Public Methods
  return {
    getItems: function () {
      return data.items;
    },
    getItemById: function (id) {
      let found = null;
      // Loop through items
      data.items.forEach((item) => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
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
    updateItem: function (name, calories) {
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach((item) => {
        if (item.name === data.currentItem.name) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    deleteItem: function (id) {
      // Get ids
      ids = data.items.map((item) => {
        return item.id;
      });
      // Get index
      const index = ids.indexOF(id);
      // Remove item
      data.items.splice(index, 1);
    },
    clearAllItems: function () {
      data.items = [];
    },
    getTotalCalories: function () {
      let total = 0;
      // Loop through items and add calories
      data.items.forEach((item) => {
        total += item.calories;
      });
      // Set total calories in data structure
      data.totalCalories = total;

      return data.totalCalories;
    },
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
    logData: () => {
      console.log(data);
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
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
    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn node list into array
      listItems = Array.from(listItems);

      listItems.forEach((listItem) => {
        const itemID = listItem.getAttribute("id");

        if (itemID === `item-${item.id}`) {
          console.log(item);
          document.querySelector(
            `#${itemID}`
          ).innerHTML = `<strong>${item.name} : </strong> <em>${item.calories} calories</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
        }
      });
    },
    deleteListItem: function (id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    removeItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      listItems = Array.from(listItems);

      listItems.forEach((listItem) => {
        listItem.remove();
      });
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm: function () {
      const currentItem = ItemCtrl.getCurrentItem();
      document.querySelector(UISelectors.itemNameInput).value =
        currentItem.name;
      document.querySelector(UISelectors.itemCaloriesInput).value =
        currentItem.calories;
      UICtrl.showEditState();
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    // Btn state list
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.addBtn).style.display = "inline";
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
    },
    showEditState: function () {
      document.querySelector(UISelectors.addBtn).style.display = "none";
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
    },
  };
})();

// App Controller
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
  // Load Event listeners
  const loadEventListeners = function () {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();
    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
    // Update item even
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);
    // Edit item click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);
    // Delete item click event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);
    // Back button event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);
    // Clear items click
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItemsClick);
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
      // Store in localstorage
      StorageCtrl.storeItem(newItem);
      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // Update item submit
  const itemUpdateSubmit = function (e) {
    // Get item input
    const input = UICtrl.getItemInput();
    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    // Update UI
    UICtrl.updateListItem(updatedItem);
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);
    // Clear fields
    UICtrl.clearInput();

    e.preventDefault();
  };

  // Delete btn event
  const itemDeleteSubmit = function (e) {
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();
    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);
    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);
    // Clear fields
    UICtrl.clearInput();

    e.preventDefault();
  };

  // Click edit item
  const itemEditClick = function (e) {
    if (e.target.classList.contains("edit-item")) {
      // Get list item id
      const listId = e.target.parentNode.parentNode.id;
      // Break into an array
      const listIdArr = listId.split("-");
      // Get into actual id
      const id = parseInt(listIdArr[1]);
      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);
      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);
      // Add item to form
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  };

  // Clear items event
  const clearAllItemsClick = function () {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);
    // remove from UI
    UICtrl.removeItems();

    UICtrl.hideList();
  };

  // Public Methods
  return {
    init: function () {
      // Clear edit state / set initial set
      UICtrl.clearEditState();
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

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
})(ItemCtrl, StorageCtrl, UICtrl);

// Start App
App.init();
