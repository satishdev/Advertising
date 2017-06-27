/**
 * Created by leejw_000 on 2017-06-08.
 */
Ext.define('Advertising.view.main.common.pages.emptypage.EmptyPage', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Advertising.view.main.common.pages.emptypage.EmptyPageController',
        'Advertising.view.main.common.pages.emptypage.EmptyPageModel',
        'Ext.layout.container.Fit'
    ],
    inchWidth: 0,
    inchHeight: 0,
    padding: 10,
    border: true,
    layout: 'fit',
    scrollable: true,
    zoom: 100,

    xtype: 'emptypage',


    viewModel: {
        type: 'emptypage'
    },

    controller: 'emptypage',

    items: [
        {
            html: '<div class="f-empty-page-drop-box">Drop your layout here</div>'
        }
    ]
});