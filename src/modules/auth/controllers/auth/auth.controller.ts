import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { LoginDto } from '../../dto/login.dto';
import { RegisterUserDto } from '../../dto/register.dto';
import { Public } from '../../../../common/decorators/public.decorator';

@Controller('auth')
export class AuthController  {
    constructor(private readonly authService: AuthService) {}
    @Public()
    @Post('login')
    login(@Body() dto: LoginDto){
        return this.authService.login(dto);
    }
    @Public()
    @Post('register')
    register(@Body() dto: RegisterUserDto) {
        return this.authService.register(dto);
    }
    

}
