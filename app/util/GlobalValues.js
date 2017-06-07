/**
 * Created by Lee on 4/13/2017.
 */
Ext.define('Advertising.util.GlobalValues', {
    //serviceURL: 'http://laheadvsb01.ngco.com:8881',
    serviceURL: 'http://localhost:8881',
    singleton: true,
    serverConnectionLost: true,
    userId: 'leew',
    serverMessageDisplayed: false,
    baseURL: 'BASE_URL',
    configLoaded: false,
    configURL: '',
    configId: 'APWebUI',
    historyURL: 'HISTORY_URL',
    leafUniqueGenerator: 9999999999, // used to ensure leaf values are unique in trees as pageids and event ids overlap
    appConfig: {}

});