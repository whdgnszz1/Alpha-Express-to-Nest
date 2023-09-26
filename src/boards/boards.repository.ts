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

  updateBoard = async (
    boardId: number,
    userId: number,
    boardName: string,
    colorId: number,
  ) => {
    const dataToUpdate: any = {};
    if (boardName) {
      dataToUpdate.boardName = boardName;
    }

    if (colorId) {
      dataToUpdate.colorId = colorId;
    }
    const updatedBoard = await this.prisma.boards.update({
      where: { boardId },
      data: dataToUpdate,
    });

    return updatedBoard;
  };
}
