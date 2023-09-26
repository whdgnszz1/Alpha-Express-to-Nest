import { PartialType, PickType } from '@nestjs/swagger';
import { BoardEntity } from 'src/common/entities/board.entity';

export class CreateBoardRequestDTO extends PickType(BoardEntity, [
  'boardName',
]) {}

export class UpdateBoardRequestDTO extends PartialType(
  PickType(BoardEntity, ['boardName', 'colorId']),
) {}
