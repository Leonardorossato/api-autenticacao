import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'CPF ou CNPJ do Usuário',
    example: '12345678900',
  })
  document: string;
  @ApiProperty({
    description: 'Senha do Usuário',
    example: '123456',
  })
  password: string;
}
