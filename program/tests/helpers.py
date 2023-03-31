""" helpers to test 'parts.assemble'. """

# mock rows from query.

class pair:
    def __init__(self, male_id, mating_cage_of_male, female_id, mating_cage_of_female):
        self.male_id = male_id
        self.mating_cage_of_male = mating_cage_of_male
        self.female_id = female_id
        self.mating_cage_of_female = mating_cage_of_female

# mock cursors.

class cursor:
    def __init__(self, pairs):
        self.pairs = pairs

    def fetchone(self):
        if len(self.pairs) == 0:
            return None
        
        return self.pairs.pop()

# generate cursor for mock query.

def generate_cursor():

    # data for mock query.

    mice = [
        {
            'id': 1,
            'sex': 'm',
            'mating_cage': 'a'
        },
        {
            'id': 2,
            'sex': 'm',
            'mating_cage': 'a'
        },
        {
            'id': 3,
            'sex': 'f',
            'mating_cage': 'b'
        },
        {
            'id': 4,
            'sex': 'f',
            'mating_cage': 'b'
        },
        {
            'id': 5,
            'sex': 'm',
            'mating_cage': 'b'
        },
        {
            'id': 6,
            'sex': 'f',
            'mating_cage': 'c'
        },
        {
            'id': 7,
            'sex': 'f',
            'mating_cage': 'd'
        },
        {
            'id': 8,
            'sex': 'm',
            'mating_cage': 'd'
        },
        {
            'id': 9,
            'sex': 'm',
            'mating_cage': 'e'
        }
    ]

    # query for all possible non-sibling male-and-female pairs.

    pairs = []

    for current_mouse in mice:

        # 'current_mouse' must be male.

        if current_mouse['sex'] != 'm': # prevents double insertions of same pair.
            continue

        for candidate_mouse in mice:
            
            # if mice are siblings.

            if current_mouse['mating_cage'] == candidate_mouse['mating_cage']:
                continue

            # if 'candidate_mouse' female, pair is valid.

            if candidate_mouse['sex'] == 'f':
                element = pair(current_mouse['id'], current_mouse['mating_cage'], candidate_mouse['id'], candidate_mouse['mating_cage'])
                pairs.append(element)
    
    # return cursor for results from query.

    return cursor(pairs)