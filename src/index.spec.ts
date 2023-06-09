import { checkPasswordRequirements } from '.';

describe('Initial test', () => {
	describe('Special character', () => {
		it.each([
			{
				input: 'abcd',
				expected: '❌',
			},
			{
				input: 'abc123&',
				expected: '✅',
			},
			{
				input: '!',
				expected: '✅',
			},
		])(
			'should return $expected for the string "$input"',
			({ input, expected }) => {
				// Act
				const actual = checkPasswordRequirements(input);

				// Assert
				expect(actual).toContain(`Special character: ${expected}`);
			}
		);
	});

	describe('Upper case', () => {
		it.each([
			{
				input: 'Alsd',
				expected: '✅',
			},
			{
				input: 'alsd',
				expected: '❌',
			},
		])(
			'should return $expected for the string $input',
			({ input, expected }) => {
				// Act
				const actual = checkPasswordRequirements(input);

				// Assert
				expect(actual).toContain(`Uppercase character: ${expected}`);
			}
		);
	});

	describe('lower case', () => {
		it.each([
			{
				input: 'alsd',
				expected: '✅',
			},
			{
				input: 'A',
				expected: '❌',
			},
		])(
			'should return $expected for the string "$input"',
			({ input, expected }) => {
				// Act
				const actual = checkPasswordRequirements(input);

				// Assert
				expect(actual).toContain(`Lowercase character: ${expected}`);
			}
		);
	});

	describe('Length', () => {
		it.each([
			{
				input: 'aaaaaa',
				expected: '✅',
			},
			{
				input: 'aaaaaaaaaaaa',
				expected: '✅',
			},
			{
				input: 'A',
				expected: '❌',
			},
		])(
			'should return $expected for the string "$input"',
			({ input, expected }) => {
				// Act
				const actual = checkPasswordRequirements(input);

				// Assert
				expect(actual).toContain(`Length: ${expected}`);
			}
		);
	});

	describe('Multiple Rules', () => {
		it('should return ✅ for special char, upper and lower case rules and ❌ for the length when string "$Dv"', () => {
			// Arrange
			const input = '$Dv';

			// Act
			const actual = checkPasswordRequirements(input);

			// Assert
			expect(actual).toContain('Special character: ✅');
			expect(actual).toContain('Uppercase character: ✅');
			expect(actual).toContain('Lowercase character: ✅');
			expect(actual).toContain('Length: ❌');
		});

		it('should return ✅ for length, upper and lower case rules and ❌ for the special char when string "UBD3843v"', () => {
			// Arrange
			const input = 'UBD3843v';

			// Act
			const actual = checkPasswordRequirements(input);

			// Assert
			expect(actual).toContain('Special character: ❌');
			expect(actual).toContain('Uppercase character: ✅');
			expect(actual).toContain('Lowercase character: ✅');
			expect(actual).toContain('Length: ✅');
		});
	});

	describe('password strenght', () => {
		it.each([
			{
				input: 'UBD3843v',
				expected: '75%',
			},
			{
				input: 'U',
				expected: '25%',
			},
			{
				input: 'Uu',
				expected: '50%',
			},
			{
				input: 'Uu$fdsjkfhjifjds234',
				expected: '100%',
			},
		])(
			'should return "$expected" when input is "$input"',
			({ expected, input }) => {
				// Act
				const actual = checkPasswordRequirements(input);

				// Assert
				expect(actual).toContain(`Strength: ${expected}`);
			}
		);
	});
});
