import pyodbc
import textwrap

""" establish connection with database. """

dsn = 'DRIVER={postgres};DATABASE=peromyscus;UID=postgres;PWD=password;SERVER=localhost;PORT=5433;'
connection = pyodbc.connect(dsn)

connection.setdecoding(pyodbc.SQL_WCHAR, encoding = 'utf-8')
connection.setencoding(encoding = 'utf-8')

""" instantiate cursor. """

cursor = connection.cursor()

""" prompt colony manager for input. """

print("\ngenerator for non-sibling mating pairs.\n")

stock = input('1. which stock do you want mating pairs for (e.g. SMLNJ)? ')
stock = stock.strip() # trim string.

ideal_batch_size = input('2. how many pairs do you need (e.g. 25)? ')

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

# if no pairs could be generated.

if (cur_batch_size == 0):
    message = f"""
        could not generate any pairs for the stock: "{stock}".
    
        this could have happened for several reasons:

        1. "{stock}" may not exist (capitalization must be right).
        2. the database may not be up to date.
        3. there may simply not exist any possible non-sibling pairs.
    """

    message = textwrap.dedent(message)
    print(message)
    
    quit()

# if at least one pair generated.

message = f"""
    generated batch for the stock: "{stock}".

    {'successfully made' if (cur_batch_size == ideal_batch_size) else 'only could make '} {cur_batch_size} distinct (male, female) pairs:
"""

message = textwrap.dedent(message)
print(message)

for pair in batch:
    print(pair)

print()