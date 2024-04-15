import { Button } from '@/components/atoms/Button/Button';
import React from 'react';
import styles from './CustomEvent.module.scss'; // Import the SCSS module
import moment from 'moment';

const CustomEvent = ({ event, deleteSession, openUpdateModal, selectedEventId, setSelectedEventId }: any) => {

  const handleDelete = (e: any) => {
    e.stopPropagation(); // Prevent the event from bubbling up and triggering other onClick handlers
    deleteSession(event._id);
  };

  const handleUpdate = (e: any) => {
    e.stopPropagation();
    openUpdateModal(event);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelectedEventId(event._id);
    // Find all .rbc-month-row elements and reset their z-index
    document.querySelectorAll('.rbc-month-row').forEach(row => {
      // Asserting that row is an HTMLElement to access style property
      (row as HTMLElement).style.zIndex = '0';
    });

    // Using currentTarget (the element you attached the event to) and ensuring it's an HTMLElement
    const monthRow = (e.currentTarget as HTMLElement).closest('.rbc-month-row');
    if (monthRow) {
      (monthRow as HTMLElement).style.zIndex = '1';
    }
  }

  // Determine if this event's tooltip should be shown
  const showTooltip = selectedEventId === event._id;

  return (
    <div onClick={handleClick}>
      {event.title}
      {showTooltip && (
        <div className={styles.tooltip}>
          <p className={styles.title}>{event.title}</p>
          <p>{`Start: ${moment(event.start).format('YYYY-MM-DD HH:mm')}`}</p>
          <p>{`End: ${moment(event.end).format('YYYY-MM-DD HH:mm')}`}</p>
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      )}
    </div>
  );
};
export default CustomEvent;