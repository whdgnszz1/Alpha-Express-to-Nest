import { PickType } from '@nestjs/swagger';
import { WorkspaceEntity } from 'src/common/entities/workspace.entity';

export class CreateWorkspaceDto extends PickType(WorkspaceEntity, [
  'workspaceId',
  'workspaceImage',
  'workspaceName',
]) {}

export class UpdateWorkspaceDto extends PickType(WorkspaceEntity, [
  'workspaceName',
  'workspaceImage',
]) {}
