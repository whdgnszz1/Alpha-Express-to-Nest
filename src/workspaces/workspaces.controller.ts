import { Body, Controller, Post, Request } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  createWorkspace(@Request() req, @Body() workspaceName: string) {
    const ownerId = req.user.usesrId;
    return this.workspacesService.createWorkspace(ownerId, workspaceName);
  }
}
