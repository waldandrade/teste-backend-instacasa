import { UserRepository } from '@repositories';
import { User } from '@domains';
import { ValidationError } from '@errors';
import { UserModel } from '@models';
import { UserInterface } from '@types';
import { CreateUserUseCase } from '@useCases';

describe('Create User', () => {
  
  beforeEach(async () => {
    const repository = new UserRepository<UserInterface, UserModel>();
    await repository.deleteAll();
  });
  
  test('Should create new user', async () => {
    const createUser = new CreateUserUseCase();
    const partialUser: Partial<UserInterface> = {
      name: 'Teste', isAdmin: true, active: true
    };
    const user = await createUser.execute(partialUser);
    expect(user).toBeInstanceOf(User);
  });

  test('Shouldn\'t create user without name', async () => {
    const createUser = new CreateUserUseCase();
    const partialUser: Partial<UserInterface> = {
      isAdmin: true, active: true
    };
    await expect(() => 
      createUser.execute(partialUser)
    ).rejects.toThrowError(new ValidationError('O nome do usuário é obrigatório'));
  });
});