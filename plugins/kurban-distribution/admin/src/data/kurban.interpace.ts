export interface KurbanDistribution {
    id: number;
    province_id: string;
    province_name: string;
    city_id: string;
    city_name: string;
    cow_count: number;
    goat_count: number;
    recipient_count: number;
    distribution_types?:string;
  }
  