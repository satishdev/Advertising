/**
 * Created by Lee on 4/7/2017.
 */
Ext.define('Advertising.view.main.common.promo.promoeditwindow.PromoEditWindow', {
    extend: 'Ext.window.Window',

    modal:true,
    width: 500,
    height: 300,

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
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.layout.container.Form'
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
        model.set("name",me.promo.name);
    },
    viewModel: {
        type: 'promoeditwindow'
    },
    tbar: [

    ],
    controller: 'promoeditwindow',
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
            fieldLabel: 'Metastyle',
            xtype: 'combobox',
            displayField: 'msName',
            valueField: 'msID',
            bind: {
                store: '{metastyles}'
            }

        }
    ]
});