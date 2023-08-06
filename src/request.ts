import axios from "axios";
import FormData from "form-data";

export class QuectoRequester {
    public readonly instanceUrl: string;

    public constructor(instanceUrl: string) {
        if (!instanceUrl.startsWith("http")) instanceUrl = "https://" + instanceUrl;
        if (!instanceUrl.endsWith("/")) instanceUrl += "/";
        if (!instanceUrl.endsWith("/api/")) instanceUrl += "api/";
        this.instanceUrl = instanceUrl;
    }

    public async get(path: string): Promise<any> {
        return (await axios.get(this.instanceUrl + path)).data.data;
    }

    public async post(path: string, body: FormData): Promise<Response> {
        return (await axios.post(this.instanceUrl + path, body)).data.data;
    }
}