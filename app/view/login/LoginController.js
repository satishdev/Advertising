/**
 * Created by Lee on 5/23/2017.
 */
Ext.define('Advertising.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    requires: [
        'Advertising.view.main.common.UserInfo'
    ],

    id: 'vclogincontroller',

    listen: {
        controller: {
            '#vcmaincontroller': {
                doLogout: 'doLogout'
            }
        }
    },
    /**
     * Called when the view is created
     */
    init: function () {
        console.log("Init of login controller");
    },
    doLogout: function() {
        console.log("!!");
    },doLogout: function () {
        console.log("Logout...");
        // Remove the localStorage key/value
        localStorage.removeItem('AdvNGLoggedIn');
//
// Remove Main View
        this.getView().destroy();
//
// Add the Login Window
        Ext.create('Advertising.view.login.Login', {
            //xtype: 'login'
        });
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
        localStorage.setItem("AdvUser", 'adm1');
        Advertising.view.main.common.UserInfo.setUserInfo({username: "adm1"});

        // Remove Login Window
        this.getView().destroy();

        // Add the main view to the viewport
        Ext.create({
            xtype: 'app-main'
        });
    }

    });