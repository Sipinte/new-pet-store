export const ROUTE_PATHS = {
  petList: "/pets",
  petCreate: "/pets/new",
  petDetail: (id: number | string) => `/pets/${id}`,
} as const;