import pandas as pd

# Lire le fichier Excel
df = pd.read_excel('docs/tableau_experiences 3.xlsx')

# Afficher les premières lignes et les informations du DataFrame
print("Contenu du fichier Excel:")
print(df.head())
print("\nColonnes du fichier:")
print(df.columns.tolist())
