import login from '../config/login.json';

export class LoginService{

    public static getUsername():String{
        return login.username;
    }

    public static getPassword():String{
        return login.password;
    }

    public static getUrl():String{
        return login.urlPath;
    }
};