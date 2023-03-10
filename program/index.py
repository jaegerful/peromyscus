import pyodbc

""" establish connection with database. """

dsn = 'DRIVER={postgres};DATABASE=peromyscus;UID=postgres;PWD=password;SERVER=localhost;PORT=5433;'
connection = pyodbc.connect(dsn)

connection.setdecoding(pyodbc.SQL_WCHAR, encoding = 'utf-8')
connection.setencoding(encoding = 'utf-8')

""" instantiate cursor. """

cursor = connection.cursor()

""" prompt colony manager for input. """

print("\nmating-pair generator\n")

stock = input('1. which stock do you need mating pairs for? (e.g. SMLNJ) ')
stock = stock.strip() # trim string.
stock = stock.upper() # make string uppercase.

ideal_batch_size = input('\n2. how many pairs do you need (e.g. 25)? ')

while not ideal_batch_size.isdigit():
    ideal_batch_size = input('that was not a valid number. how many pairs do you need? ')

ideal_batch_size = int(ideal_batch_size)

""" retrieve query. """

query = None

with open('./query/reality.sql', 'r') as file:
    query = file.read()

""" execute query """

args = (stock,) # arguments for placeholders in query.
cursor.execute(query, args)

""" make batch from pairs with unique mates. """

batch = [] # holds final pairs.
cur_batch_size = 0

# hash tables for male and female identifiers. 
# used to check if an identifer has already been used in 'batch' array.

males = {}
females = {}

# iterate through query, until batch is complete.

row = cursor.fetchone()

while row is not None and cur_batch_size < ideal_batch_size:

    # if pair consists of unused male and female.

    if ((not row.male_id in males) and (not row.female_id in females)):

        # append to 'batch' array.
        
        batch.append(row)
        cur_batch_size += 1

        # add identifiers to hash tables.

        males[row.male_id] = True
        females[row.female_id] = True
    
    row = cursor.fetchone()

""" display generated batch to colony manager. """

print(f'\ngenerated batch for the "{stock}" stock.')

if (cur_batch_size == ideal_batch_size):
    print('successfully made ', end = '')
else:
    print('only could make ', end = '')

print(f'{cur_batch_size} distinct pairs:\n')

for pair in batch:
    print(pair)

print()