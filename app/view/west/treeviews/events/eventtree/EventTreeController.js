/**
 * Created by Lee on 3/9/2017.
 */
Ext.define('Advertising.view.west.treeviews.events.eventtree.EventTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventtree',
    requires: [
        'Advertising.view.west.treeviews.events.eventtree.EventTreeMenu'
    ],

    onRenderContextMenu: function (menu) {
        var me = this;
        var model = me.getViewModel();
        console.log("Rendering context menu %o %o", menu, model);
    },
    id: 'vceventtreecontroller',
    /**
     * Called when the view is created
     */
    init: function () {

    },
    onTreeNodeSelect: function (tree, node, ndx, opts) {
        var me = this;
        // Ext.toast("Node clicked " + node.data);
        if (node.data.nodetype == 'VEHICLE' || node.data.nodetype == 'PAGE') {
            var parentNode = node.parentNode;
            console.log("Tree parent is %o", parentNode);
            me.getViewModel().set("selectedEventNode", node);
            this.fireEvent('eventTreeSelection', node, parentNode);
        }
    },
    onSearchTriggerClick: function () {
        var me = this;
        me.filterStore(this.getValue());
    },
    onClearTriggerClick: function (btn) {
        var me = this;
        me.store.clearFilter();
        btn.up('eventtree').getTrigger('clear').hide();
    },
    onSearchKeyUp: function (field, event, eOpts) {
        var value = field.getValue(), me = this;

        // Only filter if they actually changed the field value.
        // Otherwise the view refreshes and scrolls to top.
        if (value == '') {
            field.getTrigger('clear').hide();
            me.filterStore(value);
            me.lastFilterValue = value;
        } else if (value && value !== me.lastFilterValue) {
            field.getTrigger('clear')[(value.length > 0) ? 'show' : 'hide']();
            me.filterStore(value);
            me.lastFilterValue = value;
        }

    },
    strMarkRedPlus: function (search, subject) {
        return subject.replace(
            new RegExp('(' + search + ')', "gi"), "<span style='color: red;'><b>$1</b></span>");
    },
    filterStore: function (value) {
        var me = this, model = me.getViewModel(),
            store = model.getStore('events'),
            searchString = value.toLowerCase(),
            filterFn = function (node) {
                console.log("Checking for node %s %s", node.get('text'), value);
                var children = node.childNodes,
                    len = children && children.length,
                    visible = v.test(node.get('text')),
                    i;

                // If the current node does NOT match the search condition
                // specified by the user...
                if (!visible) {

                    // Check to see if any of the child nodes of this node
                    // match the search condition.  If they do then we will
                    // mark the current node as visible as well.
                    for (i = 0; i < len; i++) {
                        if (children[i].isLeaf()) {
                            visible = children[i].get('visible');
                        } else {
                            visible = filterFn(children[i]);
                        }
                        if (visible) {
                            break;
                        }
                    }

                } else { // Current node matches the search condition...

                    // Force all of its child nodes to be visible as well so
                    // that the user is able to select an example to display.
                    for (i = 0; i < len; i++) {
                        children[i].set('visible', true);
                    }

                }

                return visible;
            },
            v;

        if (searchString.length < 1) {
            store.clearFilter();
        } else {
            v = new RegExp(searchString, 'i');
            store.getFilters().replaceAll({
                filterFn: filterFn
            });
        }
    },
    onTreeColumnRender: function (value) {
        var me = this, model = me.getViewModel();
        var searchString = model.get('searchValue');

        if (searchString && searchString.length > 0) {
            return this.strMarkRedPlus(searchString, value);
        }

        return value;
    },
    onHistorySearch: function () {
        var me = this, model = me.getViewModel(),
         toDate = model.get('historyToDate'), fromDate = model.get('historyFromDate');
        console.log("From %o To %o", fromDate, toDate);
        if (model.get('historyToDate') && model.get('historyFromDate')) {
            console.log("Both dates populated");
            // show window for available vehicles for timeframe shown
            var historyWin = Ext.create('Advertising.view.west.treeviews.events.historyeventtreewindow.HistoryEventTreeWindow',{
                fromDate: model.get('historyFromDate'),
                toDate: model.get('historyToDate')

            }).show();

        }
    },
    onToDateChange: function (field, newValue,oldValue, eOpts) {
        var me = this, model = me.getViewModel();
        console.log("to %o", field.getValue());
        model.set('historyToDate', field.getValue());
        me.onHistorySearch();
    },
    onFromDateChange: function (field, newValue,oldValue, eOpts) {
        var me = this, model = me.getViewModel();
        model.set('historyFromDate', field.getValue());

        me.onHistorySearch();

    },
    onClickOrderIcon: function (btn) {
        var me = this, model = me.getViewModel();
        model.set('showNameFilter', true);

        if (model.get('treeOrder') == 'name') {
            model.set('orderIcon', 'fa fa-font');
            model.set('treeOrder', 'date');
            model.set('orderTip', 'Order the tree by vehicle name');

            var sorters = model.getStore('events').getSorters();
            console.log("1 Sort change sorters by date %o", sorters);
            model.getStore('events').sort('startdateidx');
            var store = model.getStore('events');
            console.log("Data %o", store.data);

        } else if (model.get('treeOrder') == 'date') {

            model.set('orderIcon', 'fa fa-calendar-plus-o');
            model.set('orderTip', 'Order the tree by vehicle date');

            model.set('treeOrder', 'history');
            var sorters = model.getStore('events').getSorters();
            model.getStore('events').sort('text');
            console.log("2 Sort change sorters by name %o", sorters);
        } else {
            model.set('orderIcon', 'fa fa-clock-o');
            model.set('treeOrder', 'name');
            model.set('orderTip', 'Search for historical vehicles');
            model.set('showNameFilter', false);

            console.log("2 Sort change sorters by name %o", sorters);
        }

    },
    onShowEventTreeMenu: function (tree, record, item, index, e, eOpts) {
        e.stopEvent();
        console.log("Showing menu for item %o", record);
        // only show context menu for vehicles and pages
        if (record.data.nodetype == 'VEHICLE') {
            if (!this.vmenu) {
                this.vmenu = Ext.create('Advertising.view.west.treeviews.events.eventtree.EventTreeMenu',
                    {
                        items: [
                            {
                                text: 'Show space allocation',
                                vehicleName: record.data.Name,
                                vehicleID: record.data.id,
                                iconCls: 'fa fa-th'
                            }
                            //},
                            //{
                            //    text: 'Show financials',
                            //    vehicleName: record.data.Name,
                            //    vehicleID: record.data.id,
                            //    iconCls: 'fa fa-dollar'
                            //}
                        ],
                        data: record.data
                    });

            } else {
                this.vmenu.items.items[0].vehicleID = record.data.id
            }
            this.vmenu.showAt(e.getXY());
        }
        if (record.data.nodetype == 'PAGE') {

            var menu = Ext.create('Advertising.view.west.treeviews.events.eventtree.EventTreeMenu',
                {
                    items: [
                        {
                            text: 'Approve page ' + record.data.text + ' for worklist',
                            pageName: record.data.text,
                            pageID: record.data.id,
                            iconCls: 'fa fa-check',
                            handler: function (item) {
                                // Ext.toast("Approving " +record.get('leafid'));
                                Ext.Ajax.request({
                                    url: Advertising.util.GlobalValues.serviceURL + "/page/submitPageForApproval/" + record.get('leafid'),
                                    method: 'POST',
                                    cors: true,
                                    useDefaultXhrHeader: false,
                                    timeout: 1450000,
                                    success: function (transport) {
                                        var details = Ext.decode(transport.responseText);
                                        record.set('cls', 'f-page-submitted');
                                        console.log("Record qtip %o %o", record.get('qtip'), details);

                                        record.set('qtip', details.qtip);

                                    },
                                    failure: function (message) {
                                        var details = Ext.decode(message.responseText);
                                        console.log("Failed to send for approval %o", details);
                                        record.set('cls', 'f-page-not-submitted');

                                        Ext.MessageBox.show({
                                            title: 'Error',
                                            msg: details.message,
                                            buttons: Ext.MessageBox.OK,
                                            animateTarget: Ext.getBody(),
                                            icon: Ext.MessageBox.ERROR
                                        });
                                    }
                                });
                            }
                        }
                    ],
                    data: record.data
                });


            menu.showAt(e.getXY());
        }
    }
});