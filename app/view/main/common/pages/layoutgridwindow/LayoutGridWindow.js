/**
 * Created by Lee on 5/18/2017.
 */
Ext.define('Advertising.view.main.common.pages.layoutgridwindow.LayoutGridWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Advertising.view.main.common.pages.layout.LayoutModel',
        'Advertising.view.main.common.pages.layoutgridwindow.LayoutGridToolbar',
        'Advertising.view.main.common.pages.layoutgridwindow.LayoutGridWindowController',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.field.Tag',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.column.Column',
        'Ext.grid.plugin.CellEditing',
        'Ext.layout.container.Fit',
        'Ext.layout.container.boxOverflow.Menu'
    ],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        console.log("New window %o", me);
        var pagePanel = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab();
        console.log("Grid Data: %o", pagePanel.getViewModel().getStore('layoutObjects'));
        Ext.toast("Copying store for grid");
        me.down('grid').setStore(pagePanel.getViewModel().getStore('layoutObjects'));

    },
    bind: {
        title: '{windowTitle}'
    },
    xtype: 'layoutgridwindow',
    width: '80%',
    height: 700,
    config: {
        showAnimation: {
            type: 'fadeIn'
        },
        hideAnimation: {
            type: 'fadeOut'
        }
    },
    layout: 'fit',
    modal: true,

    viewModel: {
        type: 'layout'
    },

    controller: 'layoutgridwindow',
    dockedItems: [{
        xtype: 'layoutgridtoolbar',
        dock: 'top',
        overflowHandler: 'menu'
    }],
    items: [
        {
            layout: 'fit',
            xtype: 'grid',
            selModel: {
                type: 'cellmodel'
            },
            viewConfig: {
                forceFit: true,
                getRowClass: function (record, index) {
                    // disabled-row - custom css class for disabled (you must declare it)
                    console.log("Row class %s", record.get('excluded'));
                    return (record.hasOwnProperty('excluded') && record.get('excluded') == true) ?  'f-disabled-row' : '';
                }
            },
            plugins: [{
                ptype: 'cellediting',
                clicksToEdit: 1
            }],

            listeners: {
                beforeselect: function (sm, record) {
                    if (record.get('excluded') == true) return false;
                }
            },

            //store: pagePanel.getViewModel().getStore('layoutObjects'),
            columns: [
                {
                    xtype: 'actioncolumn',

                    width: 30,
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                        iconCls: 'cell-editing-delete-row',
                        tooltip: 'Delete object',
                        handler: 'onRemoveClick'
                    }]
                },
                {
                    text: 'Cell #',
                    dataIndex: 'cellNumber',
                    width: 60
                },
                {
                    text: 'Description',
                    dataIndex: 'description',
                    flex: 1
                },
                {
                    text: 'Layout',
                    flex: 1,
                    dataIndex: 'layoutObjectID'
                },
                {
                    text: 'Page Type **',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',

                    editor: {
                        xtype: 'tagfield',
                        typeAhead: true,
                        triggerAction: 'all',
                        displayField: 'name',
                        valueField: 'name',
                        bind: {
                            store: '{owners}'
                        }

                    },
                    text: 'Owners',
                    dataIndex: 'owners',

                    flex: 2
                },
                {
                    editor: {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        displayField: 'name',
                        valueField: 'name',
                        forceSelection: true,
                        bind: {
                            store: '{themeCodes}'
                        }
                    },
                    header: 'Theme',
                    dataIndex: 'theme',
                    flex: 1
                },
                {
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0.1,
                        maxValue: 10
                    },
                    text: 'Width',
                    flex: 1,
                    dataIndex: 'width'
                },

                {
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0.1,
                        maxValue: 10
                    },
                    text: 'Height',
                    flex: 1,
                    dataIndex: 'height'
                },
                {
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0,
                        stepValue: 0.1,
                        decimalPrecision: 2,
                        maxValue: 10  // todo set to max possible
                    },
                    text: 'XPos',
                    flex: 1,
                    dataIndex: 'xPos'
                },
                {
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0,
                        maxValue: 10
                    },
                    text: 'YPos',
                    flex: 1,
                    dataIndex: 'yPos'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Header',
                    dataIndex: 'section',
                    flex: 2,
                    editor: {
                        xtype: 'combobox',
                        name: 'section',
                        bind: {
                            store: '{sections}'

                        },

                        displayField: 'name',
                        valueField: 'name'

                    }
                },
                {
                    text: 'Instructions',
                    dataIndex: 'instructions',
                    flex: 3,
                    editor: {
                        xtype: 'textfield'
                    }
                }
            ]
        }],
    buttons: [
        {
            text: 'Cancel',
            handler: function () {
                this.up('window').close();

            }
        },
        {
            text: 'OK',
            handler: 'onUpdateLayoutFromGrid'
        }
    ]
});