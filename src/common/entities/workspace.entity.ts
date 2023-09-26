import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class WorkspaceEntity {
  @ApiProperty()
  workspaceId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  workspaceName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  workspaceImage?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  deletedAt?: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  ownerId: number;
}
