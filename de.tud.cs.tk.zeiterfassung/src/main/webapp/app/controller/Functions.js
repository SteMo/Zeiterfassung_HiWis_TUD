/* gemeinsam genutzte Funktionen */

var getPerson = function (value) {
        if (value === -1) {
            return '';
        }
        var dataStore;
        var idx;
        if (Ext.data.StoreManager.lookup('Personen').isFiltered()) {
            dataStore = Ext.data.StoreManager.lookup('Personen').snapshot;
            idx = dataStore.findIndexBy(function (o, k) {
                if (k == value) {
                    return true;
                }
                return false;
            });
        } else {
            dataStore = dataStore = Ext.data.StoreManager.lookup('Personen');
            idx = dataStore.findExact("id", value);
        }
        if (idx === -1) {
            return "(404 - id: " + value + ")";
        }
        return dataStore.getAt(idx).get("name");
    };
    

/* hiermit holen wir uns die Items aus einem Store -> für das Menü */
var createItemListFromStore = function (dataStore) {
    var itemList = new Array();
    var i = 0;
    for (var menuItem in dataStore.data.items) {
        itemList[i] = new Object();
        for (var menuItemKey in dataStore.data.items[menuItem].fields.keys) {
            itemList[i][dataStore.data.items[menuItem].fields.keys[menuItemKey]] = dataStore.data.items[menuItem].data[dataStore.data.items[menuItem].fields.keys[menuItemKey]]
        }
        i++;
    }
    return itemList;
}    