import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../../services/auth/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn().mockResolvedValue({
      access_token: 'fake-access-token',
      refresh_token: 'fake-refresh-token',
    }),
    register: jest.fn().mockResolvedValue({
      id: 1,
      nombre: 'Usuario Prueba',
      email: 'prueba@test.com',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login and return tokens', async () => {
    const result = await controller.login({ email: 'test@test.com', password: '123456' });

    expect(result).toEqual({
      access_token: 'fake-access-token',
      refresh_token: 'fake-refresh-token',
    });
    expect(mockAuthService.login).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456',
    });
  });

  it('should register a new user', async () => {
    const result = await controller.register({ name: 'Usuario Prueba', email: 'prueba@test.com', password: '123456', phone: '123456789', dni: '123456789', roleId: 1, farmId: 1 });
  
    expect(result).toEqual({
      id: 1,
      nombre: 'Usuario Prueba',
      email: 'prueba@test.com',
      phone: '123456789',
      dni: '123456789',
      roleId: 1,
      farmId: 1,
    });
    expect(mockAuthService.register).toHaveBeenCalled();
  });
});