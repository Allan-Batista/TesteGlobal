import { ButtonProps } from "@chakra-ui/react";
import { ButtonMotion } from "../../theme/motion";

// import { Container } from './styles';

interface ButtonTypes extends ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: ButtonTypes) => {
  return (
    <ButtonMotion
      px={16}
      py={6}
      fontSize={16}
      color="white"
      bgGradient="linear(to-r, red.600 60%, red.700)"
      _hover={{}}
      _active={{}}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
    >
      {label}
    </ButtonMotion>
  );
};

export default Button;
