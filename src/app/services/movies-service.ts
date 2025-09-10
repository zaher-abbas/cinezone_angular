import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../Interface/Movie';
import {Category} from '../Interface/Category';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.API_URL + '/movies');
  }

  getMovieDetails(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.API_URL}/movies/${id}`);
  }

  getMoviesByCategory(id: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.API_URL + `/categories/${id}/movies`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_URL + '/categories');
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.API_URL}/movies`, movie, {
      withCredentials: true
    });
  }

  editMovie(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.API_URL}/movies/${id}`, movie, {
      withCredentials: true
    });
  }
}

