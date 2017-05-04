/**
 * Created by Lee on 4/12/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.LayoutObject', {
    extend: 'Ext.panel.Panel',


    xtype: 'layoutobject',
    viewModel: {
        type: 'layout'
    },
    requires: [
        'Advertising.view.main.common.pages.layout.LayoutModel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Tag',
        'Ext.layout.container.Form'
    ],

    cls: 'f-layout-object f-layout-object-clean',
    listeners: {
        dblclick: {
            fn: function () {
                console.log("double click %o", this);
                var me = this;
                var panel = Ext.ComponentQuery.query('#' + me.id)[0];
                panel.removeCls('f-layout-object-clean');
                panel.addCls('f-layout-object-selected');
                var field = panel.down('checkboxfield');
                //var selected = field.selected;
                //field.selected = !selected;
            },
            // You can also pass 'body' if you don't want click on the header or
            // docked elements
            element: 'el'
        }
    }
    ,
    border: 2,
    draggable: true,
    resizable: true,
    layout: 'form',
    zIndex: 99,
    constrain: true,
    items: [

        {
            xtype: 'tagfield',
            fieldLabel: 'Owners',
            value: ['g'],
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
            value: '',
            bind: {
                store: '{sections}'
            },
            createNewOnEnter: true,
            createNewOnBlur: true,
            filterPickList: true,
            listeners: {
                change: 'onSectionChange'
            },
            displayField: 'name',
            valueField: 'name'}
    ]
});