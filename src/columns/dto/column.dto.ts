import { ColumnEntity } from './../../common/entities/column.entity';
import { PickType, PartialType } from '@nestjs/swagger';

export class CreateColumnRequestDTO extends PickType(ColumnEntity, [
  'columnName',
]) {}

export class UpdateColumnRequestDTO extends PartialType(
  PickType(ColumnEntity, ['columnName', 'columnOrder']),
) {}
