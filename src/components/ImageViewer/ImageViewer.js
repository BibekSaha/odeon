import React from 'react';
import { useParams } from 'react-router-dom';
// import Loader from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import style from './ImageViewer.module.css';

const ImageViewer = () => {
  // let [showLoader, setShowLoader] = useState(true);
  const { imageId } = useParams();

  // if (showLoader)
  //   return (
  //     <Loader
  //       className={style.imageWrapper}
  //       type="TailSpin"
  //       color="var(--white)"
  //       height={80}
  //       width={80}
  //     />
  //   );

  return (
    <div className={style.imageWrapper}>
      <img
        alt="Movies App by Bibek Saha"
        src={`https://image.tmdb.org/t/p/w780/${imageId}`}
        className={style.image}
        // onLoad={() => setShowLoader(false)}
      />
    </div>
  );
};

export default ImageViewer;
