import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';

describe('CreateUser', () => {

  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'Fernando Frascino',
      email: 'fernandofrascino@gobarber.com.br',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an e-mail that already exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'Fernando Frascino',
      email: 'fernandofrascino@gobarber.com.br',
      password: '123123',
    });

    expect(
      createUser.execute({
        name: 'Michelle Yamashita',
        email: 'fernandofrascino@gobarber.com.br',
        password: '321321',
      })
    ).rejects.toBeInstanceOf(AppError);
  })


})
