/**
 * Created by Lee on 4/26/2017.
 */
Ext.define('Advertising.view.main.common.pages.pageobject.PageObject', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Advertising.view.main.common.promo.PromoController',
        'Advertising.view.main.common.promo.PromoModel',
        'Ext.layout.container.Absolute'
    ],


    xtype: 'pageobject',
    controller: 'promo',
    viewModel: 'promo',
    origWidth: 0,
    origHeight: 0,
    zoom: 100,
    border: 2,
    draggable: true,
    resizable: true,
    layout: 'absolute',
    zIndex: 100,
    constrain: true,
    items: [
        /* include child components here */
    ],
    setZoom: function(zoom) {
        var me = this;
        var curZoom = me.zoom;
        me.zoom = zoom;
        var curWidth = me.getWidth();
        var curHeight = me.getHeight();
        var curX = me.getX();
        var curY = me.getY();
        var realZoom = 100 - curZoom + zoom;
        me.setWidth(Math.round(curWidth *  (realZoom /100)));
        me.setHeight(Math.round(curHeight *  (realZoom/100)));
        me.setX(Math.round(curX * (realZoom /100)));
        me.setY(Math.round(curY * (realZoom /100)));

    }
});