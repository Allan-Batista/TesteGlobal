// Heroes

import Api from './axios';

const getHeroes = async (controller: any): Promise<GetHeroesDTO[]> => {
  const res = await Api.get('/api/Heroes/', {
    signal: controller.signal,
  });
  return res ? res.data : null;
};

const getHeroesById = async (
  id: number,
  controller: any
): Promise<GetHeroesDTO> => {
  const res = await Api.get('/api/Heroes/' + id, {
    signal: controller.signal,
  });
  return res ? res.data : null;
};

const postHeroes = async (data: any) => {
  const res = await Api.post('/api/Heroes/', data);
  return res ? res.data : null;
};

const putHeroes = async (id: number, data: any) => {
  const res = await Api.put('/api/Heroes/' + id, data);
  return res ? res.data : null;
};

const deleteHeroes = async (id: number) => {
  const res = await Api.delete('/api/Heroes/' + id);
  return res ? res.data : null;
};

// Category

const getCategory = async (controller: any) => {
  const res = await Api.get('/api/Category/', {
    signal: controller.signal,
  });
  return res ? res.data : null;
};

const getCategoryById = async (id: number, controller: any) => {
  const res = await Api.get('/api/Category/' + id, {
    signal: controller.signal,
  });
  return res ? res.data : null;
};

const postCategory = async (data: any) => {
  const res = await Api.post('/api/Category/', data);
  return res ? res.data : null;
};

const putCategory = async (id: number, data: any) => {
  const res = await Api.put('/api/Category/' + id, data);
  return res ? res.data : null;
};

const deleteCategory = async (id: number) => {
  const res = await Api.delete('/api/Category/' + id);
  return res ? res.data : null;
};

const HeroesAPI = {
  getHeroes,
  getHeroesById,
  postHeroes,
  putHeroes,
  deleteHeroes,
  getCategory,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory,
};

export default HeroesAPI;
