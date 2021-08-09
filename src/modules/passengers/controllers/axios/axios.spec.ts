import { ExternConsultAdapter } from './axios';

describe('Axios', () => {
  const makeSut = () => {
    const sut = new ExternConsultAdapter();
    return sut;
  };
  test('Should consult return true if canChange return true', async () => {
    const sut = makeSut();
    const url = 'http://mockbin.org/bin/2533a10c-28f9-41e5-aea4-ec29967f9967';
    const apiKey = '7a173dea-e591-11eb-ba80-0242ac130004';
    const city = 'any_city';

    const isValid = await sut.consult(city, url, apiKey);
    expect(isValid).toBe('true');
  });

  test('Should consult return false if canChange return false', async () => {
    const sut = makeSut();
    const url = 'http://mockbin.org/bin/9367c3b0-6a8b-4004-961d-4fcab813ed8a';
    const apiKey = '7a173dea-e591-11eb-ba80-0242ac130004';
    const city = 'any_city';

    const isValid = await sut.consult(city, url, apiKey);
    expect(isValid).toBe('false');
  });
});
