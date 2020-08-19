import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('AuthenticateUserService', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'Fernando Frascino',
      email: 'fernandofrascino@gobarber.com.br',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'fernandofrascino@gobarber.com.br',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    expect(
      authenticateUser.execute({
        email: 'fernandofrascino@gobarber.com.br',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'Fernando Frascino',
      email: 'fernandofrascino@gobarber.com.br',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'fernandofrascino@gobarber.com.br',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
})
