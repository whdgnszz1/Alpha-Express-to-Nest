import { Injectable } from '@nestjs/common';
import { BoardsRepository } from './boards.repository';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  createBoard = async (workspaceId: number, boardName: string) => {
    const newBoard = await this.boardsRepository.createBoard(
      workspaceId,
      boardName,
    );

    return newBoard;
  };
}
