import {
  Input as InputChakara,
  InputProps as InputChakaraProps,
} from '@chakra-ui/react';
import React from 'react';
import { TextMotion, VStackMotion } from '../../theme/motion';

type InputProps = InputChakaraProps;

const Input: React.FC<InputProps> = (rest: InputProps) => {
  return (
    <VStackMotion align="flex-start" color="gray.600">
      <TextMotion fontSize="sm">teste</TextMotion>

      <InputChakara
        {...rest}
        // isInvalid={!!msgError}
        margin="0 !important"
        fontSize="xs"
        placeholder="Enter password"
        errorBorderColor="red.600"
        _placeholder={{ fontSize: 'xs' }}
      />

      <TextMotion color="red.600" fontSize={14}>
        {/* {msgError} */}
      </TextMotion>
    </VStackMotion>
  );
};

export default Input;
