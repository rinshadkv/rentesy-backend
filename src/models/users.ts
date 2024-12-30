import { integer, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const UserRole = pgEnum('userRole', [
    'PROPERTY_OWNER',
    'PROPERTY_MANAGER',
    'PROPERTY_OWER+PROPERTY_MANAGER',
    'PROPERTY_COMPANY_MANAGMENT_OWNER',
    'COMMUNITY_ASSCOCIATION',
    'OTHER',
]);

export const users = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    phone: varchar({ length: 255 }).notNull(),
    role: UserRole().notNull(),
});

export const userSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    phone: z.string().min(1, 'Phone is required'),
});
