const server = 'http://localhost:8080';

declare type Method = "GET" | "POST" | "PUT" | "DELETE"

export default function request(method:Method, url: string, query:any, data:any, response:(data: any, code:number) => void) {
    let headers: any = {
        'Content-Type': 'application/json'
    };
    let queryString: string = '';
    let params: any = {
        method: method,
        Headers: headers,
        mode: 'cors',
        credentials: 'same-origin'
    };

    var r:any = null;

    fetch(server + url + queryString, params)
    .then((response) => {
        r = response;
        return response.json()
    })
    .then((data) => {
        response(data, r.status);
    })
    .catch((error) => {
        response(error, 503);
    })

}