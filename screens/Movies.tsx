import React, { useEffect, useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import { ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import Slide from '../components/Slide';
import Poster from '../components/Poster';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjQyM2Y0MWNmNTY4YTY1NDJhMjAzYzA0M2JlMzI0MyIsInN1YiI6IjY0M2ZlOWJiN2U0MDNkMDJmYzI1OTk2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jry2V7IwAMEedIiBYhEXioFY3OokzRHqyKcDzdCdWdE'
  }
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movie:React.FC<NativeStackScreenProps<any, "Movies">> = () => {

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const response = await fetch('https://api.themoviedb.org/3/trending/movie/week', options)
    const data = await response.json();
    setTrending(data.results)
  }

  const getUpcoming = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/upcoming', options)
    const data = await response.json();
    setUpcoming(data.results)
  }

  const getNowPlaying = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing', options)
    const data = await response.json();
    setNowPlaying(data.results);
  }

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()])
    setLoading(false);
  }

  useEffect(() => {
    getData()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  }

  return loading ? (
    <Loader>
      <ActivityIndicator/>
    </Loader>
  ) : (
    <Container refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>} >
      <Swiper 
        loop 
        timeout={3}
        controlsEnabled={false}
        containerStyle={{width: "100%", height: SCREEN_HEIGHT / 3, marginBottom: 30}}
      >
        {nowPlaying.map(movie => (
          <Slide
            key={movie.id} 
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overView={movie.overview}
          />
        ))}

      </Swiper>

      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll
        horizontal
        contentContainerStyle={{paddingLeft: 30}}
        showsHorizontalScrollIndicator={false}
      >
        {trending.map(movie => (
          <Movies key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title>
              {movie.original_title.slice(0, 13)}
              {movie.original_title.length > 13 ? "..." : null}
            </Title>
            <Votes>❤️ {Math.trunc(movie.vote_average)} / 10</Votes>
          </Movies>
        ))}
      </TrendingScroll>
      <ComingSoonTitle>Coming Soon</ComingSoonTitle>
      {upcoming.map(movie => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>{movie.original_title}</Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </Release>
            <Overview>
              {movie.overview !== "" && movie.overview.length > 80 ? `${movie.overview.slice(0, 140)}...` : movie.overview}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  )
}


const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.mainBgColor};
`

const Loader = styled.View``

const ListTitle = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movies = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  color: ${props => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Votes = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 10px;
`;

const ComingSoonTitle = styled.Text`
  margin: 20px 0px;
  margin-left: 30px;
  color: ${props => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
`

const HMovie = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
`

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`

const Overview = styled.Text`
  color: ${props => props.theme.textColor};
  opacity: 0.8;
  width: 80%;
`

const Release = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 12px;
  margin: 10px 0px;
`


export default Movie