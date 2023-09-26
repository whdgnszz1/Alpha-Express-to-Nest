import { Injectable, HttpException } from '@nestjs/common';
import { WorkspacesRepository } from 'src/workspaces/workspaces.repository';
import { BoardsRepository } from './boards.repository';
import { UpdateBoardRequestDTO } from './dto/board.dto';

@Injectable()
export class BoardsService {
  constructor(
    private readonly boardsRepository: BoardsRepository,
    private readonly workspacesRepository: WorkspacesRepository,
  ) {}

  createBoard = async (workspaceId: number, boardName: string) => {
    const newBoard = await this.boardsRepository.createBoard(
      workspaceId,
      boardName,
    );

    return newBoard;
  };

  updateBoard = async (
    workspaceId: number,
    boardId: number,
    userId: number,
    updateBoardDto: UpdateBoardRequestDTO,
  ) => {
    const { boardName, colorId } = updateBoardDto;
    const isExistWorkspace =
      this.workspacesRepository.findWorkspaceById(workspaceId);

    if (!isExistWorkspace) {
      throw new HttpException('존재하지 않는 워크스페이스입니다.', 404);
    }

    const updatedBoard = await this.boardsRepository.updateBoard(
      boardId,
      userId,
      boardName,
      colorId,
    );

    return updatedBoard;
  };
}
