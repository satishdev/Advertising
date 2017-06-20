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
        this.control({
            'textfield [inputType="password"]': {
                specialkey: function(field, e) {
                    if(e.getKey() == e.ENTER) {
                        field.up('form').getForm().submit();
                    }
                }
            }
        });
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
    onLoginClear: function (btn) {
        var me = this;
        var form = btn.up('window').down('form');
        form.getForm().findField("j_username").setValue("");
        form.getForm().findField("j_password").setValue("");

    },

        onLoginClick: function (btn) {
        var me = this;
        var form = btn.up('window').down('form');
        console.log("Form %o", form);
        var user = form.getForm().findField("j_username").getValue();
        var pass = form.getForm().findField("j_password").getValue();

        //// check user in promoplanner or validate SSO
        Ext.Ajax.request({
            url: Advertising.util.GlobalValues.serviceURL + "/secure/login",
            method: 'POST',
            cors: true,
            useDefaultXhrHeader: false,
            timeout: 1450000,
            params: {
                j_username: user,
                j_password: pass
            },
            success: function (transport) {

                var response = Ext.decode(transport.responseText);
                console.log("Response %o", response);


                // Set the localStorage value to true
                localStorage.setItem("AdvNGLoggedIn", true);

                localStorage.setItem("AdvNGLoggedIn", true);
                localStorage.setItem("AdvUser", 'adm1');
                Advertising.view.main.common.UserInfo.setUserInfo({username: "adm1"});

                // Remove Login Window
                me.getView().destroy();

                // Add the main view to the viewport
                Ext.create({
                    xtype: 'app-main'
                });
            },
            failure: function (transport) {
                try {
                    var response = Ext.decode(transport.responseText);

                    Ext.Msg.alert('Error', response.message);
                } catch  (err) {
                    Ext.Msg.alert("Login failure");
                }

            }
        });

    }

    });