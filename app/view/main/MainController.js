/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Advertising.view.main.MainController', {
    extend: 'Advertising.view.core.BaseViewController',

    alias: 'controller.main',

    requires: [
        'Advertising.util.GlobalValues',
        'Ext.util.TaskManager'
    ],

    init: function () {
        var serverPingCheck, me = this;
        serverPingCheck = {
            run: function () {
                me.onOpenConnection();
            },
            interval: 15000
        };

        Ext.TaskManager.start(serverPingCheck);

   //     me.setMask('Loading', 'Starting Application...');


    },
    onOpenConnection: function () {
        if (Advertising.util.GlobalValues.serverConnectionLost == true) {
            try {
              console.log("Attempting to ping server...");
                Ext.Ajax.request({
                    url: "http://localhost:8881/test/ping",
                    method: 'GET',
                    cors: true,
                    useDefaultXhrHeader : false,
                    timeout: 300000,

                    success: function (transport) {
                        var response = Ext.decode(transport.responseText);
                        Advertising.util.GlobalValues.serverConnectionLost = false;

                    },
                    failure: function (transport) {
                        var response = Ext.decode(transport.responseText);
                        Ext.Msg.alert('Error', response.Error);

                    }
                });
            } catch (err) {
                console.error("Failed to poll server");
            }
        }
    },
    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    onZoomLevelChange: function(slider,newVal, oldVal,eOpts) {
        Ext.suspendLayouts();
        // get the displayed page/layout (if any)
        var pageLayouts =  Ext.ComponentQuery.query('pagelayouts')[0];
        Ext.toast("Zoom changed to " + newVal);
        Ext.resumeLayouts(true);
    },
    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },
    /* Turn on/off themes for page view */
    onToggleThemes: function (btn) {
        var pageView = btn.up('pagelayouts');
        console.log("Themes %o %s", pageView, btn.pressed);
        Ext.toast("Turn themes " + (( btn.pressed) ? "on" : "off"));
    },
    /* Turn on/off grid for page view */
    onToggleGrid: function (btn) {
        var pageView = btn.up('pagelayouts');
        console.log("Grid %o %s", pageView, btn.pressed);
        Ext.toast("Turn grid " + (( btn.pressed) ? "on" : "off"));
    },
    /*
     page change requested
     */
    onSaveChanges: function (btn) {
        Ext.toast("Saving changes...");

    },
    /* Turn on/off layouts for page view */
    onToggleLayouts: function (btn) {
        var pageView = btn.up('pagelayouts');
        console.log("Layouts %o %s", pageView, btn.pressed);
        Ext.toast("Turn layouts " + (( btn.pressed) ? "on" : "off"));
    },
    onActivateMain: function(panel) {
        var me = this;

        var username = Advertising.view.main.common.UserInfo.getName();
        me.getViewModel().set("username", username);
    }
});
