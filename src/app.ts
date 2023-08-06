import {QuectoRequester} from "./request";
import FormData from "form-data";

export class Quecto {
    public readonly instanceUrl: string;
    public readonly requester: QuectoRequester;
    private as: any;

    public constructor(instanceUrl: string) {
        this.requester = new QuectoRequester(instanceUrl);
        this.instanceUrl = this.requester.instanceUrl;
    }

    public async shortUrl(url: string): Promise<Response> {
        let formData = new FormData();
        formData.append("link", url);
        return (await this.requester.post("shorten", formData));
    }

    public async unshortUrl(url: string): Promise<Response> {
        // @ts-ignore
        let code: String = url.split("/").pop();
        return (await this.requester.get("s/" + code));
    }

    public async isValidInstance(): Promise<Boolean> {
        // @ts-ignore
        return (await this.requester.get("quectoCheck").then((res: Response) => res.response.status === 200).catch((res) => !res.response));
    }
}