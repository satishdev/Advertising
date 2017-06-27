/**
 * Created by Lee on 6/26/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.SaveNewLayoutWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.layout.container.Column'
    ],

    width: 400,
    modal: true,
    title: 'Create new layout from source',
    defaults: {
        padding: 5
    },
    buttons: [
        {
            text: 'Create!',
            formBind: true
        },
        {
            text: 'Cancel',
            handler: function(btn) {
                var me = this;
                me.up('window').destroy();
            }
        }
    ],
    /*
    Uncomment to give this component an xtype
    xtype: 'savenewlayoutwindow',
    */

    items: [
        {
            xtype: 'textfield',
            name:'newName',
            fieldLabel: 'New name',
            allowBlank: false

        },
        {
            xtype: 'fieldset',
            layout: 'column',
            columnWidth: 0.5,
            title: 'Save values',
            defaults: {
                xtype: 'checkboxfield',
                labelAlign: 'right'
            },
            items: [
                {
                    fieldLabel: 'Owners',
                    name: 'owners'
                },
                {
                    fieldLabel: 'Header',
                    name: 'section'
                },

                {
                    fieldLabel: 'Promo Type',
                    name: 'promotype'
                },
                {
                    fieldLabel: 'Theme Code',
                    name: 'themecode'
                }
                ,
                {
                    fieldLabel: 'Ad Positions',
                    name: 'adposition'
                } , {
                    fieldLabel: 'Instructions',
                    name: 'instructions'
                }
            ]
        }

    ]
});