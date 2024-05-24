import React, { useEffect, useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { makeImgPath } from '../utils';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjQyM2Y0MWNmNTY4YTY1NDJhMjAzYzA0M2JlMzI0MyIsInN1YiI6IjY0M2ZlOWJiN2U0MDNkMDJmYzI1OTk2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jry2V7IwAMEedIiBYhEXioFY3OokzRHqyKcDzdCdWdE'
  }
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movie:React.FC<NativeStackScreenProps<any, "Movies">> = () => {

  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);

  const getNowPlaying = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing', options)
    const data = await response.json();
    setNowPlaying(data.results);
    setLoading(false);
  }

  useEffect(() => {
    getNowPlaying();
  })

  return loading ? (
    <Loader>
      <ActivityIndicator/>
    </Loader>
  ) : (
    <Container >
      <Swiper 
        loop 
        timeout={2}
        controlsEnabled={false}
        containerStyle={{width: "100%", height: SCREEN_HEIGHT / 3}}
      >
        {nowPlaying.map(movie => (
          <View key={movie.id}>
            <BgImg source={{ uri: makeImgPath(movie.backdrop_path)}} style={StyleSheet.absoluteFill} blurRadius={2} />
            <Box style={StyleSheet.absoluteFill}>
              <Poster source={{uri: makeImgPath(movie.poster_path)}}/>
              <BoxText>
                <Title>{movie.original_title}</Title>
                <Overview>{movie.overview.slice(0,80)} ...</Overview>
                {movie.vote_average > 0 ? (<Votes>❤️ {Math.trunc(movie.vote_average)} / 10</Votes>) : null}
              </BoxText>
            </Box>
          </View>
        ))}

      </Swiper>
    </Container>
  )
}


const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.mainBgColor};
`

const View = styled.View`
  flex: 1;
`

const Loader = styled.View``

const BgImg = styled.Image``; 

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  margin-right: 10px;
  border-radius: 5px;
`;

const Box = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.3);
`

const BoxText = styled.View`
  width: 50%;
`

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`

const Overview = styled.Text`
  margin-top: 5px;
  color: rgba(255,255,255,0.6);
`

const Votes = styled(Overview)`
  font-size: 12px;
`

export default Movie