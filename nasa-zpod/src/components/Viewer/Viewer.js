import React from 'react';
import classNames from 'classnames/bind';
import { ChasingDots } from 'better-react-spinkit';
import styles from './Viewer.module.scss';

const cx = classNames.bind(styles);

const Viewer = ({ mediaType, url, loading }) => {
  if (loading) {
    // 로딩중일때 로더 보여주기
    return (
      <div className={cx('viewer')}>
        <ChasingDots color="white" size={60} />
      </div>
    );
  }

  if (!url) return null;

  return (
    <div className={cx('viewer')}>
      {mediaType === 'image' ? (
        <img onClick={() => window.open(url)} src={url} alt="space" />
      ) : (
        <iframe
          title="space-video"
          src={url}
          frameBorder="0"
          gesture="media"
          allow="encrypted-media"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default Viewer;
