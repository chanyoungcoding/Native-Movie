import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Detail = ({navigation: { setOptions }, route: { params: { originalTitle }}}) => {
  useEffect(() => {
    setOptions({
      title: originalTitle
    })
  }, [])

  return (
    <Container>
      <Text>Detail</Text>
    </Container>
  )
};

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`

export default Detail;