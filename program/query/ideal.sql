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

/* get mating cage for parents of 'm'. */

INNER JOIN mating_cages m_parents_mating_cage
ON (m."mating number" = m_parents_mating_cage."mating number")

/* get mating cage for grandparents of 'm' (father's side). */

INNER JOIN mice m_father
ON (m_father.id = m_parents_mating_cage.sire)
INNER JOIN mating_cages m_grandparents_fathers_side
ON (m_father."mating number" = m_grandparents_fathers_side."mating number")

/* get mating cage for grandparents of 'm' (mother's side). */

INNER JOIN mice m_mother
ON (m_mother.id = m_parents_mating_cage.dam)
INNER JOIN mating_cages m_grandparents_mothers_side
ON (m_mother."mating number" = m_grandparents_mothers_side."mating number")

/* get mating cage for parents of 'f'. */

INNER JOIN mating_cages f_parents_mating_cage
ON (f."mating number" = f_parents_mating_cage."mating number")

/* get mating cage for grandparents of 'f' (father's side). */

INNER JOIN mice f_father
ON (f_father.id = f_parents_mating_cage.sire)
INNER JOIN mating_cages f_grandparents_fathers_side
ON (f_father."mating number" = f_grandparents_fathers_side."mating number")

/* get mating cage for grandparents of 'f' (mother's side). */

INNER JOIN mice f_mother
ON (f_mother.id = f_parents_mating_cage.sire)
INNER JOIN mating_cages f_grandparents_mothers_side
ON (f_mother."mating number" = f_grandparents_mothers_side."mating number")
	
WHERE (

	/* parents should not be siblings. */

	m_grandparents_fathers_side."mating number" != m_grandparents_mothers_side."mating number" AND
	f_grandparents_fathers_side."mating number" != f_grandparents_mothers_side."mating number" AND

	/* pairs should not share grandparents. */

	m_grandparents_fathers_side."mating number" != f_grandparents_fathers_side."mating number" AND
	m_grandparents_fathers_side."mating number" != f_grandparents_mothers_side."mating number" AND
	m_grandparents_mothers_side."mating number" != f_grandparents_fathers_side."mating number" AND
	m_grandparents_mothers_side."mating number" != f_grandparents_mothers_side."mating number"
)

ORDER BY m.id ASC;