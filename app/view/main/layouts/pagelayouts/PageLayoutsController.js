/**
 * Created by Lee on 3/9/2017.
 */
Ext.define('Advertising.view.main.layouts.pagelayouts.PageLayoutsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pagelayouts',

    requires: [
        'Advertising.util.GlobalValues',
        'Advertising.view.main.common.pages.layout.Layout',
        'Advertising.view.main.common.pages.pageview.Page',
        'Ext.layout.container.Absolute'
    ],

    id: 'vcpagelayoutscontroller',

    listen: {
        controller: {
            '#vceventtreecontroller': {
                eventTreeSelection: 'onPageChange'
            },
            '#vclayouttreecontroller': {
                layoutTreeSelection: 'onLayoutClick'
            }
        }
    },
    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * Add the selected layout to the views unless the layout is already present then
     * just make it the active tab
     * @param record
     */
    onLayoutClick: function(record) {
        var tabName = record.get('text'), tabIndex =0;
        console.log("onLayoutClick %o", record);
        Ext.toast("Show layout " + record.data.text);
        Ext.suspendLayouts();
        var me = this, existing = false;
        var pageView = Ext.ComponentQuery.query("pagelayouts")[0];
        // see if we have this tab name already
        pageView.items.each(function(e) {
           if (e.title == tabName) {
               pageView.setActiveTab(tabIndex);
               existing=true;
           }
            tabIndex++;
        });
        if ( !existing ) {
            console.log("Adding layout view to %o", pageView);

            Ext.Ajax.request({
                url: Advertising.util.GlobalValues.serviceURL + "/layout/getLayout/" + record.get("id"),
                method: 'GET',
                cors: true,
                useDefaultXhrHeader : false,
                params: {
                    layoutID:record.get('id')
                },
                success: function (transport) {
                    var response = Ext.decode(transport.responseText);
                    console.log("Got response %o", response);
                    Ext.toast("Adding new layout from server...");
                    var panel = Ext.create('Advertising.view.main.common.pages.layout.Layout', {
                        title: record.get('text'),
                        closable: true,
                        layout: 'absolute',
                        layoutData: response,
                        inchWidth: response.width,
                        inchHeight: response.height
                    });
                    var addIndex = pageView.items.length - 1;
                    pageView.insert(addIndex, panel);
                    pageView.setActiveTab(addIndex);
                },
                failure: function (transport) {
                    var response = Ext.decode(transport.responseText);

                    Ext.Msg.alert('Error', response.Error);


                }
            });
            Ext.resumeLayouts(true);

        }
    },

    onPageChange: function (record) {
        var me = this, existing=false;
        var nodetype = record.data.nodetype;
        if ( nodetype == 'PAGE') {
            me.getViewModel().set("pagename", record.data.text);
        }
        console.log("Page view change request");
       // Ext.toast("Page change requested " + record.data.nodetype + ":" + record.data.text);
        if ( nodetype == 'VEHICLE' || nodetype == 'PAGE') {
            Ext.ComponentQuery.query('promogrid')[0].setTitle('Offers for ' + record.data.text);
        } else {
            Ext.ComponentQuery.query('promogrid')[0].setTitle('No vehicle/page selected');
        }

        var tabName = record.get('text'), tabIndex =0;
        console.log("onPageClick %o", record);
       // Ext.toast("Show page " + record.data.text);
        Ext.suspendLayouts();
        var pageView = Ext.ComponentQuery.query("pagelayouts")[0];
        // see if we have this tab name already
        pageView.items.each(function(e) {
            if (e.title == tabName) {
                pageView.setActiveTab(tabIndex);
                existing=true;
            }
            tabIndex++;
        });
        if ( !existing ) {
            console.log("Adding page view to %o", pageView);

            Ext.Ajax.request({
                url: Advertising.util.GlobalValues.serviceURL + "/event/getPage",
                method: 'GET',
                cors: true,
                useDefaultXhrHeader : false,
                timeout: 1450000,
                params: {
                    pageID:record.get('id')
                },
                success: function (transport) {
                    var response = Ext.decode(transport.responseText);
                    console.log("Got response %o", response);
                    var panel = Ext.create('Advertising.view.main.common.pages.pageview.Page', {
                        title: record.get('text'),
                        closable: true,
                        layout: 'absolute',
                        objectData: response,

                        inchWidth: response.width,
                        inchHeight: response.height
                    });
                    var addIndex = pageView.items.length;
                    pageView.insert(addIndex, panel);
                    pageView.setActiveTab(addIndex);
                },
                failure: function (transport) {
                    var response = Ext.decode(transport.responseText);

                    Ext.Msg.alert('Error', response.Error);


                }
            });
            Ext.resumeLayouts(true);

        }


    },
    onPageResize: function (pageview, width, height, origWidth, origHeight) {
        var me = this;
        if (isNaN(origWidth)) {
            return;
        }
        console.log("Page %o resized %dX%d...moving promos %d-%d", pageview, width, height, origWidth, origHeight);
        var widthScale = width / origWidth;
        var heightScale = height / origHeight;
        console.log("New scale %f x %f", widthScale, heightScale);
        Ext.ComponentQuery.query('page').forEach(function (page) {
            console.log("Resize page %o", page);
            page.setWidth(page.width * widthScale);
            page.setHeight(page.height * heightScale);
        });
        Ext.ComponentQuery.query('promo').forEach(function (promo) {
            console.log("Resize promo %o", promo);
            promo.setWidth(promo.width * widthScale);
            promo.setHeight(promo.height * heightScale);
        });
        Ext.ComponentQuery.query('layoutobject').forEach(function (layout) {
            console.log("Resize layout %o", layout);
            layout.setWidth(layout.width * widthScale);
            layout.setHeight(layout.height * heightScale);
        });
    },
    onPageTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        Ext.toast('Tab panel changed...');
        var me =this;
        this.fireEvent('mainPageTabChanged', tabPanel, newCard, oldCard, eOpts);

    },

    onPageTabAdded: function (panel, container, pos, eOpts) {
        Ext.toast('Tab panel added...' + panel.title);
        var me =this;
        this.fireEvent('mainPageTabAdded', panel, container, pos, eOpts);
    }
});