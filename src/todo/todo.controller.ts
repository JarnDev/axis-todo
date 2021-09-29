import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { editFileName, imageFileFilter } from '../shared/fileUpload';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../decorators/user.decorator';
import { JwtUser } from '../interfaces/jwtUser.interface';
import { GetTodoDto } from './dto/get-todo.dto';
import { PatchTodoDto } from './dto/patch-todo.dto';
import { TodoService } from './todo.service';
import { diskStorage } from 'multer';
import createSchema from './dto/multipart-form-schema';
import { serveFilePath } from '../constants';

@ApiTags('Todo')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: '_upload',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiBody({
    schema: createSchema,
  })
  create(@UploadedFile() file, @Body('data') data, @User() user: JwtUser) {
    data = JSON.parse(data);
    data.picture = `${serveFilePath}/${file.filename}`;
    return this.todoService.create(data, user.userId);
  }

  @Get()
  findAll(@User() user: JwtUser): Promise<GetTodoDto[]> {
    return this.todoService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @User() user: JwtUser): Promise<GetTodoDto> {
    return this.todoService.findOne(id, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() patchTodoDto: PatchTodoDto,
    @User() user: JwtUser,
  ) {
    return this.todoService.patch(id, patchTodoDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @User() user: JwtUser) {
    return this.todoService.remove(id, user.userId);
  }
}
