import React from 'react';
import style from './style.module.css';

const ProductionCompanies = ({ companies }) => {
  return (
    <div className={style.wrapper}>
      {companies.map(company => {
        if (company.logo_path)
          return (
            <div className={style.imageWrapper}>
              <img
                className={style.image}
                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                alt={company.name}
              />
              {/* <p>{company.name}</p> */}
            </div>
          );
        else return null;
      })}
    </div>
  );
};

export default ProductionCompanies;
