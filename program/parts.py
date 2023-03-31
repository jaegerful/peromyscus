""" these functions are used by 'index.py'. """

""" show tite. """

def title():
    print('\ngenerator for non-sibling mating pairs.\n')

""" prompt colony manager for batch parameters. """

def parameters():
    stock = input('1. which stock do you want mating pairs for (e.g. SMLNJ)? ')
    stock = stock.strip() # trim string.

    ideal_batch_size = input('2. how many pairs do you need (e.g. 25)? ')

    # while 'ideal_batch_size' is not a natural number.

    first_input_error = True

    while not ideal_batch_size.isdigit() or int(ideal_batch_size) <= 0:
        
        # if first iteration, add line break.
        
        if first_input_error:
            print()
            first_input_error = False
            
        # request input for 'ideal_batch_size'.

        ideal_batch_size = input('that was not a valid number. how many pairs do you need? ')

    ideal_batch_size = int(ideal_batch_size)

    return (stock, ideal_batch_size)

""" retrieve and execute query. """

def query(stock, cursor):
    # retrieve query.
    
    query = None

    with open('./query/reality.sql', 'r') as file:
        query = file.read()

    # execute query.

    args = (stock,) # arguments for placeholders in query.
    cursor.execute(query, args)

""" assemble ideal batch. """

def assemble(cursor, ideal_batch_size):
    
    """ part one: make 'batch_with_unique_mice'. """
    
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
    
    """ part two: make 'batch_with_unique_mice_and_parents'. """

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

    """ part three: extend 'batch_with_unique_mice_and_parents' if necessary. """

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

    return (ideal_batch, cur_batch_size, pairs_have_unique_parents)

""" display assembled batch in terminal. """

from textwrap import dedent

def display(stock, cur_batch_size, ideal_batch_size, batch, unique_parents):
    # if no pairs could be generated.

    if (cur_batch_size == 0):
        message = f"""
            could not generate any pairs for the stock: "{stock}".
        
            this could have happened for several reasons:

            1. "{stock}" may not exist (capitalization may be wrong).
            2. the database may not be up to date.
            3. there may simply not exist any possible non-sibling pairs.
        """

        message = dedent(message)
        print(message)
        
        quit()

    # if at least one pair generated.

    header = f'batch generated for the stock: "{stock}"'
    status = f'{"successfully made" if (cur_batch_size == ideal_batch_size) else "only could make"} {cur_batch_size} unique non-sibling pairs. existing mating cages {"were only used once" if unique_parents else "were used more than once"} for this batch.'

    # 'header' and 'status' are indented with spaces in 'message'.
    # the 'dedent' function requires every line in string to be prefixed with identical whitespace.
    
    # thus, each pair in batch should be indented using spaces.

    tab = ' ' * 8

    schema = f'the format below is...\n{tab}(female, mating_cage_female_was_taken_from, male, mating_cage_male_was_taken_from).'
    batch_as_string = ''.join([('\n' + tab + str(pair)) for pair in batch])

    message = f"""
        {header}

        {status}

        {schema}
        {batch_as_string}
    """

    message = dedent(message)

    print(message)

    return (header, status, schema, message)

""" prompt colony manager for email address. """

def address():
    receiver = None

    while True:
        receiver = input('what email should receive a copy of this batch (e.g. alex@gmail.com)? ')
        receiver = receiver.strip()

        confirmation = input(f'is this email correct? {receiver} (y/n): ') 
        confirmation = confirmation.strip()
        confirmation = confirmation.lower()

        if confirmation == 'y':
            break

        print()

    return receiver

""" send email to colony manager with batch contents. """

from dotenv import load_dotenv
from os import environ

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

def send(receiver, header, status, schema, batch, plain_text_alternative):
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

            schema = schema.split('\n')
            schema[1] = schema[1].strip()

            batch_as_html = ''.join([('<li>' + str(pair) + '</li>') for pair in batch])

            html = f"""
                <h1 style = 'font-size: 1.2rem'>{header}</h1>
                <em style = 'font-size: 1.1rem'>{status}</em>

                
                <p style = 'font-size: 1.1rem'>
                    {schema[0]}
                    <br>
                    <b>{schema[1]}</b>
                </p>

                <ol style = 'font-size: 1.1rem'>
                    {batch_as_html}
                </ol>
            """

            html = MIMEText(html, 'html')
            email.attach(html)

            # send email.

            smtp.sendmail(sender, receiver, email.as_string())

            print(f'\nbatch was sent successfully to {receiver}.\n')

    except:
        message = f"""
            an error occurred.
        
            this could have happened for several reasons:

            1. this computer is currently offline.
            2. the email server rejected our connection.
            3. the internal database this program uses to temporarily store batches failed.
        """

        message = dedent(message)
        print(message)

        quit()