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
    session: true,
    requires: [
        'Advertising.view.main.common.UserInfo'
    ],

    name: 'Advertising',

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
        // TODO - Launch the application
        Ext.toast("Setting user info..");
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

        Advertising.view.main.common.UserInfo.setUserInfo({test:"test"});

        //Ext.Ajax.on({
        //    requestexception: function(conn, response, options, eOpts) {
        //        console.error("Ajax Error %o %o %o", conn, response, options);
        //        // Show error msg
        //        Ext.Msg.show({
        //            title: 'Error',
        //            message: 'Request Exception ' + response.status,
        //            buttons: Ext.MessageBox.OK,
        //            icon: Ext.MessageBox.ERROR
        //        });
        //
        //    }
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
