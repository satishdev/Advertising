/**
 * Created by Lee on 4/26/2017.
 */
Ext.define('Advertising.view.main.common.pages.pageobject.PageObject', {
    extend: 'Advertising.view.main.common.Promo',

    requires: [
        'Ext.layout.container.Absolute'
    ],


    xtype: 'pageobject',


    border: 2,
    draggable: true,
    resizable: true,
    layout: 'absolute',
    zIndex: 100,
    constrain: true,
    items: [
        /* include child components here */
    ]
});