import { Image, VStack } from "@chakra-ui/react";
import React from "react";
import imgMarvel from "../../assets/marvel.png";
import imgBackground from "../../assets/register.png";
import { HStackMotion, VStackMotion } from "../../theme/motion";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useMotionValue, useTransform } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
  img: any;
}

const LayoutRegister: React.FC<LayoutProps> = ({ children, img }) => {
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <HStackMotion h="100vh" justifyContent="flex-start" bg="white">
      <ChevronLeftIcon
        onClick={() => navigate(-1)}
        fontSize="6xl"
        color="red.800"
        mb="45%"
        border="2px"
        borderColor="red.800"
        borderRadius={100}
        ml={5}
        cursor="pointer"
      />
      <VStack w="40%" h="100%" p={16} align="center">
        <Image src={imgMarvel} alt="marvel logo" w={160} mb={50} />
        {children}
      </VStack>

      <VStackMotion
        w="60%"
        h="100%"
        m="0 !important"
        justify="center"
        align="center"
        bgImage={imgBackground}
        bgRepeat="no-repeat"
        bgPosition="center"
        bgSize="cover"
      >
        <VStackMotion
          drag
          dragElastic={0.04}
          whileHover={{ cursor: "grabbing", scale: 0.9 }}
          style={{ x, y, rotateX, rotateY, z: 100 }}
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Image src={img} alt="marvel logo" w={600} mb={50} />
        </VStackMotion>
      </VStackMotion>
    </HStackMotion>
  );
};

export default LayoutRegister;
