import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { Movie } from './movies.entity';
import type { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

const MOVIE_TOKEN = getRepositoryToken(Movie as unknown as EntityClassOrSchema);

type MovieRepoMock = {
  find: jest.Mock<Promise<Movie[]>, []>;
};

describe('MoviesService', () => {
  let service: MoviesService;
  let repo: MovieRepoMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: MOVIE_TOKEN,
          useValue: {
            find: jest.fn<Promise<Movie[]>, []>(),
          },
        },
      ],
    }).compile();

    service = module.get(MoviesService);
    repo = module.get<MovieRepoMock>(MOVIE_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('listMovies() devuelve lo que devuelve el repo', async () => {
    /*Arrange  → Preparar escenario
      Act      → Ejecutar acción
      Assert   → Verificar resultado
    */
    const data: Movie[] = [
      { id: 1, title: 'Coco' } as Movie,
      { id: 2, title: 'Toy Story' } as Movie,
    ];

    repo.find.mockResolvedValueOnce(data);

    const result = await service.listMovies();

    expect(repo.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual(data);
  });
});
