""" functions exposed to 'eel'. """

from database import cursor
import eel

""" retrieve and execute query. """

def query(stock):
    # retrieve query.

    query = None
    with open(r'program\query\reality.sql', 'r') as file:
        query = file.read() 

    # execute query.
    args = (stock,)
     # arguments for placeholders in query.
    cursor.execute(query, args)

""" converts 'pyodbc' row to dictionary. """

def represent(row):
    return {
        'female_id': row.female_id,
        'mating_cage_of_female': row.mating_cage_of_female,
        'male_id': row.male_id,
        'mating_cage_of_male': row.mating_cage_of_male,
    }

""" assemble ideal batch. """

@eel.expose
def assemble(stock, ideal_batch_size):
    
    """ part one: execute query. """

    query(stock)

    """ part two: make 'batch_with_unique_mice'. """
    
    batch_with_unique_mice = []

    # hash tables for mice identifiers. 
    # used to check if a particular identifer has already been used in batch.

    mice = {}

    # filter query until batch is complete.

    row = cursor.fetchone()

    while row is not None:

        # if pair consists of unused male and female.

        if ((not row.male_id in mice) and (not row.female_id in mice)):
        
            # add to batch.
            
            batch_with_unique_mice.append(row)

            # add identifiers to hash table.

            mice[row.male_id] = True
            mice[row.female_id] = True
        
        row = cursor.fetchone()
<<<<<<< HEAD:program/parts.py
    """ part two: make 'batch_with_unique_mice_and_parents'. """
=======
    
    """ part three: make 'batch_with_unique_mice_and_parents'. """
>>>>>>> postgres:program/engine.py

    batch_with_unique_mice_and_parents = []
    cur_batch_size = 0

    # hash table for mating numbers. 
    # used to check if a particular mating number has already been used in new batch.

    mating_numbers = {}

    # hash table for pairs.
    # used to check if a particular pair has already been used in new batch.

    # since pairs in new batch have unique mates, either mate's identifier can also identify the pair as a whole.

    pairs = {}

    # filter 'batch_with_unique_mice', until 'batch_with_unique_mice_and_parents' is complete.

    i = 0
    length = len(batch_with_unique_mice)

    while i < length and cur_batch_size < ideal_batch_size:

        # retrieve row from original batch.

        row = batch_with_unique_mice[i]

        # if both mates have unused parents.

        if ((not row.mating_cage_of_male in mating_numbers) and (not row.mating_cage_of_female in mating_numbers)):

            # add to new batch.

            batch_with_unique_mice_and_parents.append(row)
            cur_batch_size += 1

            # add mating numbers to hash table.

            mating_numbers[row.mating_cage_of_male] = True
            mating_numbers[row.mating_cage_of_female] = True

            # add row to hash table.

            pairs[row.male_id] = True

        i += 1

    """ part four: extend 'batch_with_unique_mice_and_parents' if necessary. """

    ideal_batch = batch_with_unique_mice_and_parents # alias.
    pairs_have_unique_parents = True # remains true if all pairs in 'ideal_batch' have unique parents.

    i = 0

    while i < length and cur_batch_size < ideal_batch_size:
        
        # retrieve row from 'batch_with_unique_mice'.

        row = batch_with_unique_mice[i]

        # if row not yet used in 'ideal_batch'.

        if row.male_id not in pairs:
            ideal_batch.append(row)
            cur_batch_size += 1

        i += 1


    if i > 0:
        pairs_have_unique_parents = False

    # convert rows to dictionaries.

    batch = list(map(represent, ideal_batch))

    # return results.

    return {'batch': batch, 'unique_parents': pairs_have_unique_parents}

""" generate description for assembled batch. """

from textwrap import dedent

@eel.expose
def display(stock, cur_batch_size, ideal_batch_size, batch, unique_parents):

    header = f'Batch generated for the stock: "{stock}"'
    status = f'{"Successfully made" if (cur_batch_size == ideal_batch_size) else "only could make"} {cur_batch_size} unique non-sibling pair{"" if cur_batch_size == 1 else "s"}. Existing mating cages {"were only used once" if unique_parents else "were used more than once"} for this batch.'

    # 'header' and 'status' are indented with spaces in 'message'.
    # the 'dedent' function requires every line in string to be prefixed with identical whitespace.
    
    # thus, each pair in batch should be indented using spaces.

    tab = ' ' * 8

    schema = f'(female_id, mating_cage_female_was_taken_from, male_id, mating_cage_male_was_taken_from)'
    batch_as_string = ''.join([('\n' + tab + str(tuple(pair.values()))) for pair in batch])

    message = f"""
        {status}

        {schema}
        {batch_as_string}
    """

    message = dedent(message)

    return {'header': header, 'status': status, 'schema': schema, 'message': message}

""" send email to colony manager with batch contents. """

from dotenv import load_dotenv
from os import environ

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

@eel.expose
def send(header, status, schema, plain_text_alternative, batch, receiver):
    load_dotenv()

    try:

        with smtplib.SMTP('smtp.gmail.com', 587) as smtp: # can throw error.

            # encrypt connection.

            smtp.starttls()
            smtp.ehlo()

            # authenticate.

            sender = environ.get('sender')
            password = environ.get('password')

            smtp.login(sender, password)

            # prepare email.

            email = MIMEMultipart('alternative') 
            email['Subject'] = header

            ## email as plain text.

            text = MIMEText(plain_text_alternative, 'plain') # use same message from terminal.
            email.attach(text)

            ## email as html.

            schema = schema.strip()

            batch_as_html = ''.join([('<li>' + str(tuple(pair.values())) + '</li>') for pair in batch])

            html = f"""
                <h1 style = 'font-size: 1.2rem'>{header}</h1>
                <em style = 'font-size: 1.1rem'>{status}</em>

                
                <p style = 'font-size: 1.1rem'>
                    <b>{schema}</b>
                </p>

                <ol style = 'font-size: 1.1rem'>
                    {batch_as_html}
                </ol>
            """

            html = MIMEText(html, 'html')
            email.attach(html)

            # send email.

            smtp.sendmail(sender, receiver, email.as_string())

            return True

    except Exception as error:
        print(error)
        return False
    
""" start application. """

if __name__ == '__main__':
    eel.init('web')
    eel.start('index.html')