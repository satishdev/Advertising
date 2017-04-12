/**
 * Created by Lee on 4/12/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.Layout', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Advertising.view.main.common.pages.layout.LayoutController',
        'Advertising.view.main.common.pages.layout.LayoutModel',
        'Ext.layout.container.Fit',
        'Ext.panel.Panel'
    ],

    //config: {
    //    width: 100,
    //    height: 200,
    //},
    inchWidth: 0,
    inchHeight: 0,
    padding: 10,
    border: true,
    layout: 'fit',
    scrollable: true,
    initComponent: function () {
        console.log("Layout %o", this);
        console.log("Width %f", this.inchWidth);
        console.log("Height %f", this.inchHeight);
        // set the width
        //this.width = this.inchWidth * 96;
        //this.height = this.inchHeight * 96;
        //console.log("Width css %d", this.width);
        //console.log("Height css %d", this.height);


        this.callParent(arguments);

    },
    listeners: {
        render: 'onAddLayoutPanel'
    },
    xtype: 'layout',


    viewModel: {
        type: 'layout'
    },

    controller: 'layout',

    items: [

    ]
});