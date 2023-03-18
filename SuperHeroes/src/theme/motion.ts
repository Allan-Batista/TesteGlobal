import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  HStack,
  Input,
  InputProps,
  Link,
  LinkProps,
  StackProps,
  Text,
  TextProps,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const animationMotion = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

export const itemScale = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 60,
    },
  },
};

export const itemSlide = {
  hidden: { x: 300, opacity: 0 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
    },
  },
};

export const FlexMotion = motion<FlexProps>(Flex);
export const BoxMotion = motion<BoxProps>(Box);
export const ButtonMotion = motion<ButtonProps>(Button);
export const VStackMotion = motion<StackProps>(VStack);
export const HStackMotion = motion<StackProps>(HStack);
export const HeadingMotion = motion<HeadingProps>(Heading);
export const TextMotion = motion<TextProps>(Text);
export const LinkMotion = motion<LinkProps>(Link);
export const InputMotion = motion<InputProps>(Input);
