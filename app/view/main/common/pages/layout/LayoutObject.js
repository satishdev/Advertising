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
        'Ext.form.field.ComboBox',
        'Ext.form.field.Tag',
        'Ext.form.field.TextArea',
        'Ext.layout.container.VBox'
    ],
    initComponent: function () {
        var me = this;
        this.callParent(arguments);
        console.log("Edit Mode %o", me.editMode);
        // Ext.toast("Edit mode " + this.editMode);
        if (!me.editMode) {
            me.getViewModel().set("editMode", me.editMode);
        }
        if (me.isNew) {
            me.getViewModel().set("isNew", me.isNew);
        }
        me.getViewModel().set('cellNumber', me.cellNumber);
        // load store one time
        if (! me.getViewModel().getStore("sections").isLoaded()) {
            console.log("Loading sections store...");
            me.getViewModel().getStore("sections").load();
            me.getViewModel().getStore("owners").load();

        }
        me.getViewModel().set('origWidth', me.width);
        me.getViewModel().set('origHeight', me.height);


    },
    firstLayout: true,
    isNew: false,
    workFlowStatus: undefined,
    editMode: true,
    excluded: false,
    cls: 'f-layout-object f-layout-object-clean',
    listeners: {
        afterlayout: 'onAfterLayout',
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
    itemSelector: 'div.f-layout-object',

    resizable: true,
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },

    constrain: true,
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
                    hidden: '{editMode} || {!pageMode}'
                },
                listeners: {
                    //click: 'onToggleGrid',

                }
            },
            {
                iconCls: 'fa fa-edit',
                listeners: {
                    click: 'onShowEdit'
                }
            },

            {
                xtype: 'container',
                name: 'debugInfo',
                cls: 'noSelect f-debug-text',
                bind: {
                    html: '{debugInfo}',
                    visible: '{debug}'
                }
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
        //{
        //    html: '<div class="f-new-layout-ind">*</div>',
        //    bind: {
        //        hidden: '{!isNew}'
        //    }
        //},
        {

            xtype: 'tagfield',
            fieldLabel: 'Owners',
            name: 'owners',
            value: [''],
            bind: {
                store: '{owners}'
            },
            listeners: {
                change: 'onOwnerChange'
            },
            autoShow: true,
            autoSelect: true,
            displayField: 'name',
            valueField: 'name',
            queryMode: 'local',
            forceSelection: true,
            filterPickList: true
        },
        {
            xtype: 'combobox',

            name: 'section',
            queryMode: 'local',
            bind: {
                store: '{sections}',
                fieldLabel: '{sectionName}'
            },
            listeners: {
                change: 'onSectionChange',
                blur: 'onBlurSection'
            },
            typeAhead: true,
            forceSelection: true,
            displayField: 'name',
            valueField: 'name'


        },
        {
            xtype: 'combobox',
            fieldLabel: 'Promo Type',
            bind: {
                store: '{promoTypes}'
            }
        },
        {
            xtype: 'combobox',

            name: 'theme',
            listeners: {
                change: 'onThemeChange'
            },

            bind: {
                store: '{themeCodes}',
                fieldLabel: '{themeName}'
            },


            displayField: 'name',
            valueField: 'name'
        },
        {
            xtype: 'combobox',

            name: 'adPosition',
            //listeners: {
            //    change: 'onThemeChange'
            //},

            bind: {
                store: '{positions}',
                fieldLabel: '{adPosition}'
            },


            displayField: 'name',
            valueField: 'name'
        },
        {
            padding: 3,
            margin: '3 3 0 3',
            name: 'instructions',
            xtype: 'textarea',
            maxLength: 255,
            listeners: {
                change: 'onInstructionChange'
            }

        }
    ],
    setComponentValue: function(name, value) {
        var me =this;
        console.log("Setting value to %o for %s", value,name);
        me.items.each(function(e) {
           if (e.name == name) {
               e.setValue(value);
           }
        });
    }
});