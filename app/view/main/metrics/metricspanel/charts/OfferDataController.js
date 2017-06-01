/**
 * Created by Lee on 6/1/2017.
 */
Ext.define('Advertising.view.main.metrics.metricspanel.charts.OfferDataController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.offerdata',

    /**
     * Called when the view is created
     */
    init: function() {

    },
    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('offer') + ': ' + record.get('baseSalesAmount') );
    }
});