
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { BookingService } from '../../core/services/booking.service';
// import { TicketService } from '../../core/services/ticket.service';
// import { TicketDto, BookingDto } from '../../shared/models';

// @Component({
//   selector: 'app-ticket',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './ticket.html',
//   styleUrls: ['./ticket.css']
// })
// export class TicketComponent implements OnInit {
//   ticket: TicketDto | null = null;
//   booking: BookingDto | null = null;
//   isLoading = true;
//   errorMessage = '';
//   isPrintMode = false;


//   mockTicket: TicketDto = {
//     ticketId: 1,
//     creationDate: '2024-10-18T14:30:00',
//     price: 600,
//     ticketCode: 'TK-2024-001-456789',
//     seatId: 12,
//     bookingId: 1
//   };

//   mockBooking: BookingDto = {
//     bookingId: 1,
//     bookingTime: '2024-10-18T14:30:00',
//     totalCost: 1200,
//     userId: 1,
//     sessionId: 101,
//     status: 'active',
//     ticketList: [
//       {
//         ticketId: 1,
//         creationDate: '2024-10-18T14:30:00',
//         price: 600,
//         ticketCode: 'TK-2024-001-456789',
//         seatId: 12,
//         bookingId: 1
//       },
//       {
//         ticketId: 2,
//         creationDate: '2024-10-18T14:30:00',
//         price: 600,
//         ticketCode: 'TK-2024-001-456790',
//         seatId: 13,
//         bookingId: 1
//       }
//     ]
//   };

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private bookingService: BookingService,
//     private ticketService: TicketService
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       const ticketId = +params['id'];
//       if (ticketId) {
//         this.loadTicket(ticketId);
//       } else {

//         const bookingId = +params['bookingId'];
//         if (bookingId) {
//           this.loadBooking(bookingId);
//         } else {
//           this.showDemoTicket();
//         }
//       }
//     });
//   }

//   loadTicket(ticketId: number): void {
//     this.isLoading = true;
    

//     setTimeout(() => {
//       this.ticket = this.mockTicket;
//       this.booking = this.mockBooking;
//       this.isLoading = false;
      

//     }, 500);
//   }

//   loadBooking(bookingId: number): void {

//     setTimeout(() => {
//       this.booking = this.mockBooking;
//       this.ticket = this.mockBooking.ticketList?.[0] || null;
//       this.isLoading = false;
//     }, 500);
    

//   }

//   showDemoTicket(): void {
//     this.ticket = this.mockTicket;
//     this.booking = this.mockBooking;
//     this.isLoading = false;
//   }


//   getSeatInfo(seatId: number): { row: number, number: number, type: string } {

//     const seats: { [key: number]: any } = {
//       12: { row: 3, number: 12, type: 'VIP' },
//       13: { row: 3, number: 13, type: 'VIP' },
//       8: { row: 5, number: 8, type: 'Стандарт' },
//       5: { row: 2, number: 5, type: 'Стандарт' }
//     };
    
//     return seats[seatId] || { row: 1, number: seatId, type: 'Стандарт' };
//   }

//   getSessionInfo(sessionId: number): any {

//     const sessions: { [key: number]: any } = {
//       101: {
//         filmTitle: 'Дюна: Часть вторая',
//         dateTime: '2024-10-18T19:00:00',
//         hallName: 'Большой зал (IMAX)',
//         format: 'IMAX'
//       },
//       102: {
//         filmTitle: 'Оппенгеймер',
//         dateTime: '2024-10-01T20:00:00',
//         hallName: 'Малый зал',
//         format: '2D'
//       },
//       103: {
//         filmTitle: 'Годзилла и Конг',
//         dateTime: '2024-10-20T21:30:00',
//         hallName: '4DX зал',
//         format: '4DX'
//       }
//     };
    
//     return sessions[sessionId] || {
//       filmTitle: 'Неизвестный фильм',
//       dateTime: new Date().toISOString(),
//       hallName: 'Зал 1',
//       format: '2D'
//     };
//   }

//   getUserInfo(userId: number): any {
//     return {
//       name: 'Иван',
//       surname: 'Иванов',
//       email: 'user@example.com'
//     };
//   }

//   formatDateTime(dateTime: string): string {
//     const date = new Date(dateTime);
//     return date.toLocaleDateString('ru-RU', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   }

//   formatTime(dateTime: string): string {
//     const date = new Date(dateTime);
//     return date.toLocaleTimeString('ru-RU', {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   }

