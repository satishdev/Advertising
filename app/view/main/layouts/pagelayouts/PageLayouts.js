/**
 * Created by Lee on 3/9/2017.
 */
Ext.define('Advertising.view.main.layouts.pagelayouts.PageLayouts', {
    extend: 'Ext.panel.Panel',




    xtype: 'pagelayouts',

    requires: [
        'Advertising.view.main.layouts.pagelayouts.PageLayoutsController',
        'Advertising.view.main.layouts.pagelayouts.PageLayoutsModel',
        'Ext.button.Split',
        'Ext.layout.container.Absolute',
        'Ext.layout.container.Fit',
        'Ext.panel.Panel'
    ],


    viewModel: {
        type: 'pagelayouts'
    },
    scrollable: true,
    layout: 'fit',
    controller: 'pagelayouts',
    defaults: {
        bodyPadding: 2
    },
    items: [
        {
            xtype: 'panel',
            title: 'Page 1',
            padding: 10,
            border: true,
            layout: 'absolute',
            scrollable: true,

            header:{
              items: [
                  {
                      xtype: 'splitbutton',
                      text: 'StoreGroup B'
                  }
              ]
            },
            items: [
                {
                    xtype: 'image',
                    width: '100%',
                    padding: 10,
                    mode: 'background',
                    zIndex:1,
                    src: 'http://w2capl0037210.heb.com:8081/smartmedia/servlet/smartmediaservlet?&type=Page&res=prev&ref=CoreChckbskt.indd'
                },
                {
                    xtype: 'panel',
                    width: 350,
                    height: 220,
                    layout: 'absolute',
                    resizable: true,
                    zIndex: 99,
                    y: 150,
                    x: 130,
                    frame: true,
                    items: [
                        {
                            html: 'This is promo A<br/>Has items X,Y,Z'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    width: 350,
                    height: 220,
                    zIndex: 99,
                    layout: 'absolute',
                    resizable: true,
                    y: 150,
                    x: 530,
                    frame: true,
                    items: [
                        {
                            html: 'This is promo B<br/>Has items A,B,C'
                        }
                    ]
                }


            ]
        }
        /* include child components here */
    ]
});