/**
 * Created by Lee on 3/9/2017.
 */
Ext.define('Advertising.view.west.treeviews.events.eventtree.EventTree', {
    extend: 'Advertising.view.west.treeviews.AdvTree',

    xtype: 'eventtree',

    requires: [
        'Advertising.view.west.treeviews.events.eventtree.EventTreeController',
        'Advertising.view.west.treeviews.events.eventtree.EventTreeModel',
        'Ext.form.field.Text'
    ],
    lastFilterValue: undefined,
    bind: {
        store: '{events}'
    },
    viewModel: {
        type: 'eventtree'
    },
    // todo add ability to search and expand tree
    dockedItems: [{
        xtype: 'textfield',
        dock: 'top',
        emptyText: 'Search',
        enableKeyEvents: true,

        triggers: {
            clear: {
                cls: 'x-form-clear-trigger',
               // handler: 'onClearTriggerClick',
                hidden: true,
                scope: 'this'
            },
            search: {
                cls: 'x-form-search-trigger',
                weight: 1,
                //handler: 'onSearchTriggerClick',
                scope: 'this'
            }
        },



        listeners: {
            keyup: {
                fn: function(field, event, eOpts) {
                    var value = field.getValue(), me = this;

                    // Only filter if they actually changed the field value.
                    // Otherwise the view refreshes and scrolls to top.
                    if (value == '') {
                        field.getTrigger('clear').hide();
                    //    me.filterStore(value);
                        me.lastFilterValue = value;
                    } else if (value && value !== me.lastFilterValue) {
                        field.getTrigger('clear')[(value.length > 0) ? 'show' : 'hide']();
                    //    me.filterStore(value);
                        me.lastFilterValue = value;
                    }
                },
                buffer: 300
            },

            render: function(field) {
                this.searchField = field;
            }
        }
    }],

    listeners: {
        itemclick: 'onTreeNodeSelect',
        itemcontextmenu: 'onShowEventTreeMenu'
    },
    rootVisible: false,
    controller: 'eventtree'
});