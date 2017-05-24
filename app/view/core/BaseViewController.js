/**
 * Created by Lee on 4/13/2017.
 */
Ext.define('Advertising.view.core.BaseViewController', {
    extend: 'Ext.app.ViewController',
    //alias: 'controller.baseview',
    //id: 'baseViewController',
    /**
     * Called when the view is created
     */
    init: function() {

    },
    loadMask: undefined,
    showError: function(title, message) {
        Ext.Msg.show({
            title:title,
            message: message,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });
    }
    ,
    setMask: function(title, message) {
        var me = this;
        me.loadMask = Ext.getBody().mask(message, title).show();
    },
    hideMask: function() {
        var me = this;

        if ( me.loadMask) {
            me.loadMask.fadeOut();
        }
    }
});