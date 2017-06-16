/**
 * Created by Lee on 4/6/2017.
 */
Ext.define('Advertising.view.main.common.UserInfo', {
    singleton: true,
    userInfo: {},
    setUserInfo: function(data){
        this.userInfo = data;
    },
    getName: function() {
        console.log("Returning user info %o", this);
        return this.userInfo.username;
    },
    getUserInfo: function(){
        return this.userInfo;
    }
});