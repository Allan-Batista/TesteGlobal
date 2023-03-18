import { Slide } from "@chakra-ui/react";
import { useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import imgCategory from "../../assets/CategoryImg.png";
import imgHeroes from "../../assets/heroes.png";
import Button from "../../components/Button";
import {
  BoxMotion,
  HStackMotion,
  VStackMotion,
  itemSlide,
} from "../../theme/motion";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <HStackMotion
      h="100vh"
      justifyContent="center"
      bgGradient="radial(red.800, red.900)"
    >
      <BoxMotion
        w={320}
        h={460}
        mr={24}
        p={3}
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        whileHover={{ scale: 1.1 }}
        as={motion.div}
      >
        <VStackMotion
          w="100%"
          h="100%"
          p={5}
          justify="end"
          bgImage={imgHeroes}
          bgRepeat="no-repeat"
          bgPosition="center"
          bgSize="contain"
          drag
          dragElastic={0.04}
          whileTap={{ cursor: "grabbing", scale: 0.9 }}
          style={{ x, y, rotateX, rotateY, z: 100 }}
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Button onClick={() => navigate("/heroes")} label="Heróis" />
        </VStackMotion>
      </BoxMotion>

      <BoxMotion
        w={320}
        h={460}
        p={3}
        borderRadius="lg"
        overflow="hidden"
        bg="white"
      >
        <VStackMotion
          w="100%"
          h="100%"
          p={5}
          bgImage={imgCategory}
          justify="end"
          // bg="green"
          bgRepeat="no-repeat"
          bgPosition="center"
          bgSize="contain"
        >
          <Button onClick={() => navigate("/category")} label="Categorias" />
        </VStackMotion>
      </BoxMotion>
    </HStackMotion>
  );
};

export default Home;
