/**
 * Created by Lee on 5/5/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.LayoutObjectEditWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Advertising.view.main.common.pages.layout.LayoutModel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Tag',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Form'
    ],
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        console.log("New window %o", me);
        me.getViewModel().set('section', me.section);
    },
    viewModel: {
        type: 'layout'
    },
    width: 500,
    height: 400,
    modal: true,
    config: {
        showAnimation: {
            type: 'fadeIn'
        },
        hideAnimation: {
            type: 'fadeOut'
        }
    },
    /*
    Uncomment to give this component an xtype
    xtype: 'layoutobjecteditwindow',
    */

    layout:'form',
    items: [
        {

            xtype: 'tagfield',
            fieldLabel: 'Owners',
            value: [''],
            bind: {
                store: '{owners}'
            },
            displayField: 'name',
            valueField: 'category',
            filterPickList: true
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Section',
            name: 'section',

            bind: {
                store: '{sections}',
                value: '{section}'
            },
            createNewOnEnter: true,
            createNewOnBlur: true,
            displayField: 'name',
            valueField: 'name'
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Theme',
            value: '',
            bind: {
                store: '{themeCodes}'
            },


            displayField: 'name',
            valueField: 'name'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Item Details',
            value: ''

        }
    ]
});