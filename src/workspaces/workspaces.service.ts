import { Injectable } from '@nestjs/common';
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
}
