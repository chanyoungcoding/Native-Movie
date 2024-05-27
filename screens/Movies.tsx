import React, { useEffect, useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, View } from 'react-native';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';

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
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper 
            loop 
            timeout={3}
            controlsEnabled={false}
            containerStyle={{width: "100%", height: SCREEN_HEIGHT / 3, marginBottom: 30}}
          >
            {nowPlaying.map((movie) => (
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
              data={trending}
              horizontal
              keyExtractor={(item) => item.id + ""}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
              renderItem={({ item }) => (
                <VMedia
                  posterPath={item.poster_path}
                  originalTitle={item.original_title}
                  voteAverage={item.vote_average}
                />
              )}
            />

          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcoming}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  );
};

const Loader = styled.View``

const ListTitle = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ComingSoonTitle = styled.Text`
  margin: 20px 0px;
  margin-left: 30px;
  color: ${props => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
`

export default Movie