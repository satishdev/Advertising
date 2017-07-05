/**
 * Created by Lee on 4/26/2017.
 */
Ext.define('Advertising.view.main.common.pages.pageobject.PageObject', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Advertising.view.main.common.promo.PromoController',
        'Ext.layout.container.Absolute'
    ],
    //cls: 'f-promo-base',
    initComponent: function () {
        var me = this;
        this.callParent(arguments);
    },

    xtype: 'pageobject',
    controller: 'promo',
    autoMove: false,
    objid: -1,
    origWidth: 0,
    origHeight: 0,
    origXPos: 0,
    origYPos: 0,
    cellNumber: 0,
    zoom: 100,
    border: 2,
    deleted: false,
    layout: 'absolute',
    shadow: 'drop',
    selected: false,
    items: [
        /* include child components here */
    ],

    listeners: {
        move: 'onObjectMove',
        resize: 'onObjectResize',
        render: 'onRenderObject',
        beforeMove: 'onBeforeObjectMove',
        focusenter: 'onObjectFocus',
        onDragStart: 'onDragStart'

    },

    setDebugInfo: function () {

        var me = this;
        //var parentPosition = me.up('panel').getPosition();
        //var position = me.getPosition();
        //var realX = position[0] - parentPosition[0];
        //var realY = position[1] - parentPosition[1];
        var info = "Scale: " + Math.round(me.up('layout').getViewModel().get('scale')) + " X:" + Math.round(me.getViewModel().get('xPos')) + " Y:" + Math.round(me.getViewModel().get('yPos')) + " -- " + (me.width).toFixed(1) + "x" + (me.height).toFixed(1) + "<br/><span style='color:red'>" + me.getViewModel().get('objid') + ":" + me.groupID + "</span>";

        me.getViewModel().set("debugInfo", info);
        //   console.log("Model %o", me.getViewModel());

    },
    setZoom: function (zoom) {
        var me = this, model = me.getViewModel();
        var parentPanel = me.up('panel');

        var curZoom = me.zoom;
        me.zoom = zoom;
        me.prevX = me.getX();
        me.prevY = me.getY();
        var model = me.getViewModel();
        me.prevWidth = me.getWidth();
        me.prevHeight = me.getHeight();
        var layoutViewModel = me.up('layout').getViewModel();
        var scale = layoutViewModel.get('scale');
        var oneInch = Math.round(((96 * scale ) * ( zoom / 100)));
        var gridSize = Ext.ComponentQuery.query("pagetoolpanel")[0].getViewModel().get('gridSize');
        var oneInchGrid = Math.round(oneInch * gridSize);
        console.log("MODEL FOR LAYOUT OBJECT %o", model.data);
        var newXPos = Math.round((model.get('xPos') * 96 ) * (zoom / 100) * scale) + parentPanel.getX();
        var newYPos = Math.round((model.get('yPox') * 96 ) * (zoom / 100) * scale) + parentPanel.getY();
        console.log("Old pos %f x %f New pos  %f x %f", me.prevX, me.prevY, newXPos, newYPos);
        var newXPos2 = ( Math.round(me.getX() - parentPanel.getX()) * (zoom / 100) );
        var newYPos2 = ( Math.round(me.getY() - parentPanel.getY()) * (zoom / 100) );

        me.setPosition(newXPos2, newYPos2, true);
        var newWidth = Math.round(((model.get('inchWidth') * 96)) * (zoom / 100) * scale);
        var newHeight = Math.round(((model.get('inchHeight') * 96)) * (zoom / 100) * scale);

        console.log("Setting width %f height %f ", newWidth, newHeight);
        me.setSize(newWidth, newHeight);

    },
    flagDeleted: function () {
        var me = this;
        me.deleted = true;
        me.getViewModel().set('deleted', true);
        me.addCls("f-panel-dirty");
        me.addCls("f-panel-deleted");
    },
    flagDirty: function () {
        var me = this;
        //  console.log("Flagging as dirty");
        if (me.getViewModel().get('firstLayout') == false) {
            me.getViewModel().set('dirty', true);
            me.addCls("f-panel-dirty");
        }
    },
    flagClean: function () {
        var me = this;
        me.getViewModel().set('dirty', false);
        me.removeCls("f-panel-dirty");
    }
});