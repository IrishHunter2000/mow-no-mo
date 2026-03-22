import pandas as pd
from supabase import create_client, Client
from datetime import datetime
import os
from dotenv import load_dotenv

# Load env variables
load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

TABLE_NAME = "client_list"
CSV_FILE = "mow-no-mo-clients.csv"

def transform_row(row, idx):
    print(f"Processing row for: ", row["Name"])
    return {
        "id": idx + 1,
        "name": row["Name"],
        "neighborhood": row["Neighborhood"],
        "address": row["Address"],
        "area": row["Area"],
        "email": row["Email"],
        "phone_number": row["Phone Number"],
        "frequency": row["Frequency"],
        "price": row["Price"],
        "notes": row["Notes"],
        "created_at": datetime.utcnow().isoformat()
    }

def main():
    df = pd.read_csv(CSV_FILE)

    # Replace NaN / inf with None
    df = df.replace([float("inf"), float("-inf")], None)
    df = df.where(pd.notnull(df), None)

    records = [
        transform_row(row, idx)
        for idx, row in df.iterrows()
    ]

    # Insert in batches (recommended for larger CSVs)
    batch_size = 500
    for i in range(0, len(records), batch_size):
        batch = records[i:i+batch_size]
        response = supabase.table(TABLE_NAME).insert(batch).execute()
        print(f"Inserted batch {i // batch_size + 1}")

    print("✅ Done!")

if __name__ == "__main__":
    main()