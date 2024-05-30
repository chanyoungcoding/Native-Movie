import React from 'react'
import styled from 'styled-components/native';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { makeImgPath } from '../utils';
import Poster from './Poster';

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overView: string;
}

const Slide:React.FC<SlideProps> = ({backdropPath, posterPath, originalTitle, voteAverage, overView}) => {

  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail" });
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
  color: white;
`

const Overview = styled.Text`
  margin-top: 5px;
  color: rgba(255,255,255,0.6);
`

const Votes = styled(Overview)`
  font-size: 12px;
`

export default Slide