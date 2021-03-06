/**
 * Created by Lee on 4/6/2017.
 */

var tpl = new Ext.XTemplate('<ul><tpl for="item.items"><li><b class="f-treatment-text">{treatment}</b> - {id} - {description} </li></tpl></ul><table class="f-table-layout" style="width:250px"><tr><th>List</th><td>${item:this.getListTo}</td><th>Save</th><td>${item:this.getSaveTo}</td></tr><tr><th>Sale</th><td>${item:this.getSaleTo}</td><th>Save %</th><td>%{item:this.getSaveToPct}</td></tr></table>' +
    '', {
    getListTo: function(item) {
        return Number(item.price.listto).toFixed(2);
    },
    getSaleTo: function(item) {
        return Number(item.price.saveto).toFixed(2);
    },
    getSaveTo: function(item) {
        return Number(item.price.saleto).toFixed(2);
    },
    getSaveToPct: function(item) {
        return Math.round(Number(item.price.savetopercent * 100).toFixed(2));
    }
});


Ext.define('Advertising.view.west.treeviews.promos.promogrid.Promogrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'promogrid',

    requires: [
        'Advertising.view.west.treeviews.promos.promogrid.PromogridController',
        'Advertising.view.west.treeviews.promos.promogrid.PromogridModel',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.RowExpander',
        'Ext.util.Format'
    ],

    tools: [
        {
            type: 'filter',
            cls:'component-tool-filter',
            bind: {
                hidden: '{!filterVisible}'
            },
            callback: function (panel) {
                // do filter
                var grid= panel.down('grid');
                var store = panel.getViewModel().getStore('offers');
                console.log("Store %o", store);
                if ( store.isFiltered()) {
                    // remove filter
                    store.clearFilter();
                } else {
                    store.filterBy( function(rec, id) {
                        if(rec.get('onpage') === true) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                }
            }
        }
    ],

    viewConfig: {
        listeners: {
            rowclick: 'onOfferGridRowClick',
            expandbody: function (rowNode, record, expandNode) {
                console.log("Row expanded %o %o %o", rowNode, record, expandNode);
                var theTd = Ext.fly(expandNode).down('p');

                theTd.update(tpl.apply({
                   item: record.data
                }));
            }

        },
        getRowClass: function (record, rowIndex, rowParams, store) {
            var me = this;
            var onPage = false;
            var data = record.data;
            if ( data.hasOwnProperty('onpage')) {
                return ( data.onpage ) ? "f-promo-on-page" : "f-promo-not-valid-for-page";
            } else {
                if (data.hasOwnProperty("status")) {
                    if (data['status'].hasOwnProperty("codes")) {
                        for (var i = 0; i < data['status']['codes'].length; i++) {
                            if (data['status']['codes'][i].hasOwnProperty("onpage")) {
                                onPage = data['status']['codes'][i]['onpage'];
                            }
                        }
                    }
                }
                return (onPage) ? "f-promo-on-page" : "f-promo-not-on-page";

            }
        }
    },
    onPageRecord: function (rec) {

    },
    viewModel: {
        type: 'promogrid'
    },
    layout: 'fit',
    controller: 'promogrid',
    emptyText: 'No offers on selected page/vehicle',
    bind: {
        store: '{offers}'
    },

    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: new Ext.XTemplate(
            '<p><b>Items</p>',
            {
                formatChange: function (v) {
                    var color = v >= 0 ? 'green' : 'red';
                    return '<span style="color: ' + color + ';">' + Ext.util.Format.usMoney(v) + '</span>';
                }
            })
    }],
    columns: [
        {
            xtype: 'actioncolumn',
            sortable: false,
            menuDisabled: false,
            dataIndex: 'status',
            flex: 1,
            text: 'Status',
            items: [{
                handler: 'onPromoOfferItemClick',
                tooltip: 'Info',
                getClass: function (v, metadata, r, rowIndex, colIndex, store) {
                    var styleClass = "";
                    console.log("Check if on page %o", v);
                    var flags = "";
                    if (v.hasOwnProperty("codes")) {
                        for (var i = 0; i < v['codes'].length; i++) {
                            console.log("Offer status %o ", v['codes'][i]);
                            for ( var prop in v['codes'][i]){
                                if (v['codes'][i][prop]) {
                                    console.log("Value os set %s %o",prop, v['codes'][i]);
                                    styleClass += " x-fa f-offer-" + prop;
                                    flags += prop + " ";
                                }
                            }

                        }
                    }

                    metadata.tdAttr = 'data-qtip="' + flags + '"';

                    //if (false) {
                    //    return "x-hide-display";
                    //} else {
                    //    return "x-fa fa-info-circle";
                    //}
                    console.log("Style class %s", styleClass);
                    return styleClass;
                }

            }]
        },

        {
            text: 'ID',
            flex: 3,
            dataIndex: 'id'
        },
        {
            text: 'Name',
            flex: 1,
            dataIndex: 'name'
        }
    ]
});