from pyodbc import connect, SQL_WCHAR
import parts

""" establish connection with database. """

dsn = 'DRIVER={postgres};DATABASE=peromyscus;UID=postgres;PWD=password;SERVER=localhost;PORT=5433;'
connection = connect(dsn)

connection.setdecoding(SQL_WCHAR, encoding = 'utf-8')
connection.setencoding(encoding = 'utf-8')

""" instantiate cursor. """

cursor = connection.cursor()

""" prompt colony manager for batch parameters. """

stock, ideal_batch_size = parts.parameters()

""" execute query. """

parts.query(stock, cursor)

""" make batch. """

batch, cur_batch_size = parts.assemble(cursor, ideal_batch_size)

""" display batch. """

header, status, message_displayed = parts.display(stock, cur_batch_size, ideal_batch_size, batch)

""" prompt colony manager for email address. """

receiver = parts.address()

""" send email to colony manager with batch contents. """

parts.send(receiver, header, status, batch, plain_text_alternative = message_displayed)

""" close connection with database. """

connection.close()