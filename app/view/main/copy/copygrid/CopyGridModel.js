/**
 * Created by Lee on 3/22/2017.
 */
Ext.define('Advertising.view.main.copy.copygrid.CopyGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.copygrid',

    stores: {
        sample: {
            data: [
                {
                UPC: '12345',
                language: 'Eng',
                copyTab: 'Header',
                    description: 'Sample product',
                    updateSource: true,
                    promo: 'Promo A',
                text: 'Some sample header text'
            },
                {
                    UPC: '12345',
                    language: 'Eng',
                    copyTab: 'Body',
                    description: 'Sample product',
                    promo: 'Promo A',
                    updateSource: true,

                    text: 'Some sample body text<br/>that spans more than one line'
                },
                {
                    UPC: '12345',
                    language: 'Eng',
                    copyTab: 'Footer',
                    description: 'Sample product',
                    promo: 'Promo A',
                    updateSource: true,

                    text: 'Some sample footer text'
                }
            ]
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});