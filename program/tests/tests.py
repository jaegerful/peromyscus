""" test functions from 'parts.py'. """

import unittest
from unittest.mock import patch

import sys
sys.path.append('..') # 'tests' must be current working directory.

import helpers
import parts

class tests(unittest.TestCase):

    """ test 'parts.parameters'. """

    def test_parameters(self):

        # 'parts.parameters' works with perfect input.

        with patch('builtins.input', side_effect=['PD', '70']):
            result = parts.parameters()
            self.assertEqual(result, ('PD', 70))

        # 'parts.parameters' trims batch name.

        with patch('builtins.input', side_effect=['   SMLNJ   ', '30']):
            result = parts.parameters()
            self.assertEqual(result, ('SMLNJ', 30))

        # 'parts.parameters' ensures a natural number is provided for batch size.

        with patch('builtins.input', side_effect = ['BW', 'this is a string.', '50']):
            result = parts.parameters()
            self.assertEqual(result, ('BW', 50))

        with patch('builtins.input', side_effect = ['XY', '-1', '25']):
            result = parts.parameters()
            self.assertEqual(result, ('XY', 25))

        with patch('builtins.input', side_effect = ['AB', '0', '10']):
            result = parts.parameters()
            self.assertEqual(result, ('AB', 10))

    """ test 'parts.address'. """

    def test_address(self):

        # 'parts.address' works with perfect input.

        with patch('builtins.input', side_effect = ['bob_folklord@gmail.com', 'y']):
            result = parts.address()
            self.assertEqual(result, 'bob_folklord@gmail.com')

        # 'parts.address' trims email address.

        with patch('builtins.input', side_effect = ['   julius_caesar@gmail.com  ', 'y']):
            result = parts.address()
            self.assertEqual(result, 'julius_caesar@gmail.com')

        # 'parts.address' permits retries.

        with patch('builtins.input', side_effect = ['mango@yes.com', 'n', 'tortilla@no.com', 'n', 'alexander_the_great@maybe.com', 'y']):
            result = parts.address()
            self.assertEqual(result, 'alexander_the_great@maybe.com')

    """ test 'parts.assemble'. """

    def test_assemble(self):
        
        """ first subtest: if query has zero results, 'parts.assemble' returns empty batch. """

        cursor = helpers.cursor([])
        batch, cur_batch_size, _ = parts.assemble(cursor, 15)
        
        self.assertEqual(len(batch), 0)
        self.assertEqual(cur_batch_size, 0)

        """ second subtest: 'parts.assemble' does not use the same mate for multiple pairs in batch. """

        cursor = helpers.generate_cursor()
        batch, _, _ = parts.assemble(cursor, 30)

        # verify each pair has unique mates.

        pairs_have_unique_mates = True
        mice = {}

        for pair in batch:
            pair_has_non_unique_mate = pair.male_id in mice or pair.female_id in mice

            if pair_has_non_unique_mate:
                pairs_have_unique_mates = False
                break

            mice[pair.male_id] = True
            mice[pair.female_id] = True

        self.assertTrue(pairs_have_unique_mates)

        """ second subtest: if possible, 'parts.assemble' uses only pairs with unique parents. """

        cursor = helpers.generate_cursor()
        batch, cur_batch_size, pairs_have_unique_parents = parts.assemble(cursor, 2)

        # check 'pairs_have_unique_parents' is true.

        self.assertEqual(pairs_have_unique_parents, True)

        # verify each pair truly has unique parents.

        mating_cages = {}

        for pair in batch:            
            pair_has_unique_parents = pair.mating_cage_of_male not in mating_cages and pair.mating_cage_of_female not in mating_cages
            self.assertTrue(pair_has_unique_parents)

            mating_cages[pair.mating_cage_of_male] = True
            mating_cages[pair.mating_cage_of_female] = True

        """ third subtest: if needed, 'parts.assemble' includes pairs with non-unique parents. """

        cursor = helpers.generate_cursor()
        batch, cur_batch_size, pairs_have_unique_parents = parts.assemble(cursor, 4)

        # check 'pairs_have_unique_parents' is false.

        self.assertFalse(pairs_have_unique_parents)

        # verify at least two pairs share a parent.

        at_least_two_pairs_share_parent = False
        mating_cages = {}

        for pair in batch:
            pair_has_non_unique_parent = pair.mating_cage_of_male in mating_cages or pair.mating_cage_of_female in mating_cages

            if pair_has_non_unique_parent:
                at_least_two_pairs_share_parent = True
                break

            mating_cages[pair.mating_cage_of_male] = True
            mating_cages[pair.mating_cage_of_female] = True

        self.assertTrue(at_least_two_pairs_share_parent)


        