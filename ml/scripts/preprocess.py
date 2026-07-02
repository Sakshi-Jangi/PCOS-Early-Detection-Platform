import pandas as pd

# ==========================================
# Load Dataset
# ==========================================

df = pd.read_csv("../datasets/non_pcos.csv")

print("=" * 60)
print("Original Shape")
print(df.shape)

# ==========================================
# Drop Unnecessary Columns
# ==========================================

columns_to_drop = [
    "Unnamed: 0",
    "PCOS_from",
    "City"
]

df.drop(columns=columns_to_drop, inplace=True)

print("\nDropped Columns:")
print(columns_to_drop)

# ==========================================
# Encode Target Column
# ==========================================

df["PCOS"] = df["PCOS"].map({
    "No": 0,
    "Yes": 1
})

print("\nTarget Value Counts:")
print(df["PCOS"].value_counts())

# ==========================================
# Check Missing Values
# ==========================================

print("\nMissing Values:")
print(df.isnull().sum())

# ==========================================
# Final Dataset Information
# ==========================================

print("\nFinal Shape:")
print(df.shape)

print("\nFinal Columns:")
print(df.columns.tolist())

# ==========================================
# Save Clean Dataset
# ==========================================

output_path = "../outputs/cleaned_dataset.csv"

df.to_csv(output_path, index=False)

print("\n==========================================")
print("Cleaned dataset saved successfully!")
print(f"Location: {output_path}")
print("==========================================")