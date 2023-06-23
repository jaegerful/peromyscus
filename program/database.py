""" establish connection with database. """

from pyodbc import connect, SQL_WCHAR

dsn = 'DRIVER={postgres};DATABASE=peromyscus;UID=postgres;PWD=password;SERVER=localhost;PORT=5433;'
connection = connect(dsn)

connection.setdecoding(SQL_WCHAR, encoding = 'utf-8')
connection.setencoding(encoding = 'utf-8')

cursor = connection.cursor() # instantiate cursor.