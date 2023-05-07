""" test functions from 'engine.py'. """

from unittest import mock, TestCase as base, main

import sys
sys.path.append('..') # 'tests' must be current working directory.

import helpers

import types
import importlib

class tests(base):

    """ test 'engine.assemble'. """

    def test_assemble(self):

        """ mock 'eel' and 'database.py'. """

        name = 'eel'
        module = types.ModuleType(name)
        sys.modules[name] = module
        module.expose = lambda x: x

        name = 'database'
        module = types.ModuleType(name)
        sys.modules[name] = module
            
        """ first subtest: if query has zero results, 'engine.assemble' returns empty batch. """

        module.cursor = helpers.cursor([])
        engine = helpers.import_engine()

        result = engine.assemble(None, 15)
        
        self.assertEqual(len(result['batch']), 0)

        """ second subtest: 'engine.assemble' does not use the same mate for multiple pairs in batch. """

        module.cursor = helpers.generate_cursor()
        engine = helpers.import_engine(engine)

        result = engine.assemble(None, 30)

        # verify each pair has unique mates.

        pairs_have_unique_mates = True
        mice = {}

        for pair in result['batch']:
            pair_has_non_unique_mate = pair['male_id'] in mice or pair['female_id'] in mice

            if pair_has_non_unique_mate:
                pairs_have_unique_mates = False
                break

            mice[pair['male_id']] = True
            mice[pair['female_id']] = True

        self.assertTrue(pairs_have_unique_mates)

        """ third subtest: if possible, 'engine.assemble' uses only pairs with unique parents. """

        module.cursor = helpers.generate_cursor()
        engine = helpers.import_engine(engine)

        result = engine.assemble(None, 2)

        # check 'unique_parents' is true.

        self.assertEqual(result['unique_parents'], True)

        # verify each pair truly has unique parents.

        mating_cages = {}

        for pair in result['batch']:            
            pair_has_unique_parents = pair['mating_cage_of_male'] not in mating_cages and pair['mating_cage_of_female'] not in mating_cages
            self.assertTrue(pair_has_unique_parents)

            mating_cages[pair['mating_cage_of_male']] = True
            mating_cages[pair['mating_cage_of_female']] = True


        """ fourth subtest: if needed, 'engine.assemble' includes pairs with non-unique parents. """

        module.cursor = helpers.generate_cursor()
        engine = helpers.import_engine(engine)

        result = engine.assemble(None, 4)

        # check 'unique_parents' is false.

        self.assertFalse(result['unique_parents'])

        # verify at least two pairs share a parent.

        at_least_two_pairs_share_parent = False
        mating_cages = {}

        for pair in result['batch']:
            pair_has_non_unique_parent = pair['mating_cage_of_male'] in mating_cages or pair['mating_cage_of_female'] in mating_cages

            if pair_has_non_unique_parent:
                at_least_two_pairs_share_parent = True
                break

            mating_cages[pair['mating_cage_of_male']] = True
            mating_cages[pair['mating_cage_of_female']] = True

        self.assertTrue(at_least_two_pairs_share_parent)

""" if 'python tests.py', run tests. """

if __name__ == '__main__':
    main()