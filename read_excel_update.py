import pandas as pd

# Lire le fichier Excel mis à jour
df = pd.read_excel('docs/tableau_experiences 4.xlsx')

# Afficher les premières lignes pour vérification
print("=== Contenu du fichier Excel ===")
print(df.head())
print("\n=== Noms des colonnes ===")
print(df.columns.tolist())

# Afficher le nombre de lignes et colonnes
print(f"\n=== Dimensions ===\n{df.shape[0]} lignes x {df.shape[1]} colonnes")

# Afficher les données pour chaque expérience
print("\n=== Détails des expériences ===")
for idx, row in df.iterrows():
    print(f"\nExpérience {idx+1}:")
    print(f"Activité: {row['Activités']}")
    print(f"Savoirs: {row['Savoirs']}")
    print(f"Savoir-Faire: {row['Savoir-Faire']}")
    print(f"Savoir-Être: {row['Savoir-Être']}")
