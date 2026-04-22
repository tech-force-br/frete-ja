export interface Route {
  id: number;
  originCity: string;
  originState: string;
  destCity: string;
  destState: string;
  price: number;
  company: string;
  contactInfo: ContactInfo
};

interface ContactInfo {
  whatsappDDD: string;
  whatsapp: string;
  landlineDDD: string;
  landline: string;
  email: string;
}