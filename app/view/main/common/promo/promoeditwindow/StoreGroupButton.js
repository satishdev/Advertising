/**
 * Created by Lee on 4/20/2017.
 */
Ext.define('Advertising.view.main.common.promo.promoeditwindow.StoreGroupButton', {
    extend: 'Ext.button.Button',

    xtype: 'storegroupbutton',

    requires: [
        'Advertising.view.main.common.promo.promoeditwindow.PromoEditWindowController'
    ],

    groupID: 1,
    controller: 'promoeditwindow',

    items: [
        /* include child components here */
    ]
});