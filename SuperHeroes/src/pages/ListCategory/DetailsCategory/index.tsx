import { DeleteIcon, EditIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import HeroesAPI from "../../../services/api";
import {
  HStackMotion,
  InputMotion,
  TextMotion,
  VStackMotion,
} from "../../../theme/motion";

interface Inputs {
  Name: string;
}

const DetailsCategory: React.FC = () => {
  let { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const [category, setCategory] = useState<GetCategoryDTO>();
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

    const getCategory = async () => {
      try {
        const response = await HeroesAPI.getCategoryById(
          Number(id),
          controller
        );
        setCategory(response);
        setValue("Name", response.Name);
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const payload = {
      ...data,
      Id: Number(id),
    };

    try {
      const response = await HeroesAPI.putCategory(Number(id), payload);
      setCategory(response);

      toast({
        title: "Categoria alterada com sucesso.",
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
      await HeroesAPI.deleteCategory(Number(id));
      navigate(-1);

      toast({
        title: "Categoria deletada com sucesso.",
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
          p={10}
          justify="space-between"
          borderRadius="lg"
          boxShadow="dark-lg"
          bg="white"
        >
          <HStackMotion w="100%" justifyContent="space-between" align="center">
            <ChevronLeftIcon
              onClick={() => navigate(-1)}
              fontSize="2xl"
              cursor="pointer"
            />

            <TextMotion fontWeight={700} fontSize="2xl">
              {category?.Name}
            </TextMotion>

            <TextMotion fontSize="2xl"># {category?.Id}</TextMotion>
          </HStackMotion>

          <HStackMotion w="100%" justifyContent="space-between">
            <VStackMotion w="70%" align="flex-start" color="gray.600">
              <TextMotion fontSize="sm">Nome</TextMotion>
              <InputMotion
                fontSize="xs"
                placeholder="coloque o nome"
                errorBorderColor="red.600"
                _placeholder={{ fontSize: "xs" }}
                {...register("Name")}
              />
            </VStackMotion>
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

export default DetailsCategory;
