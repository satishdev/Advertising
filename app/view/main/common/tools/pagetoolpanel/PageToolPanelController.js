/**
 * Created by Lee on 4/20/2017.
 */
Ext.define('Advertising.view.main.common.tools.pagetoolpanel.PageToolPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pagetoolpanel',

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
    }

});