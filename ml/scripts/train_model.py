import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
)

from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier

# ==========================================
# Load Dataset
# ==========================================

df = pd.read_csv("../outputs/cleaned_dataset.csv")

X = df.drop("PCOS", axis=1)
y = df["PCOS"]

# ==========================================
# Train Test Split
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# ==========================================
# Models
# ==========================================

models = {
    "Random Forest": RandomForestClassifier(
        n_estimators=200,
        random_state=42
    ),

    "XGBoost": XGBClassifier(
        n_estimators=200,
        learning_rate=0.05,
        max_depth=4,
        random_state=42,
        eval_metric="logloss"
    )
}

best_model = None
best_accuracy = 0

print("=" * 80)
print("MODEL COMPARISON")
print("=" * 80)

for name, model in models.items():

    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)

    print(f"\n{name}")
    print("-" * 50)

    print("Accuracy :", round(accuracy,4))
    print("Precision:", round(precision_score(y_test,y_pred),4))
    print("Recall   :", round(recall_score(y_test,y_pred),4))
    print("F1 Score :", round(f1_score(y_test,y_pred),4))

    print("\nClassification Report")
    print(classification_report(y_test,y_pred))

    if accuracy > best_accuracy:
        best_accuracy = accuracy
        best_model = model

print("\n" + "=" * 80)
print("BEST MODEL")
print("=" * 80)

print(type(best_model).__name__)
print("Accuracy:", round(best_accuracy,4))

joblib.dump(best_model,"../models/model.pkl")

print("\nModel saved successfully!")