/**
 * Created by Lee on 4/20/2017.
 */
Ext.define('Advertising.view.main.common.tools.pagetoolpanel.PageToolPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pagetoolpanel',
    id: 'vctoolpanelcontroller',
    /**
     * Called when the view is created
     */
    init: function() {

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
    updatePanelLayerInfo: function() {
        Ext.toast('Adding applicable layer owners..');
    },
    /* Turn on/off layouts for page view */
    onToggleLayouts: function (btn) {
        Ext.toast("Turn layouts " + (( btn.pressed) ? "on" : "off"));
        // loop through all layouts
        // @todo just do for displayed page
        Ext.ComponentQuery.query("layoutobject").forEach(function(lo) {
            if ( btn.pressed) {
                lo.show();
            } else {
                lo.hide();
            }

        });
    }

});