/**
 * Created by Lee on 4/12/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.LayoutObject', {
    extend: 'Ext.panel.Panel',


    xtype: 'layoutobject',

    requires: [
        'Ext.layout.container.Absolute'
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
    layout: 'absolute',
    zIndex: 99,
    constrain: true,
    items: [
        /* include child components here */
    ]
});