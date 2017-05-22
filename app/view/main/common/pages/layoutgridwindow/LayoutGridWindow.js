/**
 * Created by Lee on 5/18/2017.
 */
Ext.define('Advertising.view.main.common.pages.layoutgridwindow.LayoutGridWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Advertising.view.main.common.pages.layout.LayoutModel',
        'Advertising.view.main.common.pages.layoutgridwindow.LayoutGridToolbar',
        'Advertising.view.main.common.pages.layoutgridwindow.LayoutGridWindowController',
        'Advertising.view.main.common.pages.layoutgridwindow.LayoutGridWindowModel',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.field.Tag',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.column.Check',
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
            plugins: [{
                ptype: 'cellediting',
                clicksToEdit: 1
            }],

            //store: pagePanel.getViewModel().getStore('layoutObjects'),
            columns: [
                {

                    xtype: 'checkcolumn',
                    header: 'Select',
                    dataIndex: 'selected',
                    width: 60,
                    editor: {
                        xtype: 'checkbox',
                        cls: 'x-grid-checkheader-editor'
                    }
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
                        bind: {
                            store: '{themeCodes}'
                        }
                    },
                    text: 'Theme',
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
                    text: 'Section',
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