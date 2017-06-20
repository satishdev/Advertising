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
    title: 'Login to JDA Advertising',
    closable: false,
    autoShow: true,

    items: {
        xtype: 'form',
        reference: 'form',
        items: [{
            xtype: 'textfield',
            name: 'j_username',
            fieldLabel: 'Username',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'j_password',
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false
        }, {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            value: 'Enter any valid promo-planner user/password <br/>Final solution should use SSO and validate<br/> permissions via pp api'
        }],
        buttons: [{
            text: 'Clear',
            listeners: {
                click: 'onLoginClear'

            }
        }, {
            text: 'Login',
            formBind: true,
            listeners: {
                click: 'onLoginClick'

            }
        }]
    }
});