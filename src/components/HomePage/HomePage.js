import React from 'react';
import { connect } from 'react-redux';
import TrendingMovies from '../TrendingMovies/TrendingMovies';
import PopularMovies from '../PopularMovies/PopularMovies';
import TopRatedMovies from '../TopRatedMovies/TopRatedMovies';
import DramaMovies from '../DramaMovies/DramaMovies';
import MysteryMovies from '../MysteryMovies/MysteryMovies';
import TrendingTv from '../TrendingTv/TrendingTv';
import PopularTv from '../PopularTv/PopularTv';
import TopRatedTv from '../TopRatedTv/TopRatedTv';
import NetflixTv from '../NetflixTv/NetflixTv';
import AmazonTv from '../AmazonTv/AmazonTv';

import {
  TRENDING_MOVIES_TAB,
  POPULAR_MOVIES_TAB,
  TOP_RATED_MOVIES_TAB,
  DRAMA_MOVIES_TAB,
  MYSTERY_MOVIES_TAB,
  TRENDING_TV_TAB,
  POPULAR_TV_TAB,
  TOP_RATED_TV_TAB,
  NETFLIX_TV_TAB,
  AMAZON_TV_TAB
} from '../../actions/types';

const HomePage = ({ currentTab }) => {
  if (currentTab === TRENDING_MOVIES_TAB) return <TrendingMovies />;
  else if (currentTab === POPULAR_MOVIES_TAB) return <PopularMovies />;
  else if (currentTab === TOP_RATED_MOVIES_TAB) return <TopRatedMovies />;
  else if (currentTab === DRAMA_MOVIES_TAB) return <DramaMovies />;
  else if (currentTab === MYSTERY_MOVIES_TAB) return <MysteryMovies />;
  else if (currentTab === TRENDING_TV_TAB) return <TrendingTv />;
  else if (currentTab === POPULAR_TV_TAB) return <PopularTv />;
  else if (currentTab === TOP_RATED_TV_TAB) return <TopRatedTv />
  else if (currentTab === NETFLIX_TV_TAB) return <NetflixTv />
  else if (currentTab === AMAZON_TV_TAB) return <AmazonTv />
};

const mapStateToDispatch = ({ homePage }) => ({
  currentTab: homePage.currentTab,
});

export default connect(mapStateToDispatch)(HomePage);
