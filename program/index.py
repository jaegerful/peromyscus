from pyodbc import connect, SQL_WCHAR, Error, drivers, dataSources
import parts

""" establish connection with database. """

driver = '{Microsoft Access Driver (*.md, *.accdb)}'
filepath = r'C:\Users\Fischer\Documents\Mice.accdb'

myDataSources = dataSources()
access_driver = myDataSources['MS Access']

conn = connect(driver= access_driver, dbq=filepath, autocommit=True)  
print("connected")

conn.setdecoding(SQL_WCHAR, encoding = 'utf-8')
conn.setencoding(encoding = 'utf-8')



""" instantiate cursor. """

cursor = conn.cursor()



""" show title. """


parts.title()

""" prompt colony manager for batch parameters. """

stock, ideal_batch_size = parts.parameters()
""" execute query. """

parts.query(stock, cursor)

""" make batch. """

batch, cur_batch_size, pairs_have_unique_parents = parts.assemble(cursor, ideal_batch_size)

""" display batch. """

header, status, schema, message_displayed = parts.display(stock, cur_batch_size, ideal_batch_size, batch, pairs_have_unique_parents)

""" prompt colony manager for email address. """

receiver = parts.address()

""" send email to colony manager with batch contents. """

parts.send(receiver, header, status, schema, batch, plain_text_alternative = message_displayed)

""" close connection with database. """

conn.close()