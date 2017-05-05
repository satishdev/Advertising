/**
 * Created by Lee on 5/5/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.LayoutObjectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.layoutobject',

    requires: [
        'Advertising.view.main.common.pages.layout.LayoutObjectEditWindow'
    ],

    /**
     * Called when the view is created
     */
    init: function() {

    },
    colorMap: {},
    /**
     * When a section value changes then update the layout background color
     * These need to be saved against the layout
     * @param combo
     * @param record
     * @param eOpts
     */
    onSectionChange: function(combo, record, eOpts) {
        var me = this;
        if ( record ) {
            console.log("Combo value changed %o", record);
            var color = me.getRandomColor();
            var panel = combo.up('panel');
            console.log("Layout object %o", panel);
            panel.removeCls('.f-layout-object-clean');

            var comboSection = combo.value;
            console.log("Colour map %o", me.colorMap);
            if (!me.colorMap.hasOwnProperty(comboSection)) {
                me.colorMap[comboSection] = me.getRandomColor();
            }
            panel.setBodyStyle('background-color', me.colorMap[comboSection]);

        }
    },
    onExpandLayoutObject: function(btn) {
        var layoutobject = btn.up('layoutobject');
        console.log("Expand layout %o", layoutobject);
        var myData = {};
        btn.up('layoutobject').items.each(function(f) {
            console.log("Item %o", f);
        });


        var win = Ext.create("Advertising.view.main.common.pages.layout.LayoutObjectEditWindow",
            {
                animateTarget: btn.id
            });
        win.show();
    },
    getRandomColor: function() {
        var letters = 'BCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color ;
    }
});