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
import { BoardsService } from './boards.service';
import { UpdateBoardRequestDTO } from './dto/board.dto';

@Controller('/api/workspaces/:workspaceId/boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({ summary: '보드 생성' })
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

  @ApiOperation({ summary: '보드 수정' })
  @Put()
  @UseGuards(AuthGuard('jwt'))
  async updateBoard(
    @Param('boardId') boardId: string,
    @Param('workspaceId') workspaceId: string,
    @Request() req: AuthRequest,
    @Body() updateBoardDto: UpdateBoardRequestDTO,
  ) {
    const userId = req.user.userId;
    const result = await this.boardsService.updateBoard(
      +workspaceId,
      +boardId,
      userId,
      updateBoardDto,
    );

    return result;
  }
}
