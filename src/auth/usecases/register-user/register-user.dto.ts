import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Nome do Usuário',
    example: 'John Doe',
  })
  firstName: string;

  @ApiProperty({
    description: 'Sobrenome do Usuário',
    example: 'John Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'Celular do Usuário',
    example: '31999999999',
  })
  cellphone: string;

  @ApiProperty({
    description: 'CPF do Usuário',
    example: '12345678901',
  })
  document: string;

  @ApiProperty({
    description: 'Email do Usuário',
    example: 'jhondoe@dev.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do Usuário',
    example: '123456',
  })
  password: string;
}
