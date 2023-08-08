import { QuectoRequester } from './request'
import FormData from 'form-data'

export class Quecto {
  public readonly instanceUrl: string
  public readonly requester: QuectoRequester

  public constructor (instanceUrl: string) {
    this.requester = new QuectoRequester(instanceUrl)
    this.instanceUrl = this.requester.instanceUrl
  }

  /**
   * Shorten a URL
   * @param url URL to shorten
   * @param password Password to protect the URL
   * @example ```js
   * const { Quecto } = require('quecto');
   * let client = new Quecto('https://s.oriondev.fr');
   *
   * client.shortUrl('https://example.com', "password").then((res) => {
   *  console.log(res);
   *  // { original: "https://example.com", shorten: "https://s.oriondev.fr/s/189d6121861c7" }
   * });
   * ```
   */
  public async shortUrl (url: string, password: String): Promise<Response> {
    const formData = new FormData()
    formData.append('link', url)
    if (password !== '') formData.append('password', password)
    return (await this.requester.post('shorten', formData))
  }

  /**
   * Unshorten a URL
   * @param url URL to unshorten
   * @param password Password protecting the URL
   * @example ```js
   * const { Quecto } = require('quecto');
   * let client = new Quecto('https://s.oriondev.fr');
   * client.unshortUrl('https://s.oriondev.fr/s/189d6121861c7', "password").then((res) => {
   *  console.log(res);
   *  // { original: "https://example.com", shorten: "https://s.oriondev.fr/s/189d6121861c7" }
   * });
   */
  public async unshortUrl (url: string, password: String): Promise<Response> {
    // @ts-expect-error
    const code: String = url.split('/').pop()
    if (password !== '') return (await this.requester.get(`s/${code.toString()}?password=${password.toString()}`))
    return (await this.requester.get(`s/${code.toString()}`))
  }

  /**
   * Check if the instance is valid
   * @example ```js
   * const { Quecto } = require('quecto');
   * let client = new Quecto('https://s.oriondev.fr');
   * client.isValidInstance().then((res) => {
   *  console.log(res);
   *  // true
   * });
   * */
  public async isValidInstance (): Promise<Boolean> {
    // @ts-expect-error
    return (await this.requester.get('quectoCheck').then((res: Response) => res.response.status === 200).catch((res) => (res.response === undefined)))
  }
}
