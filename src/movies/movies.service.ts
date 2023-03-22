import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id)
        if (!movie) {
            throw new NotFoundException(`Movie with ID: ${id} not found`);
        }
        return movie;
    }

    deleteOne(id: number): boolean {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
        return true;
    }

    create(movieData: CreateMovieDTO): boolean {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        });
        return true;
    }

    update(id: number, updateData: UpdateMovieDTO) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        const newMovie = { ...movie, ...updateData };
        this.movies.push(newMovie);
        return newMovie;
    }
}
