/**
 * Created by Lee on 4/12/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.Layout', {
    extend: 'Advertising.view.main.common.pages.pageview.Page',
    requires: [
        'Advertising.view.main.common.pages.layout.LayoutModel'
    ],

    //config: {
    //    width: 100,
    //    height: 200,
    //},
    inchWidth: 0,
    inchHeight: 0,
    padding: 10,

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

    iconCls: 'fa fa-th',
    viewModel: {
        type: 'layout'
    },

    controller: 'page',

    items: [

    ]
});