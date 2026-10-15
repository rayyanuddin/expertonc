import { z } from "zod";
export const emailSchema = z.object({ email:z.string().trim().email().max(254), consent:z.literal(true), website:z.string().max(0).optional() });
export const contactSchema = z.object({ name:z.string().trim().min(2).max(80), email:z.string().trim().email().max(254), topic:z.enum(["general","privacy","technical","partnership"]), message:z.string().trim().min(10).max(3000), website:z.string().max(0).optional() });
export const phoneSchema = z.object({ phone:z.string().trim().regex(/^\+[1-9]\d{7,14}$/,"Use international format, for example +12165551234"), website:z.string().max(0).optional() });
