/**
 * Created by Lee on 4/20/2017.
 */
Ext.define('Advertising.view.main.common.tools.pagetoolpanel.PageToolPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pagetoolpanel',

    requires: [
        'Advertising.view.main.common.tools.pagetoolpanel.MarketButton',
        'Ext.button.Button',
        'Ext.data.ArrayStore',
        'Ext.grid.Panel',
        'Ext.layout.container.Fit',
        'Ext.window.Window'
    ],

    id: 'vctoolpanelcontroller',
    /**
     * Called when the view is created
     */
    init: function() {

    },
    listen: {
        controller: {
            '#vcpagelayoutscontroller': {
                mainPageTabAdded: 'onMainPageTabAdded',
                mainPageTabChanged: 'onMainPageTabChanged'

            }


        }
    },
    onMainPageTabAdded: function() {
        Ext.toast("tool panel controller update - tab added");
        var me = this;
        console.log("Showing tool panel");
    },
    /**
     * Fire an event that should be caught by the main controller to show/hide items on page by market
     * @param btn
     */
    onClickMarketButton: function(btn) {
        var me = this;
        var showOffers = me.getViewModel().get("showOffers");
        var showLayouts = me.getViewModel().get("showLayouts");

        if ( btn.pressed ) {
            me.fireEvent("showPageMarket", btn.marketID, showOffers, showLayouts);
        } else {
            me.fireEvent("hidePageMarket", btn.marketID, showOffers, showLayouts);

        }

    },
    onMainPageTabChanged: function(panel, newCard, oldCard, eOpts) {
        Ext.toast("tool panel controller update - tab changed");
        var me = this;
        var marketControls = me.lookupReference('marketControls');
        if ( newCard.xtype == 'page') {
            // remove any existing market buttons
            marketControls.items.each(function (btn) {
                marketControls.remove(btn, true);
            });
            console.log("New panel type %s %o", newCard.xtype, newCard);
            if (newCard.hasOwnProperty('objectData')) {
                var market = newCard.objectData.markets.forEach(function (m) {
                    var btn = {
                        xtype: 'marketbutton',
                        text: m.name,
                        marketID: m.id
                    };
                    marketControls.add(btn);

                });

            }

            marketControls.items.each(function(btn){
                btn.getEl().highlight();
            });

        }
        console.log("Adding markets to %o", marketControls);


    },
    onToolPanelClose: function(p) {
        console.log("Closing panel %o",p);
        var me = this;
        // var model = me.getViewModel();
        //model.tools = undefined;
    },
    /* Turn on/off grids for page view */
    onToggleGrid: function (btn) {
        Ext.toast("Turn grids " + (( btn.pressed) ? "on" : "off"));
        // get current page displayed
        this.fireEvent('turnGridsOff');
    },
    onClickAddItem: function(btn) {
        console.log("Adding new layout item to page..");
        this.fireEvent('addNewPageObject', btn);

    },
    updatePanelLayerInfo: function() {
        Ext.toast('Adding applicable layer owners..');
    },
    /* Turn on/off layouts for page view */
    onToggleLayouts: function (btn) {
        Ext.toast("Turn layouts " + (( btn.pressed) ? "on" : "off"));
        // loop through all layouts
        // @todo just do for displayed page
        Ext.ComponentQuery.query("layoutobject").forEach(function(lo) {
            if (! lo.excluded) {
                if (btn.pressed) {
                    lo.show();
                } else {
                    lo.hide();
                }
            }

        });
    },
    onZoomChangeComplete: function( slider , newValue , thumb , eOpts ) {
        this.fireEvent('updatePageZoomLevel', newValue);

    },
    onShowGridWindow: function(btn) {
        var pagePanel = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab();
        var gridWin = Ext.create("Ext.window.Window",{
            width: 900,
            height: 400,
            config: {
                showAnimation: {
                    type: 'fadeIn'
                },
                hideAnimation: {
                    type: 'fadeOut'
                }
            },
            layout: 'fit',
            modal: true,
            animateTarget: btn.id,
            listeners: {
                render: function(win) {
                    console.log("Show grid");
                    if (pagePanel.layoutData.hasOwnProperty(('layoutObjectList'))) {
                        var layoutObjects = pagePanel.layoutData.layoutObjectList;
                        console.log("Found layouts %o", layoutObjects);
                        var store = win.down('grid').store;
                        layoutObjects.forEach(function(lo) {
                            console.log("Adding store item for %o", lo);
                            store.add(lo);
                        });

                    }
                }
            },
            items: [
                {
                    layout: 'fit',
                    xtype: 'grid',
                    store: new Ext.data.ArrayStore({
                        fields: ['cellNumber', 'section'],
                        idIndex: 0,
                        autoLoad: false
                    }),
                    columns: [
                        {
                            text: 'Cell #',
                            dataIndex: 'cellNumber',
                            flex: 1
                        },
                        {
                            text: 'Description',
                            dataIndex: 'description',
                            flex: 1
                        },
                        {
                            text: 'Owners',
                            flex: 2
                        },
                        {
                            text: 'Theme',
                            flex: 1
                        },
                        {
                            text: 'Section',
                            dataIndex: 'section',
                            flex: 2
                        },
                        {
                            text: 'Instructions',
                            dataIndex: 'instructions',
                            flex: 1
                        }
                    ]
                }
            ]
        }).show();
    },
    /*
     page change requested
     */
    onSaveChanges: function (btn) {
        Ext.toast("Saving changes...");
        var pagePanel = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab();
        this.fireEvent('savePageChanges', pagePanel);

    },
    onToggleOffers: function (btn) {
        Ext.toast("Turn offers " + (( btn.pressed) ? "on" : "off"));
        // loop through all layouts
        // @todo just do for displayed page
        Ext.ComponentQuery.query("promo").forEach(function(po) {
            if ( ! po.excluded) {
                if (btn.pressed) {
                    po.show();
                } else {
                    po.hide();
                }
            }

        });
    }

});