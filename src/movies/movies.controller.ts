import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
/*import { Movie } from './movies.entity';*/
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { MovieDto } from './dto/movie.dto';

@ApiTags('movies')
@Controller('api/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOkResponse({ type: MovieDto, isArray: true })
  /*async getMovies(): Promise<Movie[]> {
        return this.moviesService.listMovies();
    }*/
  /*async getMovies(): Promise<any> {
        return [{ name: 'Error intencionado' }];
    }*/
  async getMovies(): Promise<MovieDto[]> {
    return this.moviesService.listMovies();
  }
}
