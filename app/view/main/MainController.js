/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Advertising.view.main.MainController', {
    extend: 'Advertising.view.core.BaseViewController',

    alias: 'controller.main',
    tools: undefined,
    requires: [
        'Advertising.util.GlobalValues',
        'Advertising.view.main.common.tools.pagetoolpanel.PageToolPanel',
        'Ext.util.TaskManager'
    ],

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
    onOpenConnection: function () {
        try {
            console.log("Attempting to ping server...");
            Ext.Ajax.request({
                url: "http://localhost:8881/test/ping",
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
    onZoomLevelChange: function (slider, newVal, oldVal, eOpts) {
        Ext.suspendLayouts();
        // get the displayed page/layout (if any)
        var pageLayouts = Ext.ComponentQuery.query('pagelayouts')[0];
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
    /**
     * Find the page that needs an artifact added
     * @param btn
     */
    onShowTools: function(btn) {
        var me = this;

        var existing = Ext.ComponentQuery.query('pagetoolpanel')[0];
        if (! Ext.isDefined(existing)) {
            var tools = Ext.create("Advertising.view.main.common.tools.pagetoolpanel.PageToolPanel", {
                animateTarget: btn
            });
            var windowSize = Ext.getBody().getViewSize();
            console.log("Window size is %d x %d", windowSize.width, windowSize.height);
            tools.showAt(windowSize.width - 200, 200);
        } else {
            if ( existing.collapsed ) {
                existing.expand(true);
            }
        }

    },

    onActivateMain: function (panel) {
        var me = this;

        var username = Advertising.view.main.common.UserInfo.getName();
        me.getViewModel().set("username", username);
    }
});
