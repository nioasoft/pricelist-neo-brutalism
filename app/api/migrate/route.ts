import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

// Migration script to populate database from JSON file
async function migrateFromJSON() {
    const fs = require('fs');
    const path = require('path');

    try {
        // Read existing JSON data
        const jsonPath = path.join(process.cwd(), 'data', 'services.json');
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

        console.log('Starting migration...');

        // Clear existing data
        await sql`DELETE FROM services`;
        await sql`DELETE FROM categories`;
        await sql`ALTER SEQUENCE categories_id_seq RESTART WITH 1`;
        await sql`ALTER SEQUENCE services_id_seq RESTART WITH 1`;

        // Insert categories and services
        for (let i = 0; i < jsonData.length; i++) {
            const category = jsonData[i];

            // Insert category
            const { rows: [newCategory] } = await sql`
        INSERT INTO categories (name, display_order)
        VALUES (${category.category}, ${i})
        RETURNING id
      `;

            console.log(`Created category: ${category.category}`);

            // Insert services for this category
            for (let j = 0; j < category.services.length; j++) {
                const service = category.services[j];
                await sql`
          INSERT INTO services (category_id, name, explanation, technical, price, display_order)
          VALUES (
            ${newCategory.id},
            ${service.name},
            ${service.explanation},
            ${service.technical},
            ${service.price},
            ${j}
          )
        `;
            }

            console.log(`  Added ${category.services.length} services`);
        }

        console.log('Migration completed successfully!');
        return { success: true, message: 'Migration completed' };
    } catch (error) {
        console.error('Migration error:', error);
        throw error;
    }
}

export async function GET() {
    try {
        const result = await migrateFromJSON();
        return Response.json(result);
    } catch (error: any) {
        return Response.json(
            { error: 'Migration failed', details: error.message },
            { status: 500 }
        );
    }
}
