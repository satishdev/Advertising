/**
 * Created by Lee on 4/5/2017.
 */
Ext.define('Advertising.view.main.common.test.Test', {
    extend: 'Ext.Container',

    requires: [
        'Advertising.view.main.common.test.TestModel',
		'Advertising.view.main.common.test.TestController'
    ],

    xtype: 'test',


    viewModel: {
        type: 'test'
    },

    controller: 'test',

    items: [
        /* include child components here */
    ]
});