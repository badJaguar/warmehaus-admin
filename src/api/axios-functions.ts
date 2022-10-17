import axios from "axios";
import { CreateFloorDto } from "../modal/create-modal";

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