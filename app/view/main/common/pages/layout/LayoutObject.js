/**
 * Created by Lee on 4/12/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.LayoutObject', {
    extend: 'Advertising.view.main.common.pages.pageobject.PageObject',
    //ui: 'layoutobject',
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
    initComponent: function (params) {
        var me = this;
        this.callParent(arguments);
        console.log("Edit Mode %o", this.editMode);
        // Ext.toast("Edit mode " + this.editMode);
        if (!me.editMode) {
            me.getViewModel().set("editMode", true);
        }
        if (me.isNew) {
            me.getViewModel().set("isNew", me.isNew);
        }
        me.getViewModel().set('cellNumber', me.cellNumber);
        // load store one time
        if (me.loadstores) {
            if (!me.getViewModel().getStore("sectionStore").isLoaded()) {
                console.log("Loading stores...");
                me.getViewModel().getStore("sectionStore").load();
                me.getViewModel().getStore("ownersStore").load();
                me.getViewModel().getStore("promoTypes").load();

            }
        }
        for (var param in params) {
            console.log("Setting param %s", param);
        }
        me.getViewModel().set('origWidth', me.width);
        me.getViewModel().set('origHeight', me.height);

    },
    tools: [
        {
            type: 'left',
            toolTip: 'Fill left',
            handler: 'onFillLeft'
        },
        {
            type: 'up',
            toolTip: 'Fill up',
            handler: 'onFillUp'

        },
        {
            type: 'down',
            toolTip: 'Fill down',
            handler: 'onFillDown'

        }, {
            type: 'right',
            toolTip: 'Fill right',
            handler: 'onFillRight'

        }
    ],
    headerOverCls: 'f-drag-panel-hover',
    loadstores: true,
    autoMove: false,
    isNew: false,
    draggable: true,
    simpleDrag: true,
    bind: {
        title: '{cellNumber}',
    },
    firstLayout: true,
    workFlowStatus: undefined,
    editMode: true,
    excluded: false,
    cls: 'f-layout-object f-layout-object-clean',
    listeners: {
        resize: 'onLayoutObjectResize',
        afterlayout: 'onAfterLayout',
        dblclick: {
            fn: function () {
                console.log("double click %o", this);
                var me = this;
                var panel = Ext.ComponentQuery.query('#' + me.id)[0];
                // panel.removeCls('f-layout-object-clean');
                panel.addCls('f-layout-object-selected');
                var field = panel.down('checkboxfield');
                //var selected = field.selected;
                //field.selected = !selected;
            },
            // You can also pass 'body' if you don't want click on the header or
            // docked elements
            element: 'el'
        },
        dragstart: function (drag, info, e, eOpts) {
            console.log("Drag start ", drag, info, e, eOpts);
            var ghost = drag.proxy;
            drag.proxy.setStyle('z-index',99999);
            console.log("1 Ghost width: %d", ghost.width);
            // set the ghost proxy size
            ghost.getEl().setStyle('width', drag.comp.width + "px");
            ghost.getEl().setStyle('height', drag.comp.height + "px");

            ghost.addCls('f-panel-drag-start');

        },
        drag: function (a, b, c) {
            var comp = a.comp;
            //console.log("A", a);


            var parent = comp.up('layout');
            var container = parent.up('pagelayouts');
            //console.log("Offset %o", container.getPosition());
            var dragX1 = a.proxy.pageX;
            var dragY1 = a.proxy.pageY;
            var dragX2 = dragX1 + comp.width;
            var dragY2 = dragY1 + comp.height;
            Ext.ComponentQuery.query('layoutobject', container).forEach(function (subp) {
                //console.log("Xtype %s", subp.xtype);
                //console.log("Item 1 %s Item 2 %s", comp.id, subp.id);
                if (subp.id != comp.id) {
                    //console.log("Checking other panel %o", subp);
                    // see if panels overlap
                    var pos = subp.getPosition();
                    var otherX1 = pos[0];
                    var otherY1 = pos[1];
                    var otherX2 = otherX1 + subp.width;
                    var otherY2 = otherY1 + subp.height;
                    //console.log("Test..", testX, testY, testX1, testY1);
                    //console.log("Source..x1 %d y1 %d x2 %d y2 %d", dragX1, dragY1, dragX2, dragY2);
                    //console.log("Other..x1 %d y1 %d x2 %d y2 %d", otherX1, otherY1, otherX2, otherY2);

                    if (dragY1 <= otherY2 && dragY2 >= otherY1 && dragX2 >= otherX1 && dragX1 <= otherX2) {
                        subp.getEl().setStyle('border-color', 'red');

                    } else {
                        console.log("miss");
                        subp.getEl().setStyle('border-color', 'blue');

                    }
                }

            });


        },
        dragend: 'onDragEnd'
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
    beginDrag: function () {
    },
    defaults: {
        labelPad: 1,
        padding: '0 0 0 0 ',
        margin: '0 4 0 4',
        labelAlign: 'top'
    },
    tbar: {
        bind : {
            hidden: '{!editMode}'
        },
        items: [
            {
                iconCls: 'fa fa-bullseye',
                text: 'Targeting',
                bind: {
                    hidden: '{layoutMode}'
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
                style: 'float: right',
                xtype: 'container',
                name: 'debugInfo',
                cls: 'noSelect',
                bind: {
                    html: '{debugInfo}',
                    visible: '{debug}'
                }
            }
        ]
    },
    items: [
        {
            xtype: 'container',
            layout: 'fit',
            bind: {
                hidden: '{editMode}',
                html: '<svg viewBox="0 0 400 300" preserveAspectRatio="none" width="100%" height="100%"><text x="50%"  y="15%"  alignment-baseline="middle" stroke="white" stroke-width="2px" text-anchor="middle" font-size="3vw" font-family="verdana" dy=".3em" >{sectionSelection}</text></svg>'

            },
        },

        {

            xtype: 'tagfield',
            fieldLabel: 'Owners',
            name: 'owners',
            value: [''],
            bind: {
                store: '{ownersStore}',
                hidden: '{!editMode}'
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
                store: '{sectionStore}',
                fieldLabel: '{sectionName}',
                hidden: '{!editMode}'
            },
            listeners: {
                change: 'onSectionChange',
                blur: 'onBlurSection'
            },
            typeAhead: true,
            forceSelection: true,
            displayField: 'name',
            valueField: 'id'


        },
        {
            xtype: 'combobox',
            fieldLabel: 'Promo Type',
            displayField: 'name',
            valueField: 'name',
            listeners: {
                change: 'onPromoTypeChange'
            },
            bind: {
                store: '{promoTypes}',
                fieldLabel: '{promoType}',
                hidden: '{!editMode}'
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
                fieldLabel: '{themeName}',
                hidden: '{!editMode}'
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
                fieldLabel: '{adPosition}',
                hidden: '{!editMode}'
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
            bind: {
                hidden: '{!editMode}'
            },
            listeners: {
                change: 'onInstructionChange'
            }

        }
    ],
    setComponentValue: function (name, value) {
        var me = this;
        console.log("Setting value to %o for %s", value, name);
        me.items.each(function (e) {
            if (e.name == name) {
                e.setValue(value);
            }
        });
    },
    showSectionSVG: function() {
        var me = this;
        var el = me.getEl();
        console.log("EL ", el);
        var div = el.select('div.x-box-inner');
        console.log("DIV %o", div);
        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg'); //Create a path in SVG's namespace
        svg.setAttribute("width","100%"); //Set path's data
        svg.setAttribute("height","100%"); //Set path's data
        var text = document.createElement('text');
         var newContent = document.createTextNode("Hi there and greetings!");
        text.appendChild(newContent);
        //text.setAttribute("x", me.getX()); //Set path's data
        //text.setAttribute("y",me.getY()); //Set path's data
        ////text.setAttribute("transform","rotate(30 20,40)"); //Set path's data
        text.setAttribute("font-family","verdana");
        text.setAttribute("font-size","35");

        svg.appendChild(text);


        div.appendChild(svg);
    }
});