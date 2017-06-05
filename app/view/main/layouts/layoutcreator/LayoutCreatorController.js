/**
 * Created by Lee on 5/16/2017.
 */
Ext.define('Advertising.view.main.layouts.layoutcreator.LayoutCreatorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.layoutcreator',

    /**
     * Called when the view is created
     */
    init: function() {

    },
    /**
     * On rendering the window set the focus. Have to give a slight delay otherwise this runs too early
     * @param win
     */
    onRender: function(win) {
        var me = this;
        Ext.defer(function() {
            win.lookupReference('namefield').focus(true, 100);
            // we'll add some data to the view model so its easier to get to later
            win.getViewModel().set('folderID', win.sourceData.id);
            win.getViewModel().set('foldername', win.sourceData.text);

        }, 1);

        console.log("Creator window %o", win);
    },
    current: function()
    {
        var me = this;

        return (this.getSelectionModel().getSelectedNode() || this.root);
    },
    onCreateLayout: function(btn) {
        var me = this;
        var model = me.getViewModel(), data = model.data, json = [];

        console.log("Creating new layout using data: %o", model.data);
        var jsonData = {};
        for(var prop in data){
            //dont pass in any object joins - e.g stores or anything else odd added to the viewmodel
            if ( typeof data[prop] != 'object') {
                jsonData[prop] = data[prop];
            }
        }

        // create a new layout
        // add the item first
        Ext.Ajax.request({
            url: Advertising.util.GlobalValues.serviceURL + "/layout/addNewLayout",
            method: 'POST',
            cors: true,
            useDefaultXhrHeader: false,
            timeout: 1450000,
            params: {
                // send all the model data as a JSON object
                ajax_req: Ext.JSON.encode(jsonData)

            },
            success: function (transport) {
                var response = Ext.decode(transport.responseText);
                console.log("Got response %o", response);
                var tree = Ext.ComponentQuery.query('layouttree')[0];
                var parentNode = tree.getStore().getNodeById(data.folderID);


                parentNode.appendChild(response);
                //parentNode.setLeaf(false);
                //if (parentNode){
                //    tree.getStore().load({node:parentNode});
                //}
                console.log("Closing window...");
                btn.up('window').close();
            },
            failure: function (transport) {
                try {
                    var response = Ext.decode(transport.responseText);

                    Ext.Msg.alert('Error', response.Error);
                } catch (err) {
                    Ext.Msg.alert('Error', err);

                }

            }
        });
    }
});