import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WorkspacesRepository {
  constructor(private prisma: PrismaService) {}

  createWorkspace = async (ownerId: number, workspaceName: string) => {
    const newWorkspace = await this.prisma.workspaces.create({
      data: {
        ownerId,
        workspaceName,
        WorkspacesMembers: {
          create: {
            UserId: ownerId,
          },
        },
      },
    });
    return newWorkspace;
  };

  updateWorkspace = async (
    workspaceId: number,
    workspaceName: string,
    workspaceImage: string,
  ) => {
    const dataToUpdate: any = {};
    if (workspaceName) {
      dataToUpdate.workspaceName = workspaceName;
    }

    if (workspaceImage) {
      dataToUpdate.workspaceImage = workspaceImage;
    }
    const updatedWorkspace = await this.prisma.workspaces.update({
      where: { workspaceId },
      data: dataToUpdate,
    });

    return updatedWorkspace;
  };

  findWorkspaceById = async (workspaceId: number) => {
    const existWorkspace = await this.prisma.workspaces.findFirst({
      where: { workspaceId },
    });

    return existWorkspace;
  };
}
