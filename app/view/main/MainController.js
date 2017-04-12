/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Advertising.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

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
