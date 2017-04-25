/**
 * Created by Lee on 4/20/2017.
 */
Ext.define('Advertising.ux.CheckColumn', {
    extend: 'Ext.grid.column.CheckColumn',
    alias: 'widget.advcheckcolumn',

    renderTpl: [
        '<div id="{id}-titleEl" data-ref="titleEl" {tipMarkup}class="', Ext.baseCSSPrefix, 'column-header-inner<tpl if="!$comp.isContainer"> ', Ext.baseCSSPrefix, 'leaf-column-header</tpl>',
        '<tpl if="empty"> ', Ext.baseCSSPrefix, 'column-header-inner-empty</tpl>">',

        '<span class="', Ext.baseCSSPrefix, 'column-header-text-container">',
        '<span class="', Ext.baseCSSPrefix, 'column-header-text-wrapper">',
        '<span id="{id}-textEl" data-ref="textEl" class="', Ext.baseCSSPrefix, 'column-header-text',
        '{childElCls}">',
        '<img class="', Ext.baseCSSPrefix, 'grid-checkcolumn" src="' + Ext.BLANK_IMAGE_URL + '"/>',
        '</span>',
        '</span>',
        '</span>',
        '<tpl if="!menuDisabled">',
        '<div id="{id}-triggerEl" data-ref="triggerEl" role="presentation" class="', Ext.baseCSSPrefix, 'column-header-trigger',
        '{childElCls}" style="{triggerStyle}"></div>',
        '</tpl>',
        '</div>',
        '{%this.renderContainer(out,values)%}'
    ],

    constructor : function(config) {
        var me = this;

        Ext.apply(config, {
            stopSelection: true,
            sortable: false,
            draggable: false,
            resizable: false,
            menuDisabled: true,
            hideable: false,
            tdCls: 'no-tip',
            defaultRenderer: me.defaultRenderer,
            checked: false
        });

        me.callParent([ config ]);

        me.on('headerclick', me.onHeaderClick);
        me.on('selectall', me.onSelectAll);

    },

    onHeaderClick: function(headerCt, header, e, el) {
        var me = this,
            grid = headerCt.grid;

        if (!me.checked) {
            me.fireEvent('selectall', grid.getStore(), header, true);
            header.getEl().down('img').addCls(Ext.baseCSSPrefix + 'grid-checkcolumn-checked');
            me.checked = true;
        } else {
            me.fireEvent('selectall', grid.getStore(), header, false);
            header.getEl().down('img').removeCls(Ext.baseCSSPrefix + 'grid-checkcolumn-checked');
            me.checked = false;
        }
    },

    onSelectAll: function(store, column, checked) {
        var dataIndex = column.dataIndex;
        for(var i = 0; i < store.getCount(); i++) {
            var record = store.getAt(i);
            if (checked) {
                record.set(dataIndex, true);
            } else {
                record.set(dataIndex, false);
            }
        }
    }
});
