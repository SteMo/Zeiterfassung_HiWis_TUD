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
            dataStore = Ext.data.StoreManager.lookup('Personen');
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

/* die Funktion löscht Inhalt eines Layouts (alles bis auf Menü) um den neuen Inhalt
 * an das Layout später einfach anfügen zu können
 * Das Menü ist immer Component0, für jede Seite
 */
var clearContentArea = function (layout) {
	var componentsToRemove = layout.items.length;
	for (var i=1;i<=componentsToRemove;i++)
		layout.remove(layout.getComponent(i)); 
}