//   formatDate(dateTime: string): string {
//     const date = new Date(dateTime);
//     return date.toLocaleDateString('ru-RU', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric'
//     });
//   }

//   getQrCodeUrl(): string {

//     const ticketData = this.ticket 
//       ? `Кинотеатр\nБилет: ${this.ticket.ticketCode}\nФильм: ${this.getSessionInfo(this.booking?.sessionId || 101).filmTitle}\nСеанс: ${this.formatDateTime(this.getSessionInfo(this.booking?.sessionId || 101).dateTime)}`
//       : 'Билет не загружен';
    

//     return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(ticketData)}`;
//   }

//   printTicket(): void {
//     this.isPrintMode = true;
//     setTimeout(() => {
//       window.print();
//       this.isPrintMode = false;
//     }, 100);
//   }

//   downloadPdf(): void {

//     alert('PDF-версия билета будет сгенерирована и скачана');

//   }

//   goToAccount(): void {
//     this.router.navigate(['/account']);
//   }

//   goToHome(): void {
//     this.router.navigate(['/']);
//   }

//   getAllTickets(): TicketDto[] {
//     return this.booking?.ticketList || [];
//   }

//   canCancel(): boolean {
//     if (!this.booking || this.booking.status !== 'active') return false;
    
//     const sessionTime = new Date(this.getSessionInfo(this.booking.sessionId).dateTime);
//     const now = new Date();
//     const hoursDiff = (sessionTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    
//     return hoursDiff > 1;
//   }

//   cancelBooking(): void {
//     if (confirm('Вы уверены, что хотите отменить бронирование? Средства будут возвращены на карту в течение 3-5 дней.')) {
//       if (this.booking) {
//         this.bookingService.cancelBooking(this.booking.bookingId).subscribe({
//           next: () => {
//             if (this.booking) {
//               this.booking.status = 'cancelled';
//             }
//             alert('Бронирование успешно отменено!');
//           },
//           error: (error) => {
//             alert('Ошибка при отмене бронирования');
//           }
//         });
//       }
//     }
//   }
// }

// src/app/pages/ticket/ticket.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';
import { TicketService } from '../../core/services/ticket.service';
import { MovieService } from '../../core/services/movie.service';
import { SessionService } from '../../core/services/session.service';
import { HallService } from '../../core/services/hall.service';
import { AuthService } from '../../core/services/auth.service';
import { TicketDto, BookingDto, SessionDto, FilmDto, HallDto, SeatDto, UserDto } from '../../shared/models';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.css']
})
export class TicketComponent implements OnInit {
  ticket: TicketDto | null = null;
  booking: BookingDto | null = null;
  session: SessionDto | null = null;
  movie: FilmDto | null = null;
  hall: HallDto | null = null;
  user: UserDto | null = null;
  isLoading = true;
  errorMessage = '';
  isPrintMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private ticketService: TicketService,
    private movieService: MovieService,
    private sessionService: SessionService,
    private hallService: HallService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const ticketId = +params['id'];
      const bookingId = params['bookingId'] ? +params['bookingId'] : null;
      
