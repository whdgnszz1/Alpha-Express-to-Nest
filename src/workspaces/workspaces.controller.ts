import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { AuthRequest } from 'src/common/types/express.types';
import { UpdateWorkspaceDTO } from './dto/workspace.dto';
import { WorkspacesService } from './workspaces.service';

@Controller('/api/workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @ApiOperation({ summary: '워크스페이스 생성' })
  @Post()
  createWorkspace(@Request() req, @Body() workspaceName: string) {
    const ownerId = req.user.usesrId;
    return this.workspacesService.createWorkspace(ownerId, workspaceName);
  }

  @ApiOperation({ summary: '워크스페이스 수정' })
  @Put(':workspaceId')
  @UseGuards(AuthGuard('jwt'))
  updateWorkspace(
    @Request() req: AuthRequest,
    @Param() workspaceId: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDTO,
  ) {
    const userId = req.user.userId;
    return this.workspacesService.updateWorkspace(
      userId,
      +workspaceId,
      updateWorkspaceDto,
    );
  }
}
