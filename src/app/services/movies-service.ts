import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../Interface/Movie';

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

}