      if (ticketId) {
        this.loadTicket(ticketId);
      } else if (bookingId) {
        this.loadBooking(bookingId);
      } else {
        this.showDemoTicket();
      }
    });
  }

  loadTicket(ticketId: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.ticketService.getTicketById(ticketId).subscribe({
      next: (ticket) => {
        this.ticket = ticket;
        this.loadBooking(ticket.bookingId);
      },
      error: (error) => {
        console.error('Ошибка загрузки билета:', error);
        this.errorMessage = 'Билет не найден';
        this.isLoading = false;
      }
    });
  }

  loadBooking(bookingId: number): void {
    this.bookingService.getBookingById(bookingId).subscribe({
      next: (booking) => {
        this.booking = booking;
        this.ticket = booking.ticketList?.[0] || null;
        
        // Загружаем дополнительную информацию
        if (booking.sessionId) {
          this.loadSession(booking.sessionId);
        }
        
        // Загружаем информацию о пользователе
        this.user = this.authService.getCurrentUser();
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Ошибка загрузки бронирования:', error);
        this.errorMessage = 'Бронирование не найдено';
        this.isLoading = false;
      }
    });
  }

  loadSession(sessionId: number): void {
    this.sessionService.getSessionById(sessionId).subscribe({
      next: (session) => {
        this.session = session;
        
        // Загружаем информацию о фильме
        if (session.filmId) {
          this.loadMovie(session.filmId);
        }
        
        // Загружаем информацию о зале
        if (session.hallId) {
          this.loadHall(session.hallId);
        }
      },
      error: (error) => {
        console.error('Ошибка загрузки сеанса:', error);
      }
    });
  }

  loadMovie(movieId: number): void {
    this.movieService.getMovieById(movieId).subscribe({
      next: (movie) => {
        this.movie = movie || null;
      },
      error: (error) => {
        console.error('Ошибка загрузки фильма:', error);
      }
    });
  }

  loadHall(hallId: number): void {
    this.hallService.getHallById(hallId).subscribe({
      next: (hall) => {
        this.hall = hall;
      },
      error: (error) => {
        console.error('Ошибка загрузки зала:', error);
      }
    });
  }

  showDemoTicket(): void {
    this.isLoading = false;
    // Можно оставить пустым или показать демо-сообщение
  }

  // Методы для отображения данных
  getSeatInfo(seatId: number): { row: number, number: number, type: string } {
    // В реальном приложении здесь должен быть API вызов для получения информации о месте
    // Пока возвращаем заглушку
    return { 
      row: Math.floor(seatId / 10) + 1, 
      number: seatId % 10 || 10, 
      type: seatId % 3 === 0 ? 'VIP' : 'Стандарт' 
    };
  }

  getSessionInfo(sessionId: number): any {
    if (!this.session || !this.movie || !this.hall) {
      return {
        filmTitle: 'Загрузка...',
        dateTime: new Date().toISOString(),
        hallName: 'Загрузка...',
        format: '2D'
      };
    }

    return {
      filmTitle: this.movie.title,
      dateTime: this.session.dateTime,
      hallName: this.hall.hallName,
      format: this.hall.hallType
    };
  }

  getUserInfo(userId: number): any {
    if (!this.user) {
      return {
        name: 'Гость',
        surname: '',
        email: 'email@example.com'
      };
    }

    return {
      name: this.user.name,
      surname: this.user.surname,
      email: this.user.email
    };
  }

  formatDateTime(dateTime: string): string {
    try {
      const date = new Date(dateTime);
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Дата не определена';
    }
  }

  formatTime(dateTime: string): string {
    try {
      const date = new Date(dateTime);
      return date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return '--:--';
    }
  }

  formatDate(dateTime: string): string {
    try {
      const date = new Date(dateTime);
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return 'Дата не определена';
    }
  }

  getQrCodeUrl(): string {
    if (!this.ticket || !this.movie || !this.session) {
      return 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Загрузка...';
    }
    
    const ticketData = `Кинотеатр\nБилет: ${this.ticket.ticketCode}\nФильм: ${this.movie.title}\nСеанс: ${this.formatDateTime(this.session.dateTime)}\nМесто: Ряд ${this.getSeatInfo(this.ticket.seatId).row}, Место ${this.getSeatInfo(this.ticket.seatId).number}`;
    
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(ticketData)}`;
  }

  printTicket(): void {
    this.isPrintMode = true;
    setTimeout(() => {
      window.print();
      this.isPrintMode = false;
    }, 100);
  }

  downloadPdf(): void {
    if (!this.ticket) return;
    
    this.ticketService.generateTicketPdf(this.ticket.ticketId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `билет-${this.ticket!.ticketCode}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Ошибка генерации PDF:', error);
        alert('Не удалось сгенерировать PDF. Пожалуйста, попробуйте распечатать билет.');
      }
    });
  }

  goToAccount(): void {
    this.router.navigate(['/account']);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  getAllTickets(): TicketDto[] {
    return this.booking?.ticketList || [];
  }

  canCancel(): boolean {
    if (!this.booking || this.booking.status !== 'active' || !this.session) return false;
    
    try {
      const sessionTime = new Date(this.session.dateTime);
      const now = new Date();
      const hoursDiff = (sessionTime.getTime() - now.getTime()) / (1000 * 60 * 60);
      
      return hoursDiff > 1;
    } catch (error) {
      return false;
    }
  }

  cancelBooking(): void {
    if (!this.booking) return;
    
    if (confirm('Вы уверены, что хотите отменить бронирование? Средства будут возвращены на карту в течение 3-5 дней.')) {
      this.bookingService.cancelBooking(this.booking.bookingId).subscribe({
        next: () => {
          if (this.booking) {
            this.booking.status = 'cancelled';
          }
          alert('Бронирование успешно отменено!');
        },
        error: (error) => {
          console.error('Ошибка отмены бронирования:', error);
          alert('Ошибка при отмене бронирования. Пожалуйста, попробуйте позже.');
        }
      });
    }
  }
}