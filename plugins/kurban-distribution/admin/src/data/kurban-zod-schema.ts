import { z } from 'zod';

export const schema = z.object({
  province_id: z.string().min(1, 'Provinsi wajib diisi'),
  city_id: z.string().min(1, 'Kota wajib diisi'),
  goat_count: z
    .string()
    .refine((val) => val.trim() !== '', { message: 'Jumlah kambing wajib diisi' })
    .refine((val) => /^[0-9]+$/.test(val), { message: 'Jumlah kambing harus berupa angka bulat' })
    .refine((val) => parseInt(val, 10) > 0, { message: 'Jumlah kambing harus lebih dari 0' }),
  cow_count: z
    .string()
    .refine((val) => val.trim() !== '', { message: 'Jumlah sapi wajib diisi' })
    .refine((val) => /^[0-9]+$/.test(val), { message: 'Jumlah sapi harus berupa angka bulat' })
    .refine((val) => parseInt(val, 10) > 0, { message: 'Jumlah sapi harus lebih dari 0' }),
  recipient_count: z
    .string()
    .refine((val) => val.trim() !== '', { message: 'Jumlah penerima wajib diisi' })
    .refine((val) => /^[0-9]+$/.test(val), { message: 'Jumlah penerima harus berupa angka bulat' })
    .refine((val) => parseInt(val, 10) > 0, { message: 'Jumlah penerima harus lebih dari 0' }),
  olahanKaleng: z.boolean(),
  dagingSegar: z.boolean(),
});
