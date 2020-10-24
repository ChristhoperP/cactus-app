import { Injectable } from "@angular/core";
import { Global } from "./global";
import { AuthService } from "../servicios/auth.service";

@Injectable(
    {providedIn: 'root'}
)
export class UploadService{
    public url: string;

    constructor(
        private _AuthService: AuthService
    ){
        this.url = Global.url;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
        var _authservice = this._AuthService;

        return new Promise(function(resolve, reject) {
            var formData:any = new FormData();
            var xhr = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append(name, files[i], files[i].name);
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if (xhr.status == 200) {
                        resolve(xhr.response);
                    }else{
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader("authorization", `Bearer ${_authservice.getToken()}`);
            xhr.send(formData);
        });
    }
}