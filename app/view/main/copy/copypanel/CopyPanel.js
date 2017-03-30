/**
 * Created by Lee on 3/22/2017.
 */
Ext.define('Advertising.view.main.copy.copypanel.CopyPanel', {
    extend: 'Ext.panel.Panel',

    title: 'Copy Panel',
    xtype: 'copypanel',

    requires: [
        'Advertising.view.main.copy.copygrid.CopyGrid',
        'Advertising.view.main.copy.copypanel.CopyPanelController',
        'Advertising.view.main.copy.copypanel.CopyPanelModel',
        'Ext.layout.container.Fit'
    ],

    margin:5,

    viewModel: {
        type: 'copypanel'
    },
    layout: 'fit',
    controller: 'copypanel',

    items: [
        {
            xtype: 'copygrid'
        }
    ]
});