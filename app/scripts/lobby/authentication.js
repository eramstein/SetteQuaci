var LOB = (function (mod) {

    mod.userName;

    function authDataCallback(authData) {
      if (authData) {
        console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
        mod.userName = authData.password.email.slice(0, authData.password.email.indexOf('@')).replace('.', '_');
      } else {
        console.log('User is logged out');
      }
      LOB.displayLobby();
    }

    $(document).ready(function() {
      FIREBASE.onAuth(authDataCallback);
    });

    mod.authenticate = function () {
        console.log('authenticate');
        FIREBASE.authWithPassword({
          email    : $("#input-username").val() || 'eramstein@hotmail.com',
          password : $("#input-password").val() || 'etienne'
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });
    };

    return mod;

}(LOB || {}));