/**
 * Created by Lee on 4/12/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.LayoutObject', {
    extend: 'Advertising.view.main.common.pages.pageobject.PageObject',
    ui: 'layoutobject',
    controller: 'layoutobject',
    xtype: 'layoutobject',
    viewModel: {
        type: 'layout'
    },
    requires: [
        'Advertising.view.main.common.pages.layout.LayoutModel',
        'Advertising.view.main.common.pages.layout.LayoutObjectController',
        'Ext.container.Container',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Tag',
        'Ext.form.field.TextArea',
        'Ext.layout.container.VBox'
    ],
    initComponent: function () {

        this.callParent(arguments);
        console.log("Edit Mode %o", this.editMode);
       // Ext.toast("Edit mode " + this.editMode);
        if ( !this.editMode) {
            this.getViewModel().set("editMode", this.editMode);
        }
        if ( this.isNew ) {
            this.getViewModel().set("isNew", this.isNew);
        }
        this.getViewModel().set('cellNumber',this.cellNumber );
    },
    isNew: false,
    workFlowStatus: undefined,
    editMode: true,
    excluded: false,
    cls: 'f-layout-object f-layout-object-clean',
    listeners: {
        dblclick: {
            fn: function () {
                console.log("double click %o", this);
                var me = this;
                var panel = Ext.ComponentQuery.query('#' + me.id)[0];
               // panel.removeCls('f-layout-object-clean');
             //   panel.addCls('f-layout-object-selected');
                var field = panel.down('checkboxfield');
                //var selected = field.selected;
                //field.selected = !selected;
            },
            // You can also pass 'body' if you don't want click on the header or
            // docked elements
            element: 'el'
        }
    }
    ,
    border: 2,
    draggable: true,
    resizable: true,
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    zIndex: 99,
    constrain: false,
    defaults: {
        labelPad: 1,
        padding: '0 0 0 0 ',
        margin: '0 4 0 4',
        labelAlign: 'top'
    },
    tbar: {
        items: [
            {
                bind: {
                    text: '{cellNumber}'
                }
            },
            {
                iconCls: 'fa fa-bullseye',
                text: 'Targeting',
                bind: {
                    hidden: '{editMode}'
                },
                listeners: {
                    //click: 'onToggleGrid',

                }
            },
            {
                iconCls: 'fa fa-edit',
                text: 'edit',
                listeners: {
                    //click: 'onShowEdit'
                }
            },

            {
                style: 'float: right',
                xtype: 'container',
                name: 'debugInfo',
                cls: 'noSelect',
                bind: {
                    html: '{debugInfo}',
                    visible: '{debug}'
                }
            },
            {
                xtype: 'checkboxfield'
                //handler: 'onPromoCheckChange'
            }
        ]
    },
    items: [
        //{
        //    xtype: 'button',
        //    width: 30,
        //    iconCls: 'fa fa-edit',
        //    handler: 'onExpandLayoutObject'
        //},
        {
            html: '<div class="f-new-layout-ind"></div>',
            bind: {
                hidden: '{!isNew}'
            }
        },
        {

            xtype: 'tagfield',
            fieldLabel: 'Owners',
            value: [''],
            bind: {
                store: '{owners}',
                readOnly: '{!editMode}'
            },
            displayField: 'name',
            valueField: 'category',
            filterPickList: true
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Section',
            name: 'section',
            value:'',
            bind: {
                store: '{sections}',
                readOnly: '{!editMode}'

            },
            createNewOnEnter: true,
            createNewOnBlur: true,
            listeners: {
                blur: 'onSectionChange'
            },
            queryMode: 'local',
            displayField: 'name',
            valueField: 'name'


        },
        {
            xtype: 'combobox',
            fieldLabel: 'Theme',
            value: '',
            bind: {
                store: '{themeCodes}',
                readOnly: '{!editMode}'
            },


            displayField: 'name',
            valueField: 'name'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Item Details',
            value: 'Tools need to move here.Layouts need to be duplicated if any object is split. E.g. SG1 becomes SG1 and SG2 - all items on SG1 must be duplicated',
            bind: {
                readOnly: '{!editMode}'

            }

        }
    ]
});