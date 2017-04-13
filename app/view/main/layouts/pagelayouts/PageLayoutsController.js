/**
 * Created by Lee on 3/9/2017.
 */
Ext.define('Advertising.view.main.layouts.pagelayouts.PageLayoutsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pagelayouts',

    requires: [
        'Advertising.view.main.common.pages.layout.Layout',
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
                url: "http://localhost:8881/layout/getLayout/" + record.get("id"),
                method: 'GET',
                cors: true,
                useDefaultXhrHeader : false,
                timeout: 1450000,
                params: {
                    layoutID:record.get('id')
                },
                success: function (transport) {
                    var response = Ext.decode(transport.responseText);
                    console.log("Got response %o", response);
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
        var me = this;
        var nodetype = record.data.nodetype;
        if ( nodetype == 'PAGE') {
            me.getViewModel().set("pagename", record.data.text);
        }
        console.log("Page view change request");
        Ext.toast("Page change requested " + record.data.nodetype + ":" + record.data.text);
        Ext.ComponentQuery.query('promogrid')[0].setTitle('Promos for ' + record.data.text);
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
        Ext.ComponentQuery.query('promo').forEach(function (promo) {
            console.log("Resize promo %o", promo);
            promo.setWidth(promo.width * widthScale);
            promo.setHeight(promo.height * heightScale);
        });
    }
});