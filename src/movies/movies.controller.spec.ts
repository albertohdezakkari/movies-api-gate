import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            listMovies: jest.fn<Promise<MovieDto[]>, []>(),
          },
        },
      ],
    }).compile();

    controller = module.get(MoviesController);
    service = module.get(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getMovies() llama al service y devuelve la lista', async () => {
    const data: MovieDto[] = [
      { id: 1, title: 'Coco' },
      { id: 2, title: 'Toy Story' },
    ];

    const listSpy = jest
      .spyOn(service, 'listMovies')
      .mockResolvedValueOnce(data);

    const result = await controller.getMovies();

    expect(listSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(data);
  });
});
