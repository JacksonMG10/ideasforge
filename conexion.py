import mysql.connector

try:
    # Intentar conectar sin contraseña
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  # Se deja vacío
        database="ideasforge_db"
    )

    cursor = db.cursor()
    cursor.execute("SELECT p.id, p.titulo, p.progreso_porcentaje, c.nombre FROM proyectos p LEFT JOIN categorias_innovacion c ON p.categoria_id = c.id;")
    
    print("\n✅ ¡Conexión exitosa a MySQL Workbench!")
    print("--- Registros en la Base de Datos ---")
    for row in cursor.fetchall():
        print(f"ID: #{row[0]} | Proyecto: {row[1]} | Avance: {row[2]}% | Categoría: {row[3]}")

except mysql.connector.Error as err:
    print(f"❌ Error de conexión: {err}")