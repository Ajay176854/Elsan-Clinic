import asyncio
import asyncpg

async def test():
    try:
        print("Attempting to connect to Supabase...")
        conn = await asyncpg.connect('postgresql://postgres:Calgebrity123@db.mzbamjioprysblejnwkn.supabase.co:5432/postgres', timeout=5)
        print("SUCCESS! Connected to Supabase!")
        await conn.close()
    except Exception as e:
        print(f"FAILED: {type(e).__name__}: {e}")

if __name__ == "__main__":
    asyncio.run(test())
