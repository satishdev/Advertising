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

    requires: [
        'Advertising.view.main.common.UserInfo',
        'Advertising.view.main.common.pages.layout.SaveNewLayoutWindow',
        'Ext.util.TaskManager'
    ],

    tools: undefined,
    listen: {
        controller: {
            '#vcpagelayoutscontroller': {
                mainPageTabAdded: 'onMainPageTabAdded',
                mainPageTabChanged: 'onMainPageTabChanged'

            },
            //'#vclayoutgridwindow': {
            //    addNewPageObject: 'addNewPageObject'
            //},

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
    onSavePageChanges: function (page, isNew) {
        var me = this;
        Ext.toast("Saving changes to page type " + page.xtype);
        // get all components on the page
        if (page.xtype == 'layout') {
            me.saveLayout(page, isNew);
        }
        if (page.xtype == 'page') {
            me.savePage(page.down('page'));

        }
    },
    savePage: function (page) {
        Ext.toast("Save page..");
    },
    onPrimaryTabChange: function (panel, newTab, oldTab, eOpts) {
        Ext.toast("Primary tab change - update tools");
        var me = this;
        me.fireEvent('primaryTabChange', panel, newTab, oldTab, eOpts);
    },
    /**
     * Save a layout
     * @param layout
     * @param isNew
     */
    saveLayout: function (layout, isNew) {

        var jsonObjects = [], me = this, jsonData = {};
        console.log("Saving layout %o", layout);
        var layoutData = layout.getViewModel().getData();
        var layouts = Ext.ComponentQuery.query('layoutobject', layout);
        var layoutObjects = [];
        jsonData.objects = layoutObjects;
        for (var prop in layoutData) {
            console.log("->>> Saving prop %s %o %s", prop, layoutData[prop], typeof layoutData[prop]);
            //dont pass in any object joins - e.g stores or anything else odd added to the viewmodel
            if (typeof layoutData[prop] != 'object') {
                jsonData[prop] = layoutData[prop];
            }
        }
        // add to the array to send to the server
        layouts.forEach(function (lo) {
            if (lo.dirty == true) {
                console.log("Layout object is dirty %o", lo.getViewModel().getData());
                var jsonData = {};
                var data = lo.getViewModel().getData();
                for (var prop in data) {
                    console.log("->>> Saving prop %s %o %s", prop, data[prop], typeof data[prop]);

                    //dont pass in any object with proxies - e.g stores or anything else odd added to the viewmodel
                    if (!data[prop].hasOwnProperty('proxy')) {
                        jsonData[prop] = data[prop];
                    }
                }
                // add to the array to send to the server
                layoutObjects.push(jsonData);
            }
        });

        console.log("Layouts %o", layouts);


        if (isNew) {
            var saveWindow = Ext.create('Advertising.view.main.common.pages.layout.SaveNewLayoutWindow',
                {
                    animateTarget: layout.getEl()
                });
            saveWindow.show();
            //Ext.Msg.prompt(
            //    'New layout',
            //    'Enter new layout name',
            //    function (buttonId, value) {
            //        if (buttonId == 'ok'){
            //            // process text value and close...
            //            jsonData['newLayout'] = value;
            //            jsonData['isNew'] = true;
            //            me.sendLayoutSaveRequest(layout,jsonData);
            //
            //        } else {
            //            return false;
            //        }
            //    },
            //    null,
            //    false,
            //    null,
            //    {
            //        autoCapitalize: true,
            //        placeHolder: 'Value please...'
            //    }
            //);
        } else {
            me.sendLayoutSaveRequest(layout,jsonData);

        }




    },
    sendLayoutSaveRequest: function(layout,jsonData) {
        console.log("Sending json %o", jsonData);
        Ext.Ajax.request({
            url: Advertising.util.GlobalValues.serviceURL + "/layout/saveLayout",
            method: 'POST',
            cors: true,
            useDefaultXhrHeader: false,
            timeout: 1450000,
            jsonData: {
                json_req: Ext.encode(jsonData)
            },
            success: function (transport) {
                var response = Ext.decode(transport.responseText);
                console.log("Got response %o", response);
                layout.items.each(function (lo) {
                    if (lo.dirty == true) {
                        console.log("Checking dirty layout %o", lo);
                        lo.flagClean();
                    }
                });
            },
            failure: function (transport) {
                var response = Ext.decode(transport.responseText);

                Ext.Msg.alert('Error', response.message);


            }
        });
    },
    toggleGridSetting: function () {
        var me = this;
        var layouts = me.lookupReference('pagelayouts');
        var activeTab = layouts.getActiveTab();
        Ext.toast("Active " + activeTab.title);
        console.log("Active %o", activeTab);
        // var svg = activeTab.getEl().query('rect');
        var svg = activeTab.getEl().query('svg')[0];

        //var svg = Ext.dom.Query.select('rect');
        console.log("SVG %o", svg);
        if (svg) {
            console.log("Found svg item...updating it");
            // svg[0].setAttribute("stroke", me.getRandomColor());
            var pattern = svg.getElementsByTagName("pattern")[0];
            var rect = pattern.getElementsByTagName("rect")[0];
            var path = pattern.getElementsByTagName("path")[0];
            var curVal = rect.getAttribute("stroke");
            var newVal = ( curVal == '#FFF') ? '#000' : '#FFF';
            rect.setAttribute("stroke",newVal);
            path.setAttribute("stroke", newVal);

        }
    },
    onTurnGridsOff: function () {
        var me = this;
        me.toggleGridSetting();
       // var layouts = me.lookupReference('pagelayouts');
       // var activeTab = layouts.getActiveTab();
       // Ext.toast("Active " + activeTab.title);
       // console.log("Active %o", activeTab);
       //// var svg = activeTab.getEl().query('rect');
       // var svg = activeTab.getEl().query('svg')[0];
       //
       // //var svg = Ext.dom.Query.select('rect');
       // console.log("SVG %o", svg);
       // if (svg) {
       //     console.log("Found svg item...updating it");
       //    // svg[0].setAttribute("stroke", me.getRandomColor());
       //     var pattern = svg.getElementsByTagName("pattern")[0];
       //     var rect = pattern.getElementsByTagName("rect")[0];
       //     var path = pattern.getElementsByTagName("path")[0];
       //     rect.setAttribute("stroke", "#FFF");
       //     path.setAttribute("stroke", "#FFF");
       //
       // }
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
                    var messageDialog = Ext.ComponentQuery.query('#serverConnectionErrorMsg')[0];
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
        var me = this;
        console.log("Performing logout...");
        me.fireEvent('doLogout',me);
        localStorage.clear();
        this.getView().destroy();
        Ext.create({
            xtype: 'login'
        })
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
