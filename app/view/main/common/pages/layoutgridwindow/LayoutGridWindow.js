/**
 * Created by Lee on 5/18/2017.
 */
Ext.define('Advertising.view.main.common.pages.layoutgridwindow.LayoutGridWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Advertising.view.main.common.pages.layoutgridwindow.LayoutGridWindowController',
        'Advertising.view.main.common.pages.layoutgridwindow.LayoutGridWindowModel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.field.Tag',
        'Ext.grid.Panel',
        'Ext.grid.plugin.CellEditing',
        'Ext.layout.container.Fit'
    ],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        console.log("New window %o", me);
        var pagePanel = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab();
        console.log("Grid Data: %o", pagePanel.getViewModel().getStore('layoutObjects'));
        Ext.toast("Copying store for grid");
        me.down('grid').setStore( pagePanel.getViewModel().getStore('layoutObjects'));
    },

    xtype: 'layoutgridwindow',
    width: '80%',
    height: 400,
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
        type: 'layoutgridwindow'
    },

    controller: 'layoutgridwindow',

    items: [
        {
            layout: 'fit',
            xtype: 'grid',
            store: undefined,
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
                    text: 'Cell #',
                    dataIndex: 'cellNumber',
                    flex: 1
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
                    editor: {
                        xtype: 'tagfield',
                        typeAhead: true,
                        triggerAction: 'all'

                    },
                    text: 'Owners',
                    dataIndex: 'owners',
                    flex: 2
                },
                {
                    editor: {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all'

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
                        decimalPrecision : 2,
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
                    text: 'Section',
                    dataIndex: 'section',
                    flex: 2
                },
                {
                    text: 'Instructions',
                    dataIndex: 'instructions',
                    flex: 1
                }
            ]
        }]
});