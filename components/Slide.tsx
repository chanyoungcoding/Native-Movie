import React from 'react'
import styled from 'styled-components/native';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { makeImgPath } from '../utils';
import Poster from './Poster';
import { Movie } from '../api';

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overView: string;
  fullData: Movie;
}

const Slide:React.FC<SlideProps> = ({backdropPath, posterPath, originalTitle, voteAverage, overView, fullData}) => {

  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack", { screen: "Detail", params: { ...fullData } });
  };

  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{flex: 1}}>
        <BgImg source={{ uri: makeImgPath(backdropPath)}} style={StyleSheet.absoluteFill} blurRadius={2} />
        <Box style={StyleSheet.absoluteFill}>
          <Poster path={posterPath}/>
          <BoxText>
            <Title>{originalTitle}</Title>
            <Overview>{overView && overView.slice(0,80)} ...</Overview>
            {voteAverage > 0 ? (<Votes>❤️ {Math.trunc(voteAverage)} / 10</Votes>) : null}
          </BoxText>
        </Box>
      </View>
    </TouchableWithoutFeedback>
  )
}

const BgImg = styled.Image``; 

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
  color: ${props => props.theme.textColor}; 
`

const Overview = styled.Text`
  margin-top: 5px;
  color: ${props => props.theme.textColor}; 
`

const Votes = styled(Overview)`
  font-size: 12px;
`

export default Slide