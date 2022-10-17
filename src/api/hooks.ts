import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateFloorDto } from "../modal/create-modal";
import { createFloor, deleteFloor, patchFloor } from "./axios-functions";

export function useCreateFloor() {
  const queryClient = useQueryClient();

  return useMutation(
    (user: CreateFloorDto) => createFloor(user),
    {
      onSuccess: () => queryClient.invalidateQueries('floors' as any),
    },
  );
}

export function useUpdateFloor() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, floor }: { id: string, floor: CreateFloorDto; }) => {
      return patchFloor(id, floor);
    },
    {
      onSuccess: () => queryClient.invalidateQueries('floors' as any),
    },
  );
}


export function useDeleteFloor() {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => deleteFloor(id),
    {
      onSuccess: () => queryClient.invalidateQueries('floors' as any),
    },
  );
}