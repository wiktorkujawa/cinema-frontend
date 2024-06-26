import React, { useEffect, useState } from 'react';
import styles from './Notification.module.scss';
import { NotificationProps } from '@/models';


const Notification: React.FC<NotificationProps> = ({ message, type, id }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, type, id]);

  return (
    <div className={`${styles.notification} ${styles[type]} ${visible ? styles.show : ''}`}>
      {message}
      <div className={styles.progressBar} style={{ width: visible ? '100%' : '0%' }}></div>
    </div>
  );
};

export default Notification;