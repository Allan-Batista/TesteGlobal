import { Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../../components/Cards";
import HeroesAPI from "../../services/api";
import { HStackMotion } from "../../theme/motion";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Button from "../../components/Button";

// import { Container } from './styles';

const ListHero: React.FC = () => {
  const navigate = useNavigate();
  const [heroes, setHeroes] = useState<GetHeroesDTO[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const getHeroes = async () => {
      try {
        const response = await HeroesAPI.getHeroes(controller);
        setHeroes(response);
        setLoading(false);
      } catch (error: any) {
        if (!!error.CanceledError) {
          console.log(error);
        }
      }
    };

    getHeroes();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <HStackMotion
      h="100vh"
      justifyContent="center"
      bgGradient="radial(red.800, red.900)"
    >
      <ChevronLeftIcon
        onClick={() => navigate(-1)}
        fontSize="6xl"
        top={0}
        mb="37%"
        border="1px"
        borderColor="gray.200"
        borderRadius={10}
        color="white"
        cursor="pointer"

      />

      <HStackMotion
        w="86%"
        h={700}
        p={5}
        flexWrap="wrap"
        gap={5}
        align="center"
        justify="center"
        overflowY="auto"
        borderRadius="lg"
        bg="white"
      >

      <HStackMotion
        w="86%"
        h={100}
        align="center"
        justify="center"

      >
        <Button label="Cadastrar Herói" onClick={() => navigate("/registerHero")}/>

      </HStackMotion>

        {loading && (
          <HStackMotion w="100%" justify="center">
            <Spinner color="red.700" size="xl" />
          </HStackMotion>
        )}

        {!loading &&
          heroes?.map((item: GetHeroesDTO) => (
            <Cards
              onClick={() => navigate("/heroes/" + item.Id)}
              category={
                item?.Category?.name
                  ? "Categoria: " + item.Category.name
                  : "Categoria: Não informado"
              }
              name={item.Name}
              idCard={item.Id}
            />
          ))}
      </HStackMotion>
    </HStackMotion>
  );
};

export default ListHero;
