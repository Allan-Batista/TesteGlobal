import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Checkbox, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";

import HeroesAPI from "../../../services/api";
import {
  HStackMotion,
  InputMotion,
  TextMotion,
  VStackMotion,
} from "../../../theme/motion";

// import { Container } from './styles';

interface Inputs {
  CategoryId: number;
  Name: string;
  Active: boolean;
}

const DetailsHero: React.FC = () => {
  let { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const [hero, setHero] = useState<GetHeroesDTO>();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    const getHero = async () => {
      try {
        const response = await HeroesAPI.getHeroesById(Number(id), controller);
        setHero(response);
        setValue("CategoryId", response.CategoryId);
        setValue("Name", response.Name);
        setLoading(false);
      } catch (error: any) {
        if (!!error.CanceledError) {
          console.log(error);
        }
      }
    };

    getHero();

    return () => {
      controller.abort();
    };
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const payload = {
      ...data,
      Id: Number(id),
      CategoryId: Number(data.CategoryId),
    };

    try {
      const response = await HeroesAPI.putHeroes(Number(id), payload);
      setHero(response);

      toast({
        title: "Herói alterado com sucesso.",
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

  const handleDelete = async () => {
    try {
      await HeroesAPI.deleteHeroes(Number(id));
      navigate(-1);

      toast({
        title: "Herói deletado com sucesso.",
        status: "success",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HStackMotion
      h="100vh"
      justifyContent="center"
      bgGradient="radial(red.800, red.900)"
    >
      {loading && <Spinner color="white" size="xl" />}

      {!loading && (
        <VStackMotion
          w="50%"
          h="50%"
          py={14}
          px={10}
          justify="space-between"
          borderRadius="lg"
          boxShadow="dark-lg"
          bg="white"
        >
          <ChevronLeftIcon
            onClick={() => navigate(-1)}
            fontSize="2xl"
            cursor="pointer"
            mr="45%"
            bottom="68%"
            position="absolute"
          />
          <HStackMotion w="100%" justifyContent="space-between">
            <TextMotion fontWeight={700} fontSize="2xl">
              {hero?.Name}
            </TextMotion>

            <TextMotion fontSize="2xl"># {hero?.Id}</TextMotion>
          </HStackMotion>

          <HStackMotion w="100%" align="end" justifyContent="space-between">
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

            <VStackMotion align="flex-start" color="gray.600">
              <TextMotion fontSize="sm">Categoria id</TextMotion>
              <InputMotion
                type="number"
                fontSize="xs"
                placeholder="Enter password"
                errorBorderColor="red.600"
                _placeholder={{ fontSize: "xs" }}
                {...register("CategoryId")}
              />
            </VStackMotion>

            <Checkbox
              size="md"
              defaultChecked={hero?.Active}
              {...register("Active")}
            >
              Ativo
            </Checkbox>
          </HStackMotion>

          <HStackMotion w="100%" justifyContent="flex-end" spacing={5}>
            <EditIcon
              onClick={handleSubmit(onSubmit)}
              fontSize="xl"
              cursor="pointer"
            />
            <DeleteIcon onClick={handleDelete} fontSize="xl" cursor="pointer" />
          </HStackMotion>
        </VStackMotion>
      )}
    </HStackMotion>
  );
};

export default DetailsHero;
