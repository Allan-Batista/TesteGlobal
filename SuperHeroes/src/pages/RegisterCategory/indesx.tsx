import { Select, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import imgHulk from "../../assets/hulk.png";
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
  Name: string;
}
const RegisterCategory: React.FC = () => {
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
      Name: String(data.Name),
    };

    try {
      const response = await HeroesAPI.postCategory(payload);
      console.log(response);

      toast({
        title: "Categoria criada com sucesso.",
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
    <LayoutRegister img={imgHulk}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStackMotion align="flex-start" color="gray.600">
          <TextMotion fontSize="sm">Nome da Categorioa</TextMotion>
          <InputMotion
            fontSize="xs"
            placeholder="coloque o nome da categoria"
            errorBorderColor="red.600"
            _placeholder={{ fontSize: "xs" }}
            {...register("Name")}
          />
        </VStackMotion>

        <HStackMotion w="86%" h={100} align="center" justify="flex-start">
          <Button label="Cadastrar Categoria" onClick={handleSubmit(onSubmit)} />
        </HStackMotion>
      </form>
    </LayoutRegister>
  );
};

export default RegisterCategory;
