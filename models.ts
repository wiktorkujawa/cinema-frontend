export interface Session {
    _id: string,
    title: string,
    movie_id: string,
    hall_id: string,
    start: string,
    end: string,
}

export type SessionEvent = Omit<Session, 'start'|'end'> & { start: Date, end: Date  };

export interface SessionDetail extends Session {
    movie: Movie,
    hall: Hall
}

export type SessionDetailEvent = Omit<SessionDetail, 'start'|'end'> & { start: Date, end: Date  };

export interface AddMovie {
    title: string,
    duration: number,
    description: string,
    poster: string;
}

export interface Movie extends AddMovie {
    _id: string,
}

export interface MovieDetail extends Movie {
    halls: Hall[]
    sessions: Session[]
}

export interface AddHall {
    name: string;
    capacity: number;
    description: string;
}

export interface Hall extends AddHall {
    _id: string;
}

export interface HallDetail extends Hall {
    movies: Movie[]
    sessions: Session[]
}

export interface DeleteResponse {
    _id: string;
    message: string;
}

export type NotificationProps = {
    id: number;
    message: string;
    type: 'success' | 'error';
  };