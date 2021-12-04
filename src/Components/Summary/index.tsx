import React from 'react';
import styles from './styles.module.scss'
import {any} from "prop-types";

export const Summary = ({content}: any) => {
  const contentToDisplay: String = content[0]?.content;

  return (
    <div className={styles.container}>
      <h2>{contentToDisplay}</h2>
    </div>
  );
};