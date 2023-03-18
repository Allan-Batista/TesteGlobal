import { BoxProps } from '@chakra-ui/react';
import React from 'react';
import imgCards from '../../assets/Cards.png';
import {
  BoxMotion,
  HStackMotion,
  TextMotion,
  VStackMotion,
} from '../../theme/motion';

// import { Container } from './styles';

interface CardsProps extends BoxProps {
  idCard: number;
  name: string;
  category?: string;
  heroes?: any;
}

const Cards: React.FC<CardsProps> = ({
  idCard,
  name,
  category,
  heroes,
  onClick,
}) => {
  return (
    <BoxMotion
      whileTap={{ scale: 0.9 }}
      w={230}
      h={350}
      p={5}
      cursor="pointer"
      ml="0 !important"
      borderRadius="lg"
      boxShadow="dark-lg"
      bgImage={imgCards}
      bgRepeat="no-repeat"
      bgPosition="center"
      bgSize="cover"
      onClick={onClick}
    >
      <HStackMotion>
        <TextMotion color="white" fontSize="md">
          {idCard}
        </TextMotion>
      </HStackMotion>

      <VStackMotion h="75%" justify="center" spacing={10}>
        <TextMotion
          fontWeight={700}
          color="white"
          fontSize={['sm', 'md', 'lg']}
        >
          {name}
        </TextMotion>

        <TextMotion color="white" fontSize="14">
          {category || heroes}
        </TextMotion>
      </VStackMotion>
    </BoxMotion>
  );
};

export default Cards;
