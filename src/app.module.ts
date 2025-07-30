import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './config/prisma/prisma.service';
import { PrismaModule } from './config/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { WorkerService } from './modules/users/services/worker.service';
import { WorkerController } from './modules/users/controllers/worker.controller';
import { GroupWorkerService } from './modules/users/services/group-worker.service';
import { GroupWorkerController } from './modules/users/controllers/group-worker.controller';
import { PlotService } from './modules/plots/services/plot.service';
import { PlotController } from './modules/plots/controllers/plot.controller';
import { WorkEntryService } from './modules/users/services/worker-entry.service';
import { WorkEntryController } from './modules/users/controllers/worker-entry.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,            
      envFilePath: '.env',      
    }),
    AuthModule,
    PrismaModule,
  ],
  controllers: [AppController, WorkerController, GroupWorkerController, PlotController, WorkEntryController],
  providers: [AppService, PrismaService, WorkerService, GroupWorkerService, PlotService, WorkEntryService],
})
export class AppModule {}
