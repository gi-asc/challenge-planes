import { HttpRequest, HttpResponse } from './http/protocols/http';

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
