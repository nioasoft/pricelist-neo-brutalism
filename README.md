# Price List Application 🎨

אפליקציית מחירון דיגיטלי בעיצוב Neo-Brutalism עם ממשק ניהול מלא.

## תכונות

✅ עיצוב Neo-Brutalism צבעוני ובועט  
✅ ממשק ניהול לעדכון מחירים ושירותים  
✅ מסד נתונים Vercel Postgres  
✅ תמיכה מלאה ב-RTL (עברית)  
✅ Responsive לכל המכשירים  

## הפריסה ל-Vercel

### שלב 1: יצירת פרויקט ב-Vercel

1. עלה את הקוד ל-GitHub repository
2. התחבר ל-[Vercel](https://vercel.com)
3. לחץ על "Add New" → "Project"
4. בחר את ה-repository שלך
5. לחץ על "Deploy"

### שלב 2: הוספת Vercel Postgres Database

1. בדף הפרויקט ב-Vercel, לך ל-"Storage" tab
2. לחץ על "Create Database"
3. בחר "Postgres"
4. בחר את ה-region (תבחר קרוב ללקוחות שלך, למשל Frankfurt)
5. לחץ על "Create"
6. Vercel יגדיר אוטומטית את כל ה-environment variables

### שלב 3: הגדרת הסיסמה

1. בדף הפרויקט, לך ל-"Settings" → "Environment Variables"
2. הוסף משתנה חדש:
   - **Name**: `ADMIN_PASSWORD`
   - **Value**: `הסיסמה_החזקה_שלך`
3. לחץ על "Save"

### שלב 4: הרצת הטבלאות ב-Database

1. בדף הפרויקט, לך ל-"Storage" → בחר את ה-database
2. לחץ על "Query" או "Data"
3. העתק והרץ את התוכן של הקובץ `schema.sql`:

```sql
-- Copy and paste the entire contents of schema.sql here
```

### שלב 5: העברת הנתונים

אחרי ה-deployment הראשון, בצע את שלב ההעברה הזה **פעם אחת בלבד**:

1. גש ל-URL: `https://your-app.vercel.app/api/migrate`
2. זה יעתיק את כל הנתונים מ-`data/services.json` למסד הנתונים
3. אם הכל עבד, תראה הודעה: `{"success": true, "message": "Migration completed"}`

### שלב 6: בדיקה

1. גש לאתר: `https://your-app.vercel.app`
2. ודא שכל השירותים מוצגים
3. גש לממשק הניהול: `https://your-app.vercel.app/admin`
4. התחבר עם הסיסמה שהגדרת
5. נסה לערוך שירות ולשמור - ודא שהשינויים נשמרים

## פיתוח מקומי

### דרישות

- Node.js 18+
- npm או yarn

### התקנה

```bash
# התקן dependencies
npm install

# צור קובץ .env.local
cp .env.example .env.local

# ערוך .env.local והוסף:
# ADMIN_PASSWORD=your_password
# POSTGRES_URL=your_local_postgres_url (אם יש)
```

### הרצה מקומית

```bash
npm run dev
```

האתר יהיה זמין ב-`http://localhost:3000`

## מבנה הפרויקט

```
pricelist_code7/
├── app/
│   ├── api/
│   │   ├── services/route.ts   # API לקריאה ועדכון שירותים
│   │   └── migrate/route.ts    # Migration script (להרצה חד-פעמית)
│   ├── admin/page.tsx          # ממשק ניהול
│   ├── page.tsx                # עמוד ראשי
│   └── globals.css             # עיצוב Neo-Brutalism
├── components/
│   ├── ServiceCard.tsx         # כרטיס שירות
│   └── CategorySection.tsx     # קטגוריה
├── data/
│   └── services.json           # נתונים ראשוניים (לפני migration)
├── schema.sql                  # מבנה DB
└── .env.example                # תבנית environment variables
```

## טכנולוגיות

- **Framework**: Next.js 16 (App Router)
- **Database**: Vercel Postgres
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Language**: TypeScript

## שאלות נפוצות

### איך משנים את הסיסמה?

1. ב-Vercel: Settings → Environment Variables
2. ערוך את `ADMIN_PASSWORD`
3. Redeploy את האתר

### איך מוסיפים שירות חדש?

1. גש ל-`/admin`
2. תחת הקטגוריה הרצויה, לחץ "שירות חדש"
3. מלא את הפרטים
4. לחץ "שמור שינויים"

### איך מוסיפים קטגוריה חדשה?

1. גש ל-`/admin`
2. גלול למטה ולחץ "הוסף קטגוריה חדשה"
3. ערוך את שם הקטגוריה
4. הוסף שירותים
5. לחץ "שמור שינויים"

### איך מוחקים שירות/קטגוריה?

1. גש ל-`/admin`
2. לחץ על אייקון הפח ליד השירות/קטגוריה
3. אשר את המחיקה
4. לחץ "שמור שינויים"

## תמיכה

לכל שאלה או בעיה, פנה למפתח.

---

© 2024 - כל הזכויות שמורות
