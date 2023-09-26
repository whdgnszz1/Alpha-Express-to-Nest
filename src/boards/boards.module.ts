import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { PrismaModule } from 'src/prisma.module';
import { BoardsRepository } from './boards.repository';
import { WorkspacesModule } from 'src/workspaces/workspaces.module';

@Module({
  imports: [PrismaModule, WorkspacesModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepository],
})
export class BoardsModule {}
