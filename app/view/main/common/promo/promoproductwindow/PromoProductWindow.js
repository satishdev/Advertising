/**
 * Created by Lee on 5/1/2017.
 */
Ext.define('Advertising.view.main.common.promo.promoproductwindow.PromoProductWindow', {
    extend: 'Ext.window.Window',

    modal: true,
    width: 900,
    height: 400,
    listeners: {
        'render': 'onActivateWindow'
    },
    layout:'fit',
    bind: {
        title: '{name}'
    },
    config: {
        showAnimation: {
            type: 'fadeIn'
        },
        hideAnimation: {
            type: 'fadeOut'
        }
    },
    requires: [
        'Advertising.view.main.common.promo.promoproductwindow.PromoProductWindowController',
        'Advertising.view.main.common.promo.promoproductwindow.PromoProductWindowModel',
        'Ext.grid.Panel',
        'Ext.layout.container.Fit'
    ],
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        console.log('promo product window %o', me);
        var model = me.getViewModel();

        model.set("promo",me.promo.getViewModel().data);
        model.set("name",me.getViewModel().get("promo").name);
    },

     xtype: 'promoproductwindow',


    viewModel: {
        type: 'promoproductwindow'
    },

    controller: 'promoproductwindow',

    items: [

        {
            xtype: 'grid',
            width: 600,

            bind: {
                store: '{offerItemsWin}'
            },
            columns: [
                {
                    text: 'Image',
                    dataIndex: 'productID',
                    flex: 2,
                    renderer: 'renderImageCol'

                },
                {
                    text: 'Product',
                    dataIndex: 'productID',
                    flex: 2
                },
                {
                    text: 'Qty',
                    dataIndex: 'quantity',
                    flex: 1

                },
                {
                    text: 'Desc',
                    dataIndex: 'description',
                    flex: 3

                },
                {
                    text: 'Tmt',
                    dataIndex: 'treatment',
                    flex: 1
                }
            ]
        }
    ]
})
;