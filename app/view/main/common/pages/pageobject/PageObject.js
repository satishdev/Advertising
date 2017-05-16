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
    origXPos:0,
    origYPos: 0,
    cellNumber: 0,
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
        var parentPanel = me.up('panel');
        console.log("Parent XPos: {}", parentPanel.getX());

        var curZoom = me.zoom;
        me.zoom = zoom;
        var curWidth = me.getWidth();
        var curHeight = me.getHeight();
        var curX = me.getX();
        var curY = me.getY();

        console.log("Orig size %f x %f" , me.origWidth, me.origHeight);
        console.log("Orig pos %f x %f" , me.origXPos, me.origYPos);
        var newXPos = Math.round((me.origXPos * 96)* (zoom /100)) + parentPanel.getX() ;
        var newYPos = Math.round((me.origYPos * 96)* (zoom /100))+ parentPanel.getY();
        console.log("New pos %f x %f" , newXPos, newYPos);
        me.setX(newXPos);
        me.setY(newYPos);
        me.setWidth(Math.round((me.origWidth * 96) *  (zoom /100)));
        me.setHeight(Math.round((me.origHeight * 96) *  (zoom/100)));


    }
});