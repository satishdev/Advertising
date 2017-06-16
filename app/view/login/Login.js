/**
 * Created by Lee on 5/23/2017.
 */
Ext.define('Advertising.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [
        'Advertising.view.login.LoginController',
        'Ext.form.Panel',
        'Ext.form.field.Display',
        'Ext.form.field.Text'
    ],
    controller: 'login',
    bodyPadding: 10,
    title: 'Login Window',
    closable: false,
    autoShow: true,

    items: {
        xtype: 'form',
        reference: 'form',
        items: [{
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'Username',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false
        }, {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            value: '** DEV ** Enter any non-blank password <br/>should use SSO and validate permissions'
        }],
        buttons: [{
            text: 'Login',
            formBind: true,
            listeners: {
                click: 'onLoginClick'

            }
        }]
    }
});