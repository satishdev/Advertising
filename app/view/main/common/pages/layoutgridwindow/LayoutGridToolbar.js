/**
 * Created by Lee on 5/22/2017.
 */
Ext.define('Advertising.view.main.common.pages.layoutgridwindow.LayoutGridToolbar', {
    extend: 'Ext.toolbar.Toolbar',

    xtype: 'layoutgridtoolbar',


    items: [
        {
            iconCls: 'fa fa-plus',
            text: 'Add'
        },
        {
            iconCls: 'fa fa-remove',
            text: 'Delete',
            handler: 'onDeleteItemsClick'
        }
    ]
});