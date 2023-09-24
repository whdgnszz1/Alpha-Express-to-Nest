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
}
