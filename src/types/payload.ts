export interface Payload {
  nama_lengkap: string;
  no_whatsapp: string;
  is_join_cg: boolean;
  age_category: string;
}

export interface FormResponse {
  status: boolean;
  result: Result;
}

export interface Result {
  event_id: string;
  whatsapp_number: string;
  origin: string;
  fullname: string;
  age: string;
  cg_category: string;
  is_join_cg: boolean;
  additional_information: any;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  id: string;
}
