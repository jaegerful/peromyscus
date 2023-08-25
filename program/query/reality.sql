SELECT 
    female.ID AS female_id,
    female.[Mating Number] AS mating_cage_of_female,
    male.ID AS male_id,
    male.[Mating Number] AS mating_cage_of_male
FROM Peromyscus AS male
INNER JOIN Peromyscus AS female
ON (
    male.[Mating Number] <> female.[Mating Number] AND
    male.ID IS NOT NULL AND
    female.ID IS NOT NULL AND
    male.stock = female.stock AND
    male.stock = ? AND
    male.sex = 'M' AND
    female.sex = 'F' AND
    DateDiff('d', male.birthday, Date()) <= 365 AND
    DateDiff('d', female.birthday, Date()) <= 365
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