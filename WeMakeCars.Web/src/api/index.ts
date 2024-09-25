import { Api } from "./Api";

export function createApi() {
    console.log('@@ creaet api');
    return new Api({
        baseUrl: window.location.origin
    });
}
