enum Icon {
	Valid = '✅',
	Invalid = '❌',
}

type RuleMatch = {
	valid: boolean;
	rule: string;
};

const rules: { validator: (value: string) => boolean; rule: string }[] = [
	{
		validator: (value: string) =>
			/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value),
		rule: 'Special character',
	},
	{
		validator: (value: string) => /[A-Z]/.test(value),
		rule: 'Uppercase character',
	},
	{
		validator: (value: string) => /[a-z]/.test(value),
		rule: 'Lowercase character',
	},
	{
		validator: (value: string) => value.length >= 6,
		rule: 'Length',
	},
];

export const checkPasswordRequirements = (password: string) => {
	const rulesState: RuleMatch[] = rules.map(({ validator: isValid, rule }) => ({
		valid: isValid(password),
		rule,
	}));

	const formattedRules = formatRulesForLog(rulesState);
	const strenght = calculateStrengthAsPercentage(rulesState);

	return [...formattedRules, `Strength: ${strenght}`].join('\n');
};

const formatRulesForLog = (rules: RuleMatch[]) =>
	rules.map(
		({ valid, rule }) => `${rule}: ${valid ? Icon.Valid : Icon.Invalid}`
	);

const calculateStrengthAsPercentage = (rulesState: RuleMatch[]) => {
	const valid = rulesState.filter(({ valid }) => valid).length;
	const total = rulesState.length;

	const strength = valid / total;

	const strengthAsPercentage = Intl.NumberFormat(undefined, {
		maximumFractionDigits: 2,
		style: 'percent',
	}).format(strength);

	return strengthAsPercentage;
};
