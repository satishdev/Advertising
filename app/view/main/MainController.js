/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Advertising.view.main.MainController', {
    extend: 'Advertising.view.core.BaseViewController',
    id: 'vcmaincontroller',

    alias: 'controller.main',
    tools: undefined,
    requires: [
        'Ext.util.TaskManager'
    ],
    listen: {
        controller: {
            '#vcpagelayoutscontroller': {
                mainPageTabAdded: 'onMainPageTabAdded',
                mainPageTabChanged: 'onMainPageTabChanged'

            },
            '#vctoolpanelcontroller': {
                turnGridsOff: 'onTurnGridsOff',
                addNewPageObject: 'addNewPageObject',
                // things where we want a single view controller we should use in a view such as main
                // e.g. if we do this in a page controller it will fire of every open page
                savePageChanges: 'onSavePageChanges'

            }

        }
    },
    init: function () {
        var me = this;
        Ext.TaskManager.start({
            run: function () {
                console.log("Ping...");
                me.onOpenConnection();
            },
            interval: 30000
        });


        //     me.setMask('Loading', 'Starting Application...');


    },
    /**
     * This is the heavy lifter on actually saving the page changes back to the server
     * We send the server a block of JSON representing the page and let the spring layer take
     * care of most of it
     * @param page
     */
    onSavePageChanges: function(page, isNew){
        var me = this;
        Ext.toast("Saving pages to page type " + page.xtype);
        // get all components on the page
        if ( page.xtype == 'layout') {
            me.saveLayout(page.down('panel'), isNew);
        }
        if ( page.xtype == 'page') {
            me.savePage(page.down('page'));

        }
    },
    savePage: function(page) {
        Ext.toast("Save page..");
    },
    onPrimaryTabChange: function(panel,newTab, oldTab, eOpts) {
        Ext.toast("Primary tab change - update tools");
        var me = this;
        me.fireEvent('primaryTabChange',panel,newTab, oldTab, eOpts);
    },
    saveLayout: function(layout, isNew) {
        var json = [];
        if ( isNew ) {
            Ext.toast("Prompt for new layout name");
        }
        layout.items.each(function(lo) {
            // skip no layout object - e.g. grid or any other furniture on page
            if ( lo.xtype == 'layoutobject') {
                // loop through each dirty object
                if ( lo.dirty == true) {
                    console.log("Layout object was changed %o", lo.getViewModel().getData());
                    var jsonData = {};
                    var data = lo.getViewModel().getData();
                    for(var prop in data){
                        //dont pass in any object joins - e.g stores or anything else odd added to the viewmodel
                        if ( typeof data[prop] != 'object') {
                            jsonData[prop] = data[prop];
                        }
                    }
                    // add to the array to send to the server
                    json.push(jsonData);
                }
            }
        });
        console.log("Sending json %o", json);
        Ext.Ajax.request({
            url: Advertising.util.GlobalValues.serviceURL + "/layout/saveLayout",
            method: 'POST',
            cors: true,
            useDefaultXhrHeader: false,
            timeout: 1450000,
            params: {
                json_req: Ext.encode(json)
            },
            success: function (transport) {
                var response = Ext.decode(transport.responseText);
                console.log("Got response %o", response);
                layout.items.each(function(lo) {
                    if ( lo.dirty == true) {
                        console.log("Checking dirty layout %o", lo);
                        lo.flagClean();
                    }
                });
            },
            failure: function (transport) {
                var response = Ext.decode(transport.responseText);

                Ext.Msg.alert('Error', response.Error);


            }
        });
    },
    onTurnGridsOff: function () {
        var me = this;
        var layouts = me.lookupReference('pagelayouts');
        var activeTab = layouts.getActiveTab();
        Ext.toast("Active " + activeTab.title);
        console.log("Active %o", activeTab);
        var svg = activeTab.getEl().query('rect');
        //var svg = Ext.dom.Query.select('rect');
        console.log("SVG %o", svg);
        if (svg[0]) {
            console.log("Found svg item...updating it");
            svg[0].setAttribute("stroke", me.getRandomColor());
            //   svg[0].setAttribute("stroke", "#FFF");

        }
    },
    getRandomColor: function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    onOpenConnection: function () {
        try {
            console.log("Attempting to ping server...");
            Ext.Ajax.request({
                url: Advertising.util.GlobalValues.serviceURL + "/test/ping",
                method: 'GET',
                cors: true,
                useDefaultXhrHeader: false,
                timeout: 5000,

                success: function (transport) {
                    var response = Ext.decode(transport.responseText);
                    Advertising.util.GlobalValues.serverConnectionLost = false;
                    var statusIcon = Ext.ComponentQuery.query('#serviceStatusIcon')[0];

                    if (Ext.isDefined(statusIcon)) {
                        statusIcon.setIconCls('x-fa fa-feed f-status-ok');
                    }
                    var messageDialog = Ext.ComponentQuery.query('messagebox')[0];
                    if (Ext.isDefined(messageDialog)) {
                        messageDialog.destroy();
                    }
                    console.log("Response %o", response);
                },
                failure: function (transport) {
                    Advertising.util.GlobalValues.serverConnectionLost = true;
                    Ext.MessageBox.show({
                        title: 'Connection error',
                        id: 'serverConnectionErrorMsg',
                        msg: 'That\'s odd.<p/>I seem to be unable to reach the server.<p/>Please refresh the browser. If the error continues contact your system administrator',
                        icon: Ext.MessageBox.ERROR
                    });
                    var statusIcon = Ext.ComponentQuery.query('#serviceStatusIcon')[0];
                    if (Ext.isDefined(statusIcon)) {
                        statusIcon.setIconCls('x-fa fa-feed f-status-error');
                    }
                }
            });
        } catch (err) {
            var statusIcon = Ext.ComponentQuery.query('#serviceStatusIcon')[0];
            if (Ext.isDefined(statusIcon)) {
                statusIcon.setIconCls('x-fa fa-feed f-status-error');
            }
        }

    },
    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    getActiveDesignPage: function () {
        var me = this;
        var designArea = me.lookupReference('pagelayouts');
        Ext.toast("Active tab " + designArea.getActiveTab());
        return designArea.getActiveTab();
    },
    addNewPageObject: function (btn) {
        var me = this;
        // get the currently active page - see if its a design page or layout template
        var page = me.getActiveDesignPage();
        page.addNewLayoutObject();
    },
    onZoomLevelChange: function (slider, newVal, oldVal, eOpts) {
        Ext.suspendLayouts();
        // get the displayed page/layout (if any)
        var pageLayouts = Ext.ComponentQuery.query('pagelayouts')[0];
        Ext.toast("Zoom changed to " + newVal);
        Ext.resumeLayouts(true);
    },
    /* Turn on/off layouts for page view */
    onToggleLayouts: function (btn) {
        Ext.toast("Turn layouts " + (( btn.pressed) ? "on" : "off"));
        // loop through all layouts
        // @todo just do for displayed page
        Ext.ComponentQuery.query("layoutobject").forEach(function (lo) {
            if (btn.pressed) {
                lo.show();
            } else {
                lo.hide();
            }

        });
    },
    onClickLogout: function () {
        //// Remove the localStorage key/value
        //localStorage.removeItem('AdvNGLoggedIn');
        ////
        ////// Remove Main View
        //this.getView().destroy();
        ////
        ////// Add the Login Window
        //Ext.create('Advertising.view.login.Login',{
        //    //xtype: 'login'
        //});
    },
    //,
    /* Turn on/off themes for page view */
    onToggleThemes: function (btn) {
        var pageView = btn.up('pagelayouts');
        console.log("Themes %o %s", pageView, btn.pressed);
        Ext.toast("Turn themes " + (( btn.pressed) ? "on" : "off"));

    }
    ,
    /* Turn on/off grid for page view */
    onToggleGrid: function (btn) {
        var pageView = btn.up('pagelayouts');
        console.log("Grid %o %s", pageView, btn.pressed);
        Ext.toast("Turn grid " + (( btn.pressed) ? "on" : "off"));
        var activeTab = pageView.down('tabpanel').getActiveTab();
        console.log("Active tab %o", activeTab);
    }
    ,

    onMainPageTabAdded: function () {
        var me = this;
        console.log("Showing tool panel");
        //me.getViewModel().set("showTools", true);
        //    me.lookupReference('mainToolPanel').setCollapsed(false);

    }
    ,
    onMainPageTabChanged: function (panel, newCard, oldCard, eOpts) {
        var me = this;

        Ext.toast("Tab panel changed " + panel.title);

        // update the available markets etc in the toolbar
    },

    onActivateMain: function (panel) {
        var me = this;
        var username = Advertising.view.main.common.UserInfo.getName();
        me.getViewModel().set("username", username);

    }
})
;
