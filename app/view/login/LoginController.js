/**
 * Created by Lee on 5/23/2017.
 */
Ext.define('Advertising.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    requires: [
        'Advertising.view.main.Main'
    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },
    onLoginClick: function () {

        //// check user in promoplanner or validate SSO
        //Ext.Ajax.request({
        //    url: Advertising.util.GlobalValues.serviceURL + "/layout/saveLayout",
        //    method: 'POST',
        //    cors: true,
        //    useDefaultXhrHeader: false,
        //    timeout: 1450000,
        //    params: {
        //        json_req: Ext.encode(json)
        //    },
        //    success: function (transport) {
        //        // Set the localStorage value to true
        //        localStorage.setItem("AdvNGLoggedIn", true);
        //
        //        // Remove Login Window
        //        this.getView().destroy();
        //
        //        // Add the main view to the viewport
        //        Ext.create({
        //            xtype: 'app-main'
        //        });
        //    },
        //    failure: function (transport) {
        //        var response = Ext.decode(transport.responseText);
        //
        //        Ext.Msg.alert('Error', response.Error);
        //
        //
        //    }
        //});
        localStorage.setItem("AdvNGLoggedIn", true);

        // Remove Login Window
        this.getView().destroy();

        // Add the main view to the viewport
        Ext.create({
            xtype: 'app-main'
        });


    }
});