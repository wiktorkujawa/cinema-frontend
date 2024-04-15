import React from 'react';
import styles from './HallsGrid.module.scss'; // Import the CSS module
import HallTile from '@/components/molecules/HallTile/HallTile';
import classNames from 'classnames';
import { AddHall, Hall } from '@/models';


type Props = {
  halls: Hall[];
  openAddHallModal: () => void; // Function to handle the add-new click event
  handleDelete: (id: string) => void; // Function to handle the delete click event
  handleModify: (hallData: AddHall, id?: string ) => void; // Function to handle the modify click event
};

const HallsGrid: React.FC<Props> = ({ halls, openAddHallModal, handleDelete, handleModify }) => {

  return (
    <div className={classNames(styles.hallsGrid, 'o-container o-container--2xl')}>
      {halls.map((hall) => (
        <HallTile
          onDelete={handleDelete}
          onModify={handleModify}
          key={hall._id}
          {...hall}
        />
      ))}
      <div className={styles.hallTile} onClick={openAddHallModal}>
        <span className={styles.addNew}>+</span>
      </div>
    </div>
  );
};

export default HallsGrid;
