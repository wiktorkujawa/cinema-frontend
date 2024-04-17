import { Button } from '@/components/atoms/Button/Button';
import React from 'react';
import styles from './CustomEvent.module.scss';
import { format } from 'date-fns';

const CustomEvent = ({ event, deleteSession, openUpdateModal, selectedEventId, setSelectedEventId, ...props }: any) => {
 

  const handleDelete = (e: any) => {
    e.stopPropagation();
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
      (row as HTMLElement).style.zIndex = '0';
    });

    const monthRow = (e.currentTarget as HTMLElement).closest('.rbc-month-row')
    
    if (monthRow) {
      (monthRow as HTMLElement).style.zIndex = '1';
    }
    if(props.continuesPrior) {
      if(monthRow?.previousSibling){
        (monthRow?.previousSibling as HTMLElement).style.zIndex = '2';
      }
    }
  }

  const showTooltip = selectedEventId === event._id && !props.continuesPrior;

  if(selectedEventId === event._id) {
    console.log(props);
  }

  return (
    <div onClick={handleClick}>
      {event.title}
      {showTooltip && (
        <div className={styles.tooltip}>
          <p className={styles.title}>{event.title}</p>
          <p>{`Start: ${format(event.start,'yyyy-MM-dd HH:mm')}`}</p>
          <p>{`End: ${format(event.end,'yyyy-MM-dd HH:mm')}`}</p>
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      )}
    </div>
  );
};
export default CustomEvent;