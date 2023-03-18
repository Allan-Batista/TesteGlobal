import { Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../../components/Cards";
import HeroesAPI from "../../services/api";
import { HStackMotion } from "../../theme/motion";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Button from "../../components/Button";

const ListCategory: React.FC = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<GetCategoryDTO[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const getCategory = async () => {
      try {
        const response = await HeroesAPI.getCategory(controller);
        setCategory(response);
        setLoading(false);
      } catch (error: any) {
        if (!!error.CanceledError) {
          console.log(error);
        }
      }
    };

    getCategory();

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
        color="white"
        borderRadius={10}
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
        <HStackMotion w="86%" h={100} align="center" justify="center">
          <Button label="Cadastrar Categoria"  onClick={() => navigate("/registerCategory")}/>
        </HStackMotion>

        {loading && (
          <HStackMotion w="100%" justify="center">
            <Spinner color="red.700" size="xl" />
          </HStackMotion>
        )}

        {!loading &&
          category?.map((item: GetCategoryDTO) => (
            <Cards
              onClick={() => navigate("/category/" + item.Id)}
              heroes={
                item?.Heroes
                  ? "Heróis: " + item.Heroes.length
                  : "Heróis: Não informado"
              }
              name={item.Name}
              idCard={item.Id}
            />
          ))}
      </HStackMotion>
    </HStackMotion>
  );
};

export default ListCategory;
