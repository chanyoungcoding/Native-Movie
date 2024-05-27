import React, { useEffect, useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, View } from 'react-native';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import { useQuery } from '@tanstack/react-query';

import { moviesApi } from '../api';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const renderVMedia = ({ item }) => (
  <VMedia
    posterPath={item.poster_path}
    originalTitle={item.original_title}
    voteAverage={item.vote_average}
  />
);
const renderHMedia = ({ item }) => (
  <HMedia
    posterPath={item.poster_path}
    originalTitle={item.original_title}
    overview={item.overview}
    releaseDate={item.release_date}
  />
);

const Movie:React.FC<NativeStackScreenProps<any, "Movies">> = () => {

  const MovieKey = (item: any) => item.id + ""

  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery({
    queryKey: ["nowPlaying"],
    queryFn: moviesApi.nowPlaying
  });

  const { isLoading: upcomingLoading, data: upcomingData } = useQuery({
    queryKey: ["upcoming"],
    queryFn: moviesApi.upcoming
  });

  const { isLoading: trendingLoading, data: trendingData } = useQuery({
    queryKey: ["trending"],
    queryFn: moviesApi.trending
  });

  const onRefresh = async () => {};
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading

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
            {nowPlayingData.results.map((movie) => (
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
              data={trendingData.results}
              horizontal
              keyExtractor={MovieKey}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              ItemSeparatorComponent={VSeparator}
              renderItem={renderVMedia}
            />

          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={MovieKey}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
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

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

export default Movie