export interface Route {
    id: number;
    originCity: string;
    originState: string;
    destCity: string;
    destState: string;
    price: number;
    company: string;
    contact: string;
  }

export const initialRoutes: Route[] = [
  {
    id: 1,
    originCity: "São Paulo",
    originState: "SP",
    destCity: "Rio de Janeiro",
    destState: "RJ",
    price: 3200,
    company: "Transportes Rapido",
    contact: "(11) 98765-4321",
  },
  {
    id: 2,
    originCity: "Blumenau",
    originState: "SC",
    destCity: "Curitiba",
    destState: "PR",
    price: 1800,
    company: "Carga Sul",
    contact: "carga@sul.com.br",
  },
  {
    id: 3,
    originCity: "Belo Horizonte",
    originState: "MG",
    destCity: "Brasília",
    destState: "DF",
    price: 4500,
    company: "Minas Log",
    contact: "(31) 99988-7766",
  },
  {
    id: 4,
    originCity: "Porto Alegre",
    originState: "RS",
    destCity: "Florianópolis",
    destState: "SC",
    price: 2200,
    company: "Transportes Rapido",
    contact: "(11) 98765-4321",
  },
  {
    id: 5,
    originCity: "Salvador",
    originState: "BA",
    destCity: "Recife",
    destState: "PE",
    price: 3800,
    company: "Nordeste Cargas",
    contact: "(71) 98877-6655",
  },
];