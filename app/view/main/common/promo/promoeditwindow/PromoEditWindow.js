/**
 * Created by Lee on 4/7/2017.
 */
Ext.define('Advertising.view.main.common.promo.promoeditwindow.PromoEditWindow', {
    extend: 'Ext.window.Window',

    modal:true,
    width: 500,
    height: 400,

    xtype: 'promoeditwindow',
    config: {
        showAnimation: {
            type: 'fadeIn'
        },
        hideAnimation: {
            type: 'fadeOut'
        }
    },
    requires: [
        'Advertising.view.main.common.promo.promoeditwindow.PromoEditWindowController',
        'Advertising.view.main.common.promo.promoeditwindow.PromoEditWindowModel',
        'Ext.data.Store',
        'Ext.data.reader.Json',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.layout.container.Accordion',
        'Ext.layout.container.Fit',
        'Ext.layout.container.Form',
        'Ext.panel.Panel',
        'Ext.picker.Color'
    ],

    promo: 'none',
    bind: {
        title: '{name}'
    },

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        console.log('window %o', me);
        var model = me.getViewModel();
        model.set("name",me.promo.getViewModel().get('name'));


    },
    viewModel: {
        type: 'promoeditwindow'
    },
    listeners: {
        render: 'onRenderPromoEditWindow'
    },
    controller: 'promoeditwindow',
    layout: 'accordion',
    items: [

        {
            xtype: 'panel',
            flex:1,
            title: 'Offer Info',
            layout: 'form',
            items: [
                {
                    fieldLabel: 'Name',
                    xtype: 'textfield',
                    bind: {
                        value: '{name}'
                    }
                },
                {
                    fieldLabel: 'Size',
                    xtype: 'combobox',
                    displayField: 'msName',
                    valueField: 'msID',
                    bind: {
                        store: '{sizes}'
                    }

                },
                {
                    fieldLabel: 'Theme',
                    xtype: 'combobox',
                    displayField: 'msName',
                    valueField: 'msID',
                    bind: {
                        store: '{themes}'
                    }

                },
                {
                    fieldLabel: 'Instructions',
                    xtype: 'textarea',
                    maxRows: 10

                }

            ]
        },
        {
            xtype: 'grid',
            layout: 'fit',
            title: 'Offer Splitting',
            flex:2,

            columns: [
                {
                    text: 'Store group',
                    dataIndex: 'sg',

                    flex:1
                },
                {
                    text: 'Offer group',
                    dataIndex: 'group',
                    xtype: 'actioncolumn',
                    items: [
                        {
                            iconCls: 'fa fa-plus',
                            xtype: 'colorpicker'
                        }
                    ]
                },
                {
                    text: 'Color',
                    dataIndex: 'group'

                }
            ]
        }

    ]
});