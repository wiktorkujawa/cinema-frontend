'use client';
import { CalendarProps, Calendar as ReactCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US'

const locales = {
  'en-US': enUS,
}
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { useEffect, useRef, useState } from 'react';

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { DeleteResponse, Hall, Movie, NotificationProps, Session, SessionDetailEvent } from '@/models';
import ModalForm from '@/components/molecules/ModalForm/ModalForm';
import CustomEvent from '@/components/molecules/CustomEvent/CustomEvent';
import useOutsideAlerter from '@/hooks/UseOutsideAlerter';
import Notification from '@/components/atoms/Notification/Notification';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const DnDCalendar = withDragAndDrop(ReactCalendar);

type Props = {
  halls: Hall[],
  movies: Movie[]
}

interface WSResponse {
  action_type: 'get_sessions' | 'add_session' | 'update_session' | 'delete_session',
  status: 'success' | 'error',
  data: unknown
}

const Calendar = ({ halls, movies }: Props) => {
  const wsRef = useRef<WebSocket | null>(null);

  const wrapperRef = useRef(null);


  const [notificationQueue, setNotificationQueue] = useState<NotificationProps[]>([]);
  const [visibleNotifications, setVisibleNotifications] = useState<NotificationProps[]>([]);

  useOutsideAlerter(wrapperRef, () => setSelectedEventId(null));

  const [events, setEvents] = useState<SessionDetailEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialFormData, setInitialFormData] = useState<Omit<Session, "_id">>({
    title: '',
    start: '',
    end: '',
    hall_id: '',
    movie_id: ''
  });

  const triggerNotification = (message: string, type: 'success' | 'error') => {
    const newNotification: NotificationProps = {
      id: Date.now(),
      message,
      type,
    };

    setNotificationQueue(prevQueue => [...prevQueue, newNotification]);
  };


  useEffect(() => {
    if (visibleNotifications.length < 3 && notificationQueue.length > 0) {
      const nextNotification = notificationQueue[0];
      setVisibleNotifications(prevVisible => [...prevVisible, nextNotification]);
      setNotificationQueue(prevQueue => prevQueue.slice(1));
    }
  }, [notificationQueue, visibleNotifications]);

  useEffect(() => {
    const timers = visibleNotifications.map(notification =>
      setTimeout(() => {
        setVisibleNotifications(prevVisible =>
          prevVisible.filter(visibleNotification => visibleNotification.id !== notification.id)
        );
      }, 3000)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [visibleNotifications]);

  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL || '');
      wsRef.current.onopen = () => {
        console.log('WebSocket Connected');
        wsRef.current?.send(JSON.stringify({ action: 'get_sessions' }));

      };
      wsRef.current.onerror = function (error) {

        console.error('WebSocket error:', error);
        triggerNotification('WebSocket connection error', 'error');
      };
      wsRef.current.onmessage = (event) => {
        const { action_type, status, data }: WSResponse = JSON.parse(event.data);

        if (status == 'success') {

          if (action_type == 'get_sessions') {
            setEvents((data as SessionDetailEvent[]).map((event) => {
              return {
                title: event.title || 'N/A',
                hall: event.hall,
                hall_id: event.hall_id,
                movie: event.movie,
                movie_id: event.movie_id,
                start: new Date(event.start),
                end: new Date(event.end),
                _id: event._id
              }
            }));
            triggerNotification('Sessions loaded successfully', 'success');
          }

          if (action_type == 'add_session') {
            setEvents(prev => ([
              ...prev,
              data as SessionDetailEvent

            ]));
            triggerNotification('Session added successfully', 'success');
          }

          if (action_type == 'update_session') {
            const update_event = data as SessionDetailEvent
            setEvents(prev => prev.map(item => {
              if (item._id == update_event?._id) {
                if(update_event.title != item.title){
                  triggerNotification(`Session ${item.title} renamed to ${update_event.title}`, 'success');
                }
                else if(new Date(update_event.start).getTime()!=item.start.getTime() && new Date(update_event.end).getTime()!=item.end.getTime()){
                  triggerNotification(`Session ${item.title} moved from ${format(item.start, 'y MMM dd HH:mm')} to ${format(update_event.start, 'y MMM dd HH:mm')}`, 'success');
                }
                else if(new Date(update_event.start).getTime()!=item.start.getTime()){
                  triggerNotification(`Session ${item.title} start data changed from ${format(item.start, 'y MMM dd HH:mm')} to ${format(update_event.start, 'y MMM dd HH:mm')}`, 'success');
                }
                else if(new Date(update_event.end).getTime()!=item.end.getTime()){
                  triggerNotification(`Session ${item.title} end data changed from ${format(item.end, 'y MMM dd HH:mm')} to ${format(update_event.end, 'y MMM dd HH:mm')}`, 'success');
                }
                return {
                  ...update_event,
                  title: update_event.title || 'N/A',
                  start: new Date(update_event.start),
                  end: new Date(update_event.end)
                }
              }
              return item
            }));
          }

          if (action_type == 'delete_session') {
            const delete_event = data as DeleteResponse;
            setEvents(prev => prev.filter(item => item._id !== delete_event._id));
            triggerNotification('Session deleted successfully', 'success');
          }

        }
        else {
          console.log('error');
          triggerNotification('An error occurred', 'error');
        }

      };
      return () => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.close();
        }
      }
    }
  },
    []
  );

  const onEventOrResizeDrop = (data: any) => {
    const { start, end, event } = data;

    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({
        action: "update_session",
        id: event._id,
        data: {
          title: event.title,
          movie_id: event.movie_id,
          hall_id: event.hall_id,
          start: new Date(start),
          end: new Date(end)
        }
      }));
    }
  };

  const onSelectSlot = (slotInfo: any) => {
    setSelectedEventId(null);
    setInitialFormData({
      start: slotInfo.start,
      end: slotInfo.end,
      title: '',
      hall_id: halls[0]?._id,
      movie_id: movies[0]?._id
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData: any) => {

    if (wsRef.current) {
      if (formData._id) {
        const { _id, movie, hall, ...data } = formData;

        wsRef.current.send(JSON.stringify({
          action: "update_session",
          id: _id,
          data: {
            ...data,
            start: new Date(data.start),
            end: new Date(data.end)
          }
        }));
      }
      else {
        wsRef.current.send(JSON.stringify({
          action: "add_session",
          data: {
            ...formData,
            start: new Date(formData.start),
            end: new Date(formData.end)
          }
        }));
      }
    }
    setIsModalOpen(false);
  };

  const deleteSession = (sessionId: string) => {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({
        action: "delete_session",
        id: sessionId,
      }));
    }
  };

  const openUpdateModal = (event: any) => {
    setIsModalOpen(true);
    setInitialFormData({ ...event });
  };

  return (
    <div className='o-container o-container--lg' ref={wrapperRef}>
      <div id="notification-container">
        {visibleNotifications.map(notification => (
          <Notification
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
          />
        ))}
      </div>
      <DnDCalendar
        localizer={localizer}
        events={events}
        style={{ height: 500 }}
        onEventResize={onEventOrResizeDrop}
        onEventDrop={onEventOrResizeDrop}
        selectable={true}
        onSelectSlot={onSelectSlot}
        defaultDate={new Date()}
        components={{
          event: (props) => <CustomEvent
            {...props}
            selectedEventId={selectedEventId}
            setSelectedEventId={setSelectedEventId}
            deleteSession={deleteSession}
            openUpdateModal={openUpdateModal}
          />,
        }}
      // selectMirror={true}
      />

      {isModalOpen && <ModalForm
        onClose={() => setIsModalOpen(false)}
        initialFormData={initialFormData}
        halls={halls}
        movies={movies}
        onSubmit={handleFormSubmit}
      />
      }
    </div>
  );
};

export default Calendar;