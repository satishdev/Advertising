/**
 * Created by Lee on 5/5/2017.
 */
Ext.define('Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.layouttreemenu',
    /**
     * Called when the view is created
     */
    init: function() {

    },
    onAddLayoutFolder: function(menu) {
        Ext.Msg.alert('Error', '!!!');

        Ext.Msg.alert(
            'Welcome!',
            'What\'s your name going to be today?'
            //function (buttonId, value) {
            //    console.log(value);
            //},
            //null,
            //false,
            //null,
            //{
            //    autoCapitalize: true,
            //    placeHolder: 'First-name please...'
            //}
        );
    }
});