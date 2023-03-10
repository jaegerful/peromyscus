/* subquery that returns all sires and dams in 'mating_cages'. */

WITH sires_and_dams AS (
	SELECT sire
	FROM mating_cages
	WHERE sire IS NOT null /* check does not work if subquery has 'null'. */

	UNION

	SELECT dam
	FROM mating_cages
	WHERE dam IS NOT null
)

/* generate every valid mating pair in a given stock. */
/* males and females may appear in more than one pair. */

SELECT
	m.id AS "male_id", 
	f.id AS "female_id"
FROM mice m 
INNER JOIN mice f 
ON (
	/* mice do not share parents. */

	m."mating number" != f."mating number" AND

	/* mice from same stock. */
	
	m.stock = ? AND
	m.stock = f.stock AND
	
	/* mice of different sex. */
	
	m.sex = 'M' AND
	f.sex = 'F' AND

	/* mice born within last year. */
	
	try_date_cast(m.birthday) IS NOT null AND 
	try_date_cast(f.birthday) IS NOT null AND
	m.birthday::date >= (now() - interval '1 year')::date AND 
	f.birthday::date >= (now() - interval '1 year')::date AND

	/* mice not already used in existing mating cages. */
	
	m.id NOT IN (
		SELECT *
		FROM sires_and_dams
	) AND

	f.id NOT IN (
		SELECT *
		FROM sires_and_dams
	)
)

ORDER BY m.id ASC;