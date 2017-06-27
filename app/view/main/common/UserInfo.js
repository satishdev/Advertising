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

        console.log("Returning user name %o", this.userInfo.username);
        return this.userInfo.username;
    },
    getUserInfo: function(){
        console.log("Returning user info %o",  this.userInfo);

        return this.userInfo;
    }
});