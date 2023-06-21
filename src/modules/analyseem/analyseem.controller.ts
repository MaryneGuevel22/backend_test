import { Body, Controller, Get, Param, Post ,SetMetadata , Delete , Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards} from '@nestjs/common';

import { AnalyseemService } from './analyseem.service';
import { CreateAnalyseemDto } from 'src/common/dtos/analyseem-create.dto';
import { Analyseem } from 'src/enteties/analyseem.entity';

@Controller('analyse')
export class AnalyseemController {
constructor(private analyseemService: AnalyseemService){}

@Post(':declaremId')
createOffre(
    @Body() createdeclaredDto:CreateAnalyseemDto,
    @Param('declaremId') declaremId: number
    ): Promise <Analyseem> {
    console.log('====>',createdeclaredDto)
    return this.analyseemService.createDeclareem(declaremId, createdeclaredDto);
  }
@Get()
  async findAll(): Promise<Analyseem[]> {
    return this.analyseemService.getall();
  }

  }
  
