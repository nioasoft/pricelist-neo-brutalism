import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const dataPath = path.join(process.cwd(), 'data', 'services.json');

// Check if we have Postgres available
const hasPostgres = () => {
  return !!process.env.POSTGRES_URL;
};

// GET: Fetch all categories and services
export async function GET() {
  try {
    // If Postgres is available (production), use it
    if (hasPostgres()) {
      const { rows: categories } = await sql`
        SELECT id, name, display_order 
        FROM categories 
        ORDER BY display_order, id
      `;

      const { rows: services } = await sql`
        SELECT id, category_id, name, explanation, technical, price, display_order
        FROM services 
        ORDER BY category_id, display_order, id
      `;

      const result = categories.map(cat => ({
        category: cat.name,
        services: services
          .filter(s => s.category_id === cat.id)
          .map(s => ({
            id: s.id.toString(),
            name: s.name,
            explanation: s.explanation,
            technical: s.technical,
            price: s.price
          }))
      }));

      return NextResponse.json(result);
    } else {
      // Fallback to JSON file for local development
      const data = await fs.readFile(dataPath, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    }
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST: Update categories and services
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Password MUST be set in environment variables
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { error: 'Server configuration error: ADMIN_PASSWORD not set' },
        { status: 500 }
      );
    }

    if (body.password !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // If data is empty, this is just a password validation (login check)
    // Don't modify the database
    if (!body.data || body.data.length === 0) {
      return NextResponse.json({ success: true, message: 'Password validated' });
    }

    // If Postgres is available (production), use it
    if (hasPostgres()) {
      // Delete all existing data
      await sql`DELETE FROM services`;
      await sql`DELETE FROM categories`;
      await sql`ALTER SEQUENCE categories_id_seq RESTART WITH 1`;
      await sql`ALTER SEQUENCE services_id_seq RESTART WITH 1`;

      // Insert new data
      for (let i = 0; i < body.data.length; i++) {
        const category = body.data[i];

        const { rows: [newCategory] } = await sql`
          INSERT INTO categories (name, display_order)
          VALUES (${category.category}, ${i})
          RETURNING id
        `;

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
      }
    } else {
      // Fallback to JSON file for local development
      await fs.writeFile(dataPath, JSON.stringify(body.data, null, 2), 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating services:', error);
    return NextResponse.json(
      { error: 'Failed to update services' },
      { status: 500 }
    );
  }
}
