import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BoardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  createBoard = async (workspaceId: number, boardName: string) => {
    const allColors = await this.prisma.colors.findMany();
    const randomColor = allColors[Math.floor(Math.random() * allColors.length)];
    const randomColorId = randomColor.colorId;

    await this.prisma.boards.create({
      data: { WorkspaceId: workspaceId, boardName, colorId: randomColorId },
    });
  };
}
