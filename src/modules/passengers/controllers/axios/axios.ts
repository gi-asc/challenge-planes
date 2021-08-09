import axios from 'axios';

export interface ExternConsult {
  consult(city: string, url: string, apiKey: string): Promise<boolean>;
}

export class ExternConsultAdapter implements ExternConsult {
  async consult(city: string, url: string, apiKey: string): Promise<boolean> {
    const instance = axios.create({
      baseURL: url,
      headers: { apikey: apiKey },
      data: {
        city: city,
      },
    });

    const result = await instance
      .post(url, { city: city })
      .then(response => {
        return response.data.canChange;
      })
      .catch(error => {
        throw error;
      });

    return result as boolean;
  }
}
