import React, { useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions, FlatList } from 'react-native';
import { useQueryClient ,useQuery } from '@tanstack/react-query';
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';

import { MovieResponse, moviesApi } from '../api';
import HMedia from '../components/HMedia';
import Slide from '../components/Slide';
import Loader from '../components/Loader';
import HList from '../components/HList';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movie:React.FC<NativeStackScreenProps<any, "Movies">> = () => {

  const [refreshing, setRefreshing] = useState(false);

  const queryClient = useQueryClient();

  const MovieKey = (item: any) => item.id + ""

  const { isLoading: nowPlayingLoading, data: nowPlayingData} = useQuery<MovieResponse>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: moviesApi.MoviesnowPlaying
  });

  const { isLoading: upcomingLoading, data: upcomingData } = useQuery<MovieResponse>({
    queryKey: ["movies", "upcoming"],
    queryFn: moviesApi.Moviesupcoming
  });

  const { isLoading: trendingLoading, data: trendingData} = useQuery<MovieResponse>({
    queryKey: ["movies", "trending"],
    queryFn: moviesApi.Moviestrending
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries({queryKey: ["movies"]});
    setRefreshing(false);
  };

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading

    
  return loading ? ( <Loader/>
  ) : upcomingData ? (
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
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overView={movie.overview}
              />
            ))}
          </Swiper>

            {trendingData ? (
              <HList title="Trending Movies" data={trendingData.results} />
            ) : null}

          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={MovieKey}
      ItemSeparatorComponent={HSeparator}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path || ""}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  ) : null;
};

const ComingSoonTitle = styled.Text`
  margin: 20px 0px;
  margin-left: 30px;
  color: ${props => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
`

const HSeparator = styled.View`
  height: 20px;
`;

export default Movie