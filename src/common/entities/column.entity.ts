import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ColumnEntity {
  @ApiProperty()
  colulmId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  BoardId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  columnName: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsNotEmpty()
  columnOrder: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  deletedAt?: Date;
}
