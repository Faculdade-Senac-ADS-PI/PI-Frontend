import { useQuery } from "@tanstack/react-query"
import { workerService, categoryService } from "@/api/client"

export function useWorkers(params) {
  return useQuery({
    queryKey: ["workers", params],
    queryFn: () => workerService.list(params).then((res) => res.data),
  })
}

export function useWorker(id) {
  return useQuery({
    queryKey: ["worker", id],
    queryFn: () => workerService.getById(id).then((res) => res.data),
    enabled: !!id,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.list().then((res) => res.data),
  })
}