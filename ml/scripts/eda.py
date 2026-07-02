import pandas as pd

df = pd.read_csv("../outputs/cleaned_dataset.csv")

print("=" * 70)
print("DATASET SUMMARY")
print("=" * 70)

print(df.describe())

print("\n")

for col in df.columns:
    print("=" * 60)
    print(col)
    print(df[col].value_counts())
    print()