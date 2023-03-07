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

/* query to generate mating pairs. generates zero results because 'mating_cages' is out of date. */

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

/* get mating cage for parents of 'x'. */

INNER JOIN mating_cages x_parents_mating_cage
ON (x."mating number" = x_parents_mating_cage."mating number")

/* get mating cage for grandparents of 'x' (father's side). */

INNER JOIN mice x_father
ON (x_father.id = x_parents_mating_cage.sire)
INNER JOIN mating_cages x_grandparents_fathers_side
ON (x_father."mating number" = x_grandparents_fathers_side."mating number")

/* get mating cage for grandparents of 'x' (mother's side). */

INNER JOIN mice x_mother
ON (x_mother.id = x_parents_mating_cage.dam)
INNER JOIN mating_cages x_grandparents_mothers_side
ON (x_mother."mating number" = x_grandparents_mothers_side."mating number")

/* get mating cage for parents of 'y'. */

INNER JOIN mating_cages y_parents_mating_cage
ON (y."mating number" = y_parents_mating_cage."mating number")

/* get mating cage for grandparents of 'y' (father's side). */

INNER JOIN mice y_father
ON (y_father.id = y_parents_mating_cage.sire)
INNER JOIN mating_cages y_grandparents_fathers_side
ON (y_father."mating number" = y_grandparents_fathers_side."mating number")

/* get mating cage for grandparents of 'y' (mother's side). */

INNER JOIN mice y_mother
ON (y_mother.id = y_parents_mating_cage.sire)
INNER JOIN mating_cages y_grandparents_mothers_side
ON (y_mother."mating number" = y_grandparents_mothers_side."mating number")
	
WHERE (

	/* parents should not be siblings. */

	x_grandparents_fathers_side != x_grandparents_mothers_side AND
	y_grandparents_fathers_side != y_grandparents_mothers_side AND

	/* pairs should not share grandparents. */

	x_grandparents_fathers_side != y_grandparents_fathers_side AND
	x_grandparents_fathers_side != y_grandparents_mothers_side AND
	x_grandparents_mothers_side != y_grandparents_fathers_side AND
	x_grandparents_mothers_side != y_grandparents_mothers_side
)

ORDER BY x.id ASC;