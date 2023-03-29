""" test functions from 'parts.py'. """

import parts
import unittest
from unittest.mock import patch

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

