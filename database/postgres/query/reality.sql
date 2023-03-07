/* labelled subquery for all sires and dams in 'mating_cages'. */

WITH sires_and_dams AS (
	SELECT sire
	FROM mating_cages
	WHERE sire IS NOT null /* check does not work if subquery has 'null'. */

	UNION

	SELECT dam
	FROM mating_cages
	WHERE dam IS NOT null
)

/* query to generate mating pairs. */

SELECT DISTINCT ON (x.id) /* each pair should only be mentioned once. */
	x.id AS "male id", 
	y.id AS "female id", 
	(age(x.birthday::date) <= interval '1 year') AND (age(y.birthday::date) <= interval '1 year') AS "within last year", 
	x.sex != y.sex AS "different sex", 
	x.stock = y.stock AS "same stock"
FROM mice x 
INNER JOIN mice y 
ON (
	/* mice do not share parents. */

	x."mating number" != y."mating number" AND

	/* mice from same stock. */
	
	x.stock = y.stock AND
	
	/* mice of different sex. */
	
	x.sex = 'M' AND
	y.sex = 'F' AND

	/* mice born within last year. */
	
	try_date_cast(x.birthday) IS NOT null AND 
	try_date_cast(y.birthday) IS NOT null AND
	try_date_cast(x.birthday) >= (now() - interval '1 year')::date AND 
	try_date_cast(y.birthday) >= (now() - interval '1 year')::date AND

	/* mice not already used in existing mating cages. */
	
	x.id NOT IN (
		SELECT *
		FROM sires_and_dams
	) AND

	y.id NOT IN (
		SELECT *
		FROM sires_and_dams
	)
)

ORDER BY x.id ASC;