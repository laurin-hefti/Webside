class HandelRequest{
    constructor(adress){
        this.serverAdress = adress;
        this.requests = [];
        this.isProssesing = false;

        this.dataBuffer = [];
    }
    
    sendRequest(request, parameters) {
        return new Promise((resolve, reject) => {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let myobj = this.responseText;
                    if (JSON.parse(myobj).mes == "1") {
                        let data = JSON.parse(myobj).data;
                        resolve(data);
                    } else {
                        console.log(requestdata);
                        console.log("error");
                        //reject();
                    }
                }
            };
            let requestdata =   this.serverAdress + "?request=" + request;
            for (let i = 0; i < parameters.length; i ++) {
                requestdata += "&" + parameters[i];
            }
            xhttp.open("GET", requestdata);
            xhttp.send();
        });
    }

    

    sendDataToDataBuffer(data){
        this.dataBuffer.push = data;
        return this.dataBuffer.length-1;
    }

    async sendSingleRequestHandler(request, parameters, f, parameters2 = null){
        let response = await this.sendRequest(request, parameters);
        if (f != null){
            if (parameters2){
                f(response, parameters2);
            }else{
                f(response);
            }
        }
    }

    async chainedRequest(){
        if (this.isProssesing){
            return;
        }
        if (this.requests.length == 0){
            this.isProssesing = false;
            return;
        }
        this.isProssesing = true;
        let data2 = await this.requests[0];
        let data = await this.sendRequest(data2[0], data2[1]);
        this.requests.shift();
        if (data2[2] != null){
            await data2[2](data);
        }
        this.isProssesing = false;
        await this.chainedRequest();
    }


    addRequset(request, parameters, f){
        this.requests.push([request, parameters, f]);
    }
}
