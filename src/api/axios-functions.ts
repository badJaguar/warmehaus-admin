import axios, { AxiosError, AxiosResponse } from "axios";
import { CreateFloorDto } from "../modal/create-modal";
import { Floor } from "../table/TableComponent";

export const getFloorsByBrand = async (query?: string): Promise<Floor[]> => new Promise<Floor[]>(
  (resolve, reject) => {
    const mainUrl = "https://warmehouse-be.herokuapp.com/floors/filterByParams";

    axios.get(`${mainUrl}${query}`)
      .then((response: AxiosResponse<any>) => resolve(response.data))
      .catch((error: AxiosError<string>) => reject(error));
  },
);

export const createFloor = async (
  floor: CreateFloorDto,
): Promise<CreateFloorDto> => new Promise<CreateFloorDto>(
  (resolve, reject) => {
    axios.post<CreateFloorDto>('https://warmehouse-be.herokuapp.com/floors/floor', floor, {
      headers: {
        'X-API-KEY': sessionStorage.getItem('login')
      }
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  },
);

export const deleteFloor = async (
  id: string,
) => new Promise<any>(
  (resolve, reject) => {
    axios.delete(`https://warmehouse-be.herokuapp.com/floors/${id}`, {
      headers: {
        'X-API-KEY': sessionStorage.getItem('login')
      }
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  },
);

export const patchFloor = async (
  id: string,
  floor: CreateFloorDto,
) => new Promise<any>(
  (resolve, reject) => {
    axios.patch(`https://warmehouse-be.herokuapp.com/floors/${id}`, floor, {
      headers: {
        'X-API-KEY': sessionStorage.getItem('login')
      }
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  },
);