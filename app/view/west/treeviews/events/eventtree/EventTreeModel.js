/**
 * Created by Lee on 3/9/2017.
 */
Ext.define('Advertising.view.west.treeviews.events.eventtree.EventTreeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.eventtree',

    requires: [
        'Ext.data.TreeStore',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        events: {
            type: 'tree',
            autoLoad: true,
            proxy: {
                type : 'ajax',
                useDefaultXhrHeader: false,
                api: {
                    read:  'http://localhost:8080/event/types'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'events'
                }
            }
        },
        test: {
            type: 'tree',
            root: {
                expanded: true,
                children: [{
                    text: "2018",
                    children: [
                        {
                            text: "Jan 2018",
                            expanded: true,
                            children: [{
                                text: "JDA Ad #1",
                                children: [
                                    {
                                        text: "Page 1",
                                        leaf: true
                                    },
                                    {
                                        text: "Page 2",
                                        leaf: true
                                    },
                                    {
                                        text: "Page 3",
                                        leaf: true
                                    },  {
                                        text: "Page 4",
                                        leaf: true
                                    },
                                    {
                                        text: "Page 5",
                                        leaf: true
                                    }

                                ]
                            }, {
                                text: "JDA Ad #2",
                                children: [
                                    {
                                        text: "Page 1",
                                        leaf: true
                                    },
                                    {
                                        text: "Page 2",
                                        leaf: true
                                    },
                                    {
                                        text: "Page 3",
                                        leaf: true
                                    },  {
                                        text: "Page 4",
                                        leaf: true
                                    },
                                    {
                                        text: "Page 5",
                                        leaf: true
                                    }

                                ]
                            }]
                        }
                    ]
                }
                ]
            }
        }
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'EventTree',
            autoLoad: true
        }
        */
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});