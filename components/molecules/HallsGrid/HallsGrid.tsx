import React from 'react';
import styles from './HallsGrid.module.scss';
import HallTile from '@/components/molecules/HallTile/HallTile';
import classNames from 'classnames';
import { AddHall, Hall } from '@/models';


type Props = {
  halls: Hall[];
  openAddHallModal: () => void;
  handleDelete: (id: string) => void;
  handleModify: (hallData: AddHall, id?: string ) => void;
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
