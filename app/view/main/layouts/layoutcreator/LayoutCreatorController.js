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
        var model = me.getViewModel();
        // create a new layout
        // add the item first
        Ext.Ajax.request({
            url: Advertising.util.GlobalValues.serviceURL + "/layout/addNewLayout",
            method: 'GET',
            cors: true,
            useDefaultXhrHeader: false,
            timeout: 1450000,
            params: {
                // send all the model data as a JSON object
                ajax_req: Ext.JSON.encode(model.data)

            },
            success: function (transport) {
                var response = Ext.decode(transport.responseText);
                console.log("Got response %o", response);

                var parentNode = tree.getStore().getNodeById(record.data.id);

                //  parentNode.setLeaf(false);
                parentNode.appendChild({
                    id: response.id,
                    text: response.text,
                    leaf: false

                });

                if (parentNode){
                    tree.getStore().load({node:parentNode});
                }
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