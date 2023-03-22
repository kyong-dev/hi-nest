import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  afterAll(() => {
    console.log("clear database.");

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an empty array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        "title": "Tenet",
        "year": 2022,
        "genres": ["action", "mind blown"]
      })
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID: 999 not found`);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        "title": "Tenet",
        "year": 2022,
        "genres": ["action", "mind blown"]
      })
      const beforeDeleteMovies = service.getAll();
      service.deleteOne(1);
      const afterDeleteMovies = service.getAll();
      expect(afterDeleteMovies.length).toBeLessThan(beforeDeleteMovies.length);
    });

    it('should throw 404 error', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID: 999 not found`);
      }
    });
  });

  describe('createOne', () => {
    it('should create a movie', () => {
      const beforeCreateMovieLength = service.getAll().length;
      expect(beforeCreateMovieLength).toEqual(0);
      service.create({
        "title": "Tenet",
        "year": 2022,
        "genres": ["action", "mind blown"]
      })

      const afterCreateMovieLength = service.getAll().length;
      expect(afterCreateMovieLength).toEqual(1);
      expect(afterCreateMovieLength).toBeGreaterThan(beforeCreateMovieLength);
    });
  });

  describe('updateOne', () => {
    it('should update a movie', () => {
      service.create({
        "title": "Tenet",
        "year": 2022,
        "genres": ["action", "mind blown"]
      })

      const beforeUpdateMovie = service.getOne(1);
      expect(beforeUpdateMovie.year).toEqual(2022);

      service.update(1, {
        "year": 2025
      })
      const afterUpdateMovie = service.getOne(1);
      expect(afterUpdateMovie.year).toEqual(2025);
    });

    it('should throw 404 error', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID: 999 not found`);
      }
    });
  });
});
