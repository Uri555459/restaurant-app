import React, { FC } from 'react';
import styles from './Error.module.scss';

interface ErrorProps {}

const Error: FC<ErrorProps> = () => (
  <div className={styles.Error}>
    Error Component
  </div>
);

export default Error;
