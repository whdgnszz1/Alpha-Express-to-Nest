import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardsService } from './boards.service';

@Controller('/workspaces/:workspaceId/boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createBoard(
    @Param('workspaceId') workspaceId: string,
    @Body('boardName') boardName: string,
  ) {
    const result = await this.boardsService.createBoard(
      +workspaceId,
      boardName,
    );
    return result;
  }
}
