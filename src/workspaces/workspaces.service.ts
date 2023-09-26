import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateWorkspaceDto } from './dto/workspace.dto';
import { WorkspacesRepository } from './workspaces.repository';

@Injectable()
export class WorkspacesService {
  constructor(private readonly workspacesRepository: WorkspacesRepository) {}
  createWorkspace = async (ownerId: number, workspaceName: string) => {
    const result = await this.workspacesRepository.createWorkspace(
      ownerId,
      workspaceName,
    );

    return result;
  };

  updateWorkspace = async (
    userId: number,
    workspaceId: number,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ) => {
    const existWorkspace = await this.workspacesRepository.findWorkspaceById(
      workspaceId,
    );

    if (!existWorkspace) {
      throw new HttpException(
        '해당 워크스페이스는 존재하지 않습니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (existWorkspace.ownerId !== userId) {
      throw new HttpException(
        '워크스페이스 수정 권한이 존재하지 않습니다.',
        HttpStatus.FORBIDDEN,
      );
    }
    const { workspaceName, workspaceImage } = updateWorkspaceDto;
    const result = await this.workspacesRepository.updateWorkspace(
      workspaceId,
      workspaceName,
      workspaceImage,
    );

    return result;
  };
}
