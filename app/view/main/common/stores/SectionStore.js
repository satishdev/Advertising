/**
 * Created by Lee on 6/14/2017.
 */
Ext.define('Advertising.view.main.common.stores.SectionStore', {
    extend: 'Ext.data.Store',
    alias: 'store.sectionstore',
    proxy: {
        type : 'ajax',
        autoLoad: false,
        useDefaultXhrHeader: false,
        url:  Advertising.util.GlobalValues.serviceURL + '/attributes/getAllSections',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

    /*
    Uncomment to use a specific model class
    model: 'User',
    */

    /*
    Fields can also be declared without a model class:
    fields: [
        {name: 'firstName', type: 'string'},
        {name: 'lastName',  type: 'string'},
        {name: 'age',       type: 'int'},
        {name: 'eyeColor',  type: 'string'}
    ]
    */

    /*
    Uncomment to specify data inline
    data : [
        {firstName: 'Ed',    lastName: 'Spencer'},
        {firstName: 'Tommy', lastName: 'Maintz'},
        {firstName: 'Aaron', lastName: 'Conran'}
    ]
    */
});