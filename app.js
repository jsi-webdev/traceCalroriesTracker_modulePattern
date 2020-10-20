// App Controller
const AppCtrl = (function (ItemCtrl, StorageCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function () {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Disable submit on enter
    document.addEventListener("keypress", (e) => {
      const keycode = e.keycode || e.which;
      // console.log(keycode);
      if (keycode === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // // Edit icon click event
    // document
    //   .querySelector(UISelectors.itemList)
    //   .addEventListener("click", itemEditClick);

    // // Update item event
    // document
    //   .querySelector(UISelectors.updateBtn)
    //   .addEventListener("click", itemUpdateSubmit);

    // // Delete item event
    // document
    //   .querySelector(UISelectors.deleteBtn)
    //   .addEventListener("click", itemDeleteSubmit);

    // // Back button event
    // document
    //   .querySelector(UISelectors.backBtn)
    //   .addEventListener("click", UICtrl.clearEditState);

    // // Clear items event
    // document
    //   .querySelector(UISelectors.clearBtn)
    //   .addEventListener("click", clearAllItemsClick);
  };

  // Add item submit
  const itemAddSubmit = function (e) {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if (input.name !== "" && input.calories !== "") {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      //Store in localStorage
      StorageCtrl.storeItem(newItem);

      // Clear fields
      UICtrl.clearInput();

      e.preventDefault();
    }
  };

  return {
    init: function () {
      // Clear edit state / set initial set
      UICtrl.clearEditState();

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
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
AppCtrl.init();
