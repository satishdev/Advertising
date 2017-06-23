/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */


//Ext.Error.handle = function(err) {
//    alert("Error!");
//    if (err.someProperty == 'NotReallyAnError') {
//        // maybe log something to the application here if applicable
//        return true;
//    }
//    // any non-true return value (including none) will cause the error to be thrown
//};

Ext.define('Advertising.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'Advertising.util.GlobalValues',
        'Advertising.view.login.Login',
        'Advertising.view.main.Main',
        'Ext.data.proxy.Ajax'
    ],

    name: 'Advertising',
    splashscreen: {},
    stores: [
        'Advertising.view.main.common.stores.SectionStore'
    ],
    init: function () {
        // start the mask on the body and get a reference to the mask
        //splashscreen = Ext.getBody().mask('Loading Advertising, please stand by ...', 'splashscreen');
    },
    launch: function () {
        // TODO - Launch the application
        Ext.override(Ext.data.proxy.Ajax, {timeout: 60000});

        //var task = new Ext.util.DelayedTask(function () {
        //
        //    // fade out the body mask
        //    splashscreen.fadeOut({
        //        duration: 500,
        //        remove: true
        //    });
        //
        //    // fade out the message
        //    splashscreen.next().fadeOut({
        //        duration: 500,
        //        remove: true
        //    });
        //
        //});
        //task.delay(1000);

        // It's important to note that this type of application could use
        // any type of storage, i.e., Cookies, LocalStorage, etc.
        var loggedIn;

        // Check to see the current value of the localStorage key
        loggedIn = localStorage.getItem("AdvNGLoggedIn");
        if ( loggedIn ) {
            localStorage.removeItem("AdvNGLoggedIn");
        }

        console.log("LOgged in %o", loggedIn);
        // get bootstrap data
        Ext.Ajax.request({

            url: Advertising.util.GlobalValues.serviceURL + "/config/bootstrap",
            method: 'POST',
            cors: true,
            useDefaultXhrHeader: false,
            timeout: 1450000,

            success: function (transport) {
                var response = Ext.decode(transport.responseText);
                Advertising.util.GlobalValues.bootstrap = response;
                console.log("Global bootstrap data %o", Advertising.util.GlobalValues.bootstrap);

            },
            failure: function (transport) {
                Ext.Msg.buttonText.ok = 'Understood';
                Ext.MessageBox.show({
                    title: 'Connection failure',
                    msg: 'Hmm...I can&apos;s talk to the server, check you have network access.<br/>Failing that try reloading the page<br/>If it still fails then contact your system admin',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.Msg.ERROR
                });
                Ext.Msg.buttonText.ok = 'Got it';

            }
        });

        //var cp = Ext.create('Ext.state.CookieProvider', {
        //    path: "/",
        //    expires: new Date(new Date().getTime()+(1000*60*60*24*30)), //30 days
        //    domain: "jda.com"
        //});
        //
        //Ext.state.Manager.setProvider(cp);
        //
        //Advertising.user = Ext.state.Manager.set('user', {
        //    first_name: 'John',
        //    last_name: 'Doe'
        //});

        // This ternary operator determines the value of the TutorialLoggedIn key.
        // If TutorialLoggedIn isn't true, we display the login window,
        // otherwise, we display the main view

        if ( loggedIn ) {
            Ext.create({
                xtype: 'app-main'
            });
        } else {
            Ext.create('Advertising.view.login.Login',{});
        }
        //Ext.create({
        //    xtype: loggedIn ? 'app-main' : 'login'
        //});




    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
