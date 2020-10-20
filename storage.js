// Storage Controller
const StorageCtrl = (function () {
  // Public methods
  return {
    getItemsFromLS: function () {
      let items;
      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }
      return items;
    },
    storeItem: function (item) {
      let items;
      // Check if any items in ls
      if (localStorage.getItem("itmes") === null) {
        items = [];
      } else {
        // Get what is already in ls
        items = json.parse(localStorage.getItem("items"));
      }
      // Push new item
      items.push(item);
      // Set ls
      localStorage.setItem("items", JSON.stringify(items));
    },
  };
})();
