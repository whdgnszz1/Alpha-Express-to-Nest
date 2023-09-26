import { PickType } from '@nestjs/swagger';
import { WorkspaceEntity } from 'src/common/entities/workspace.entity';

export class CreateWorkspaceDTO extends PickType(WorkspaceEntity, [
  'workspaceId',
  'workspaceImage',
  'workspaceName',
]) {}

export class UpdateWorkspaceDTO extends PickType(WorkspaceEntity, [
  'workspaceName',
  'workspaceImage',
]) {}
