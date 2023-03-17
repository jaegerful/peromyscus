""" these functions are used by 'index.py'. """

""" prompt colony manager for batch parameters. """

def parameters():
    print("\ngenerator for non-sibling mating pairs.\n")

    stock = input('1. which stock do you want mating pairs for (e.g. SMLNJ)? ')
    stock = stock.strip() # trim string.

    ideal_batch_size = input('2. how many pairs do you need (e.g. 25)? ')

    while not ideal_batch_size.isdigit():
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

""" only use pairs with unique mates to assemble batch. """

def assemble(cursor, ideal_batch_size):
    batch = []
    cur_batch_size = 0

    # hash tables for male and female identifiers. 
    # used to check if a particular identifer has already been used in 'batch'.

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

    return (batch, cur_batch_size)

""" display assembled batch in terminal. """

from textwrap import dedent

def display(stock, cur_batch_size, ideal_batch_size, batch):
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
    status = f'{"successfully made" if (cur_batch_size == ideal_batch_size) else "only could make"} {cur_batch_size} distinct (female, male) pairs:'

    # 'header' and 'status' are indented with spaces in 'message'.
    # the 'dedent' function requires every line in string to be prefixed with identical whitespace.
    
    # thus, each pair in batch should be indented using spaces.

    tab = ' ' * 8
    batch_as_string = ''.join([('\n' + tab + str(pair)) for pair in batch])

    message = f"""
        {header}
        {status}
        {batch_as_string}
    """

    message = dedent(message)

    print(message)

    return (header, status, message)

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

def send(receiver, header, status, batch, plain_text_alternative):
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

            batch_as_html = ''.join([('<li>' + str(pair) + '</li>') for pair in batch])

            html = f"""
                <h1 style = 'font-size: 1.2rem'>{header}</h1>
                <em style = 'font-size: 1.1rem'>{status}</em>

                <ol style = 'font-size: 1rem'>
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