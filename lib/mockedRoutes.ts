import { Route } from "@/types/route";

export const initialRoutes: Route[] = [
  {
    id: 1,
    originCity: "São Paulo",
    originState: "SP",
    destCity: "Rio de Janeiro",
    destState: "RJ",
    price: 3200,
    company: "Transportes Rapido",
    contactInfo: {
      whatsapp: "(47) 99999-8754",
      landline: "(47) 98989-5642",
      email: "test@test.com"
    }
  },
  {
    id: 2,
    originCity: "Blumenau",
    originState: "SC",
    destCity: "Curitiba",
    destState: "PR",
    price: 1800,
    company: "Carga Sul",
    contactInfo: {
      whatsapp: "(47) 99999-8754",
      landline: "(47) 98989-5642",
      email: "test@test.com"
    }
  },
  {
    id: 3,
    originCity: "Belo Horizonte",
    originState: "MG",
    destCity: "Brasília",
    destState: "DF",
    price: 4500,
    company: "Minas Log",
    contactInfo: {
      whatsapp: "(47) 99999-8754",
      landline: "(47) 98989-5642",
      email: "test@test.com"
    }
  },
  {
    id: 4,
    originCity: "Porto Alegre",
    originState: "RS",
    destCity: "Florianópolis",
    destState: "SC",
    price: 2200,
    company: "Transportes Rapido",
    contactInfo: {
      whatsapp: "(47) 99999-8754",
      landline: "(47) 98989-5642",
      email: "test@test.com"
    }
  },
  {
    id: 5,
    originCity: "Salvador",
    originState: "BA",
    destCity: "Recife",
    destState: "PE",
    price: 3800,
    company: "Nordeste Cargas",
    contactInfo: {
      whatsapp: "(47) 99999-8754",
      landline: "(47) 98989-5642",
      email: "test@test.com"
    }
  },
];