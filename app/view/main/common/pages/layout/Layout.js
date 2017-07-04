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


    initComponent: function () {
        console.log("Layout %o", this);
        console.log("Width %f", this.inchWidth);
        console.log("Height %f", this.inchHeight);
        this.callParent(arguments);

    },
    listeners: {
        render: 'onAddLayoutPanel',
        beforeclose: 'onCloseLayoutPanel'

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