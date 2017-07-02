/**
 * Created by Lee on 5/23/2017.
 */
Ext.define('Advertising.view.login.LoginModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.login',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'Login',
            autoLoad: true
        }
        */
    },

    data: {
        username: 'adm1',
        password: 'adm1'
    }
});