import { integer, pgEnum, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const PropertyType = pgEnum('PropertyType', [
    'RESEDENTIAL',
    'COMMERCIAL',
    'RESERVEDIAL+COMMERCIAL',
    'COMMUNITY_ASSCOCIATION',
    'AFFORDABLE_HOUSING',
    'STORAGE',
    'SHORT_TERM_RENTAL',
    'OTHER',
]);

export const Status = pgEnum('Status', ['COMPLETED', 'IN_PROGRESS', 'IN_REVIEW', 'REJECTED']);

export const requestes = pgTable('requestes', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    noOfUnits: integer().notNull(),
    propertyType: PropertyType().notNull(),
    status: Status().notNull(),
    userId: integer().notNull(),
    durationToManage: varchar({ length: 255 }).notNull(),
    created_at: timestamp().notNull().defaultNow(),
});

export const tokens = pgTable('tokens', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    token: varchar({ length: 255 }).notNull(),
    userId: integer().notNull(),
    expiresAt: timestamp(),
});
