/**
 * Created by Lee on 5/9/2017.
 */
Ext.define('Advertising.view.main.common.tools.pagetoolpanel.MarketButton', {
    extend: 'Ext.button.Button',
    //
    //requires: [
    //    'Advertising.view.main.common.tools.pagetoolpanel.PageToolPanelController'
    //],

//    controller: 'pagetoolpanel',
    marketID: -1,
    xtype: 'marketbutton',
    pressed: true, // on by default

    handler: 'onClickMarketButton'
});