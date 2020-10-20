// App Controller
const AppCtrl = (function (ItemCtrl, StorageCtrl, UICtrl) {
  // Get UI selectors
  const UISelectors = UICtrl.getSelectors();

  // Load event listeners
  const loadEventListeners = function () {
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

    // Edit icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

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

  // Click edit item
  const itemEditClick = function (e) {
    console.log(e.target.classList);
    if (e.target.classList.contains("edit-item")) {
      // Get list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;
      console.log(listId);
      // Break into an array
      const listIdArr = listId.split("-");
      // Get the actual id
      const id = parseInt(listIdArr[1]);
      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);
      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);
      // Add item to form
      UICtrl.addItemToForm();

      e.preventDefault();
    }
  };

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

// Initialize App
AppCtrl.init();
