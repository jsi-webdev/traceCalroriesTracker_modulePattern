// App Controller
const AppCtrl = (function (UICtrl) {
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

    // // Add item event
    // document
    //   .getSelection(UISelectors.addBtn)
    //   .addEventListener("click", itemAddSubmit);

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

  return {
    init: function () {
      loadEventListeners();
    },
  };
})(UICtrl);

// Initialize App
AppCtrl.init();
