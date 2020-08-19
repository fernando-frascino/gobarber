import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

export default class BCriptHashProvider implements IHashProvider{
  public async generateHash(paylaod: string): Promise<string> {
    return paylaod;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
