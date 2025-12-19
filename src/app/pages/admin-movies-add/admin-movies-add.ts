// src/app/pages/admin-movies-add/admin-movies-add.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FilmDto } from '../../shared/models';
import { MovieService } from '../../core/services/movie.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-movies-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-movies-add.html',
  styleUrls: ['./admin-movies-add.css']
})
export class AdminMoviesAdd {

  movie: FilmDto = {
    filmId: 0,
    title: '',
    description: '',
    releaseDate: new Date().toISOString().substring(0, 10),
    duration: 120,
    directorId: 1, // Изменил на 1 по умолчанию
    countryId: 1,  // Изменил на 1 по умолчанию
    ageRating: '0+',
    genres: [],
    sessionList: []
  };

  genreOptions = [
    'action', 'comedy', 'drama', 'fantasy', 'horror', 
    'romance', 'scifi', 'thriller', 'animation', 'adventure',
    'documentary', 'family', 'musical', 'mystery', 'western'
  ];

  // Убрал загрузку файлов для упрощения
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private movieService: MovieService,
    private router: Router,
    private authService: AuthService
  ) {}

  // Метод для навигации
  navigateToMovies() {
    if (this.isSubmitting) return;
    this.router.navigate(['/admin/movies']);
  }

  toggleGenre(genre: string) {
    const index = this.movie.genres.indexOf(genre);
    if (index > -1) {
      this.movie.genres.splice(index, 1);
    } else {
      this.movie.genres.push(genre);
    }
  }

  addMovie() {
    // Проверка авторизации
    if (!this.authService.isAuthenticated()) {
      this.errorMessage = 'Вы не авторизованы';
      return;
    }

    // Проверка прав администратора
    if (!this.authService.isAdmin()) {
      this.errorMessage = 'Только администраторы могут добавлять фильмы';
      return;
    }

    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Создаем объект фильма для отправки
    const movieData = {
      title: this.movie.title,
      description: this.movie.description,
      releaseDate: this.movie.releaseDate,
      duration: this.movie.duration,
      directorId: this.movie.directorId,
      countryId: this.movie.countryId,
      ageRating: this.movie.ageRating,
      genres: this.movie.genres
      // posterUrl можно будет добавить позже через отдельный эндпоинт
    };

    console.log('Отправляемые данные:', movieData);

    this.movieService.createMovie(movieData).subscribe({
      next: (createdMovie) => {
        this.isSubmitting = false;
        this.successMessage = `Фильм "${createdMovie.title}" успешно добавлен!`;
        
        setTimeout(() => {
          this.router.navigate(['/admin/movies']);
        }, 2000);
      },
      error: (error) => {
        console.error('Ошибка при добавлении фильма:', error);
        console.error('Детали ошибки:', error.error);
        
        // Более детальные сообщения об ошибках
        if (error.status === 403) {
          this.errorMessage = 'Доступ запрещен. Проверьте права доступа.';
        } else if (error.status === 401) {
          this.errorMessage = 'Требуется авторизация. Войдите в систему.';
        } else if (error.status === 400) {
          this.errorMessage = 'Некорректные данные: ' + (error.error?.message || 'проверьте введенные данные');
        } else {
          this.errorMessage = error.error?.message || 'Не удалось добавить фильм. Код ошибки: ' + error.status;
        }
        
        this.isSubmitting = false;
      }
    });
  }

  validateForm(): boolean {
    if (!this.movie.title.trim()) {
      this.errorMessage = 'Введите название фильма';
      return false;
    }

    if (!this.movie.description.trim()) {
      this.errorMessage = 'Введите описание фильма';
      return false;
    }

    if (!this.movie.releaseDate) {
      this.errorMessage = 'Выберите дату релиза';
      return false;
    }

    if (this.movie.duration < 1) {
      this.errorMessage = 'Длительность должна быть больше 0';
      return false;
    }

    if (this.movie.directorId <= 0) {
      this.errorMessage = 'Введите корректный ID режиссера';
      return false;
    }

    if (this.movie.countryId <= 0) {
      this.errorMessage = 'Введите корректный ID страны';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  resetForm() {
    if (this.isSubmitting) return;
    
    this.movie = {
      filmId: 0,
      title: '',
      description: '',
      releaseDate: new Date().toISOString().substring(0, 10),
      duration: 120,
      directorId: 1,
      countryId: 1,
      ageRating: '0+',
      genres: [],
      sessionList: []
    };
    this.successMessage = '';
    this.errorMessage = '';
  }
}