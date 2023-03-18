import { Select, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import imgSpider from "../../assets/spiderMen.png";
import Button from "../../components/Button";
import LayoutRegister from "../../components/LayoutRegister";
import HeroesAPI from "../../services/api";
import {
  HStackMotion,
  InputMotion,
  TextMotion,
  VStackMotion,
} from "../../theme/motion";

// import { Container } from './styles';

interface Inputs {
  CategoryId: number;
  Name: string;
  Active: boolean;
}

const RegisterHero: React.FC = () => {
  const toast = useToast();
  const [category, setCategory] = useState<GetCategoryDTO[]>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const payload = {
      ...data,
      CategoryId: Number(data.CategoryId),
    };

    try {
      const response = await HeroesAPI.postHeroes(payload);
      console.log(response);

      toast({
        title: "Herói criado com sucesso.",
        status: "success",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    } catch (error: any) {
      if (!!error.CanceledError) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const getCategory = async () => {
      try {
        const response = await HeroesAPI.getCategory(controller);
        setCategory(response);
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
    <LayoutRegister img={imgSpider}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStackMotion align="flex-start" color="gray.600">
          <TextMotion fontSize="sm">Nome</TextMotion>
          <InputMotion
            fontSize="xs"
            placeholder="coloque o nome"
            errorBorderColor="red.600"
            _placeholder={{ fontSize: "xs" }}
            {...register("Name")}
          />
        </VStackMotion>

        <VStackMotion mt={5} align="flex-start" color="gray.600">
          <TextMotion fontSize="sm">Ativo</TextMotion>
          <Select
            fontSize="xs"
            placeholder="Selecione se esta ativo"
            {...register("Active")}
          >
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </Select>
        </VStackMotion>

        <VStackMotion mt={5} align="flex-start" color="gray.600">
          <TextMotion fontSize="sm">Categoria</TextMotion>

          <Select
            fontSize="xs"
            placeholder="Selecione a categoria"
            {...register("CategoryId")}
          >
            {category?.map((item: GetCategoryDTO) => (
              <option value="01">{item.Name}</option>
            ))}
          </Select>
        </VStackMotion>

        <HStackMotion w="86%" h={100} align="center" justify="flex-start">
          <Button label="Cadastrar Herói" onClick={handleSubmit(onSubmit)} />
        </HStackMotion>
      </form>
    </LayoutRegister>
  );
};

export default RegisterHero;
