/**
 * Created by Lee on 4/11/2017.
 */
Ext.define('Advertising.view.main.common.model.NodeTest', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'text', type: 'string', mapping: 'text'},
        {name: 'leaf', type: 'boolean', mapping: 'leaf'},
        {name: 'nodetype', type: 'string', mapping: 'nodetype'},
        {name: 'loaded', type: 'boolean', mapping: 'Loaded', defaultValue: false},
        {name: 'Properties'},
        {name: 'expanded', defaultValue: true}
    ]
});