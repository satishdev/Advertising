/**
 * Created by Lee on 4/6/2017.
 */
Ext.define('Advertising.view.main.common.UserInfo', {
    singleton: true,
    userInfo: {},
    name: "test",
    setUserInfo: function(data){
        this.userInfo = data;
    },
    getName: function() {
        return this.name;
    },
    getUserInfo: function(){
        return this.userInfo;
    }
});