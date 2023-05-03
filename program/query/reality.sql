SELECT f.id AS female_id, f.[mating number] AS mating_cage_of_female, m.id AS male_id, m.[mating number] AS mating_cage_of_male
FROM mice AS m 
INNER JOIN mice AS f ON (m.[mating number] <> f.[mating number] 
AND m.stock = f.stock
AND m.stock = ?
AND m.sex = 'M'
AND f.sex = 'F'
AND IIf(IsDate(m.birthday), CDate(m.birthday), NULL) IS NOT NULL
AND IIf(IsDate(f.birthday), CDate(f.birthday), NULL) IS NOT NULL
AND DateDiff('d', m.birthday, Date()) <= 365 
AND DateDiff('d', f.birthday,Date()) <= 365
)
WHERE NOT EXISTS (
  SELECT 1
  FROM mating_cages AS mc
  WHERE m.id = mc.sire
) AND NOT EXISTS (
  SELECT 1
  FROM mating_cages AS mc2
  WHERE f.id = mc2.dam
)
ORDER BY m.id ASC
;