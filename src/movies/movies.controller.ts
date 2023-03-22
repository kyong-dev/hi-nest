import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';


@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) { }

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get("search")
    search(@Query('year') year: string) {
        return `We are searching for a movie filmed in ${year}`;
    }

    @Get("/:id")
    getOne(@Param('id') movieId: number) {
        console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }

    @Delete("/:id")
    remove(@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDTO) {
        return this.moviesService.create(movieData);
    }

    @Patch("/:id")
    update(@Param('id') movieId: number, @Body() updateData) {
        return this.moviesService.update(movieId, updateData);
    }

}
