import React from 'react'
import styled from 'styled-components/native';

import { makeImgPath } from '../utils';


interface PosterProps {
  path: string;
}

const Poster:React.FC<PosterProps> = ({path}) => {
  return <Image source={{uri: makeImgPath(path)}}/>
}

const Image = styled.Image`
  width: 100px;
  height: 160px;
  margin-right: 10px;
  border-radius: 5px;
`;

export default Poster