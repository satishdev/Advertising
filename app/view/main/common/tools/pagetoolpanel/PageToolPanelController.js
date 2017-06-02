/**
 * Created by Lee on 4/20/2017.
 */
Ext.define('Advertising.view.main.common.tools.pagetoolpanel.PageToolPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pagetoolpanel',

    requires: [
        'Advertising.view.main.common.pages.layoutgridwindow.LayoutGridWindow',
        'Advertising.view.main.common.tools.pagetoolpanel.MarketButton'
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

            },
            '#vcmaincontroller': {
                primaryTabChange: 'onPrimaryTabChange'
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
    onShowOfferData: function(btn) {
        var me = this;
        // get the chart currently displayed
        var metricsPanel = Ext.ComponentQuery.query('metricspanel')[0];
        metricsPanel.getViewModel().set("showEventData", false);
        metricsPanel.getViewModel().set("showOfferData", true);
        this.fireEvent("showOfferDataChart", metricsPanel);

    },
    onShowEventData: function(btn) {
        var me = this;
        // get the chart currently displayed
        var metricsPanel = Ext.ComponentQuery.query('metricspanel')[0];
        metricsPanel.getViewModel().set("showEventData", true);
        metricsPanel.getViewModel().set("showOfferData", false);
        this.fireEvent("showEventDataChart",metricsPanel);
    },
    onToggleStacking: function(btn) {
        var me = this;
        // get the chart currently displayed
        var metricsPanel = Ext.ComponentQuery.query('metricspanel')[0];
        metricsPanel.getViewModel().set("stacked", btn.pressed);
        metricsPanel.down('eventsaleschart').redraw();
    },
    onPrimaryTabChange: function( panel, newCard, oldCard, eOpts) {
        Ext.toast("Primary tab " + newCard.xtype);
        var me = this;
        me.getViewModel().set("hideSplash", true);

        if ( newCard.xtype == 'metricspanel') {
             me.getViewModel().set("showMetricsTools", true);
            me.getViewModel().set("hidePageTools", true);

        } else {
            me.getViewModel().set("showMetricsTools", false);

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
                if ( btn.getEl()) {
                    btn.getEl().highlight();
                }
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
    /**
     * Show the grid edit window of all layout components
     * @param btn
     */
    onShowGridWindow: function(btn) {
        var pagePanel = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab();
        var gridWin = Ext.create('Advertising.view.main.common.pages.layoutgridwindow.LayoutGridWindow',{
            animateTarget: btn.id

        }).show();
    },
    onSaveNew: function (btn) {
        Ext.toast("Saving new copy...");
        var pagePanel = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab();
        this.fireEvent('savePageChanges', pagePanel, true);

    },
    /*
     page change requested
     */
    onSaveChanges: function (btn) {
        Ext.toast("Saving changes...");
        var pagePanel = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab();
        this.fireEvent('savePageChanges', pagePanel, false);

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