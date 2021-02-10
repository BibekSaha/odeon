import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import style from './PersonDetails.module.css';

import dateFormatter from '../../utils/date';

const PersonDetails = () => {
  const { id } = useParams();
  const [showLoader, setShowLoader] = useState(true);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.odeon.tk/person/${id}?language=en-US&append_to_response=images`
    )
      .then(resp => resp.json())
      .then(resp => {
        setPerson(resp);
      })
      .catch(err => console.log(err));
  }, [id]);

  if (!person && showLoader)
    return (
      <Loader
        className={style.loading}
        type="TailSpin"
        color="var(--white)"
        height={80}
        width={80}
      />
    );

  return (
    <div className={style.person}>
      <div className={style.imageWrapper}>
        <img
          className={style.posterImage}
          alt={person.name}
          src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
          onLoad={() => setShowLoader(false)}
        />
        <div className={style.gradient}></div>
      </div>

      <h1 className={style.name}>{person.name}</h1>
      <div className={style.peekInformation}>
        <p>
          Birth Place: <strong>{person.place_of_birth}</strong>
        </p>
        <p>
          Known for: <strong>{person.known_for_department}</strong>
        </p>
        <p>
          Birthday: <strong>{dateFormatter(person.birthday)}</strong>
        </p>
        {person.deathday && (
          <p>
            Death: <strong>{dateFormatter(person.deathday)}</strong>
          </p>
        )}
      </div>

      <p className={style.biography}>{person.biography}</p>

      <div className={style.images}>
        {person.images.profiles.map(({ file_path }) => (
          <Link to={`/image-viewer${file_path}`} key={file_path}>
            <img
              className={style.image}
              src={`https://image.tmdb.org/t/p/w200${file_path}`}
              alt={person.name}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PersonDetails;
