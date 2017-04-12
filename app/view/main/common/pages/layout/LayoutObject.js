/**
 * Created by Lee on 4/12/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.LayoutObject', {
    extend: 'Ext.panel.Panel',


    xtype: 'layoutobject',
    cls: 'f-layout-object',
    requires: [
        'Ext.layout.container.Absolute'
    ],

    border: 2,
    draggable: true,
    resizable: true,
    layout: 'absolute',
    zIndex: 99,

    items: [
        /* include child components here */
    ]
});