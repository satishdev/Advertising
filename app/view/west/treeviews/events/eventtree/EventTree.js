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
    columns: [{
        xtype: 'treecolumn',
        flex: 1,
        dataIndex: 'text',
        renderer: 'onTreeColumnRender'
    }],
    // todo add ability to search and expand tree
    dockedItems: [
        {
            xtype: 'panel',
            header: false,
            layout: {
                type: 'hbox',
                align: 'stretch'

            },
            items: [
                {
                    xtype: 'button',
                    handler: 'onClickOrderIcon',
                    bind: {
                        iconCls: '{orderIcon}',
                        tooltip: '{orderTip}'
                    },

                    flex: 1
                },
                {
                    xtype: 'datefield',
                    flex: 2,
                    name: 'from_date',
                    format: 'm d Y',
                    emptyText: 'From',
                    maxValue: new Date(),
                    showToday: false,
                    listeners: {
                        change: 'onFromDateChange'
                    } ,
                    hideLabel: true,
                    bind: {
                        visible: '{!showNameFilter}',
                        value: '{historyFromDate}'

                    }

                },
                {
                    xtype: 'datefield',
                    listeners: {
                        change: 'onToDateChange'
                    } ,
                    flex: 2,
                    showToday: false,
                    name: 'to_date',
                    format: 'm d Y',
                    maxValue:new Date(),
                    hideLabel: true,
                    emptyText: 'To',
                    bind: {
                        visible: '{!showNameFilter}',
                        value: '{historyToDate}'
                    }

                },

                {
                    xtype: 'textfield',
                    dock: 'top',
                    emptyText: 'Filter...',
                    flex: 6,
                    enableKeyEvents: true,
                    bind: {
                        value: '{searchValue}',
                        visible: '{showNameFilter}'
                    },
                    triggers: {
                        clear: {
                            cls: 'x-form-clear-trigger',
                            handler: 'onClearTriggerClick',
                            hidden: true,
                            scope: 'this'
                        },
                        //search: {
                        //    cls: 'x-form-search-trigger',
                        //    weight: 1,
                        //    handler: 'onSearchTriggerClick',
                        //    scope: 'this'
                        //}
                    },


                    listeners: {
                        keyup: 'onSearchKeyUp',


                        render: function (field) {
                            this.searchField = field;
                        }
                    }
                }
            ]


        }],

    listeners: {
        itemclick: 'onTreeNodeSelect',
        itemcontextmenu: 'onShowEventTreeMenu'
    },
    rootVisible: false,
    controller: 'eventtree'
});