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
    init: function() {

    },
    onLoginClick: function() {

        // This would be the ideal location to verify the user's credentials via
        // a server-side lookup. We'll just move forward for the sake of this example.

        // Set the localStorage value to true
        localStorage.setItem("AdvNGLoggedIn", true);

        // Remove Login Window
        this.getView().destroy();

        // Add the main view to the viewport
        Ext.create({
            xtype: 'app-main'
        });

    }
});