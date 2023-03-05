/* query for candidate mating pairs. */

SELECT DISTINCT /* each pair should only be mentioned once. */
	x.id AS "male id", 
	y.id AS "female id", 
	(age(x.birthday::date) <= interval '1 year') AND (age(y.birthday::date) <= interval '1 year') AS "within last year", 
	x.sex != y.sex AS "different sex", 
	x.stock = y.stock AS "same stock"
FROM mice x 
INNER JOIN mice y 
ON (x."mating number" != y."mating number") /* both mice from different mating cages. */
WHERE 
	
	/* mice not already used in existing mating cages. */
	
	x.id NOT IN (
		SELECT sire
		FROM mating_cages
		WHERE sire IS NOT null /* check does not work if subquery has 'null'. */
	) AND
	
	x.id NOT IN (
		SELECT dam
		FROM mating_cages
		WHERE dam IS NOT null
	) AND
	
	y.id NOT IN (
		SELECT sire
		FROM mating_cages
		WHERE sire IS NOT null
	) AND
	
	y.id NOT IN (
		SELECT dam
		FROM mating_cages
		WHERE dam IS NOT null
	) AND
	
	/* both mice from same stock. */
	
	x.stock = y.stock AND
	
	/* both mice of different sex. */
	x.sex = 'M' AND
	y.sex = 'F' AND
	
	/* birthday of both mice within last year. */
	
	try_date_cast(x.birthday) IS NOT null AND 
	try_date_cast(y.birthday) IS NOT null AND
	try_date_cast(x.birthday) >= (now() - interval '1 year')::date AND 
	try_date_cast(y.birthday) >= (now() - interval '1 year')::date AND

	/* mice do not share grandparents. */

	

	/* get mating cages for female's grandparents. */

	SELECT "mating number"
	FROM mice
	WHERE id = (
		SELECT sire
		FROM mating_cages
		WHERE "mating number" = y."mating number"
	) OR id = (
		SELECT dam
		FROM mating_cages
		WHERE "mating number" = y."mating number"
	)
	
ORDER BY x.id ASC;