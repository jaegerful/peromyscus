""" establish connection with database. """

from pyodbc import connect, SQL_WCHAR, dataSources

driver = dataSources()['MS Access']
path = '' # must replete w/ path to database.

connection = connect(driver = driver, dbq = path)

connection.setdecoding(SQL_WCHAR, encoding = 'utf-8')
connection.setencoding(encoding = 'utf-8')

cursor = connection.cursor() # instantiate cursor.