import { Body, Controller, Param, Post, Put, Request } from '@nestjs/common';
import { UpdateWorkspaceDto } from './dto/workspace.dto';
import { WorkspacesService } from './workspaces.service';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  createWorkspace(@Request() req, @Body() workspaceName: string) {
    const ownerId = req.user.usesrId;
    return this.workspacesService.createWorkspace(ownerId, workspaceName);
  }

  @Put(':workspaceId')
  updateWorkspace(
    @Request() req,
    @Param() workspaceId,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    const userId = req.user.userId;
    return this.workspacesService.updateWorkspace(
      userId,
      +workspaceId,
      updateWorkspaceDto,
    );
  }
}
