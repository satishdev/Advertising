/**
 * Created by Lee on 5/16/2017.
 */
Ext.define('Advertising.view.main.layouts.layoutcreator.LayoutCreator', {
    extend: 'Ext.window.Window',

    requires: [
        'Advertising.view.main.layouts.layoutcreator.LayoutCreatorController',
        'Advertising.view.main.layouts.layoutcreator.LayoutCreatorModel',
        'Ext.form.FieldContainer',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Form',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox'
    ],
    width: 500,
    title: 'Create new layout',
    layout: 'form',
    xtype: 'layoutcreator',
    modal: true,
    sourceData: undefined,
    viewModel: {
        type: 'layoutcreator'
    },
    listeners: {
        render: 'onRender'
    },
    initComponent: function () {

        this.callParent(arguments);

    },
    controller: 'layoutcreator',

    items: [{
        xtype: 'form',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: false,
        bodyPadding: 10,

        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'right',
            labelWidth: 90,
            labelStyle: 'font-weight:bold'
        },
        items: [
            {
                xtype: 'textfield',
                fieldLabel: 'Name',
                reference: 'namefield',
                bind: {
                    value: '{name}'
                },
                afterLabelTextTpl: [
                    '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                ],
                allowBlank: false

            },
            {
                xtype: 'combobox',
                fieldLabel: 'Default promo type',
                displayField: 'name',
                valueField: 'name',
                bind: {
                    store: '{promotypes}'
                }
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaultType: 'textfield',
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 90
                },

                items: [{
                    xtype: 'numberfield',
                    minValue: 0.10,
                    maxValue: 30.0,
                    bind: {
                        value: '{width}'
                    },

                    allowDecimals: true,
                    decimalPrecision: 2,
                    width: 200,
                    step: 0.05,
                    name: 'pagewidth',
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                    ],
                    fieldLabel: 'Width',
                    allowBlank: false
                }, {
                    xtype: 'numberfield',
                    minValue: 0.1,
                    maxValue: 30,
                    bind: {
                        value: '{height}'
                    },
                    width: 200,
                    allowDecimals: true,
                    decimalPrecision: 2,
                    step: 0.05,
                    name: 'pageheight',
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                    ],
                    fieldLabel: 'Height',
                    margin: '0 0 0 5'
                }]
            },
            {
                xtype: 'textarea',
                multiline: true,
                fieldLabel: 'Description',
                bind: {
                    value: '{description}'
                },
                maxLength: 255,
                allowBlank: true

            }
        ],
        buttons: [
            {
                text: 'OK',
                handler: 'onCreateLayout'
            },
            {
                text: 'Cancel',
                handler: function (btn) {
                    btn.up('window').destroy();
                }
            }
        ]
    }]
});