SELECT 
    female.ID AS female_id,
    female.[Mating Number] AS mating_cage_of_female,
    male.ID AS male_id,
    male.[Mating Number] AS mating_cage_of_male
FROM Peromyscus AS male
INNER JOIN Peromyscus AS female
ON (
    male.[Mating Number] <> female.[Mating Number] AND
    male.stock = female.stock AND
    male.stock = ? AND
    male.sex = 'M' AND
    female.sex = 'F' AND
    IIf(IsDate(male.birthday), 1, NULL) IS NOT NULL AND
    IIf(IsDate(female.birthday), 1, NULL) IS NOT NULL AND
    DateDiff('d', CDate(male.birthday), Date()) <= 365 AND
    DateDiff('d', CDate(female.birthday), Date()) <= 365
)
WHERE 
    NOT EXISTS (
        SELECT 1
        FROM [Mating Records] AS mating_cages
        WHERE male.ID = mating_cages.sire
    ) 
    AND
    NOT EXISTS (
        SELECT 1
        FROM [Mating Records] AS mating_cages
        WHERE female.ID = mating_cages.dam
    )
ORDER BY male.ID ASC;