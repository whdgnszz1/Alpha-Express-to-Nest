import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class BoardEntity {
  @ApiProperty()
  boardId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  WorkspaceId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  boardName: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsNotEmpty()
  colorId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  deletedAt?: Date;
}
