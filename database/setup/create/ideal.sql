/* first step: */
/* create tables. then replete them with sql files. */

CREATE TABLE mice (
    id serial PRIMARY KEY, /* can be separated from stock? */
    sex char(1) NOT NULL,
    birthday timestamp with time zone NOT NULL,
    mating_number integer
);

CREATE FUNCTION hetero(sire integer, dam integer)
RETURNS boolean
LANGUAGE plpgsql
AS
$$
    DECLARE
        supposed_to_be_male char(1);
        supposed_to_be_female char(1);
    BEGIN
        SELECT sex 
        INTO supposed_to_be_male
        FROM mice
        WHERE id = sire;
        
        SELECT sex 
        INTO supposed_to_be_female
        FROM mice
        WHERE id = dam;

        RETURN supposed_to_be_male = 'M' AND supposed_to_be_female = 'F';
    END;
$$;

/* to-do: define function 'same_stock(sire, dam)'. */

CREATE TABLE mating_cages (
    mating_number serial PRIMARY KEY,
    stock text NOT NULL,
    sire integer,
    dam integer,
    date_established timestamp with time zone NOT NULL
);

/* second step: null highlights potential errors. */

/* a. some entries in 'mice' refer to non-existent 'mating-cages'. set these cells to null. */

UPDATE mice
SET mating_number = NULL
WHERE mating_number NOT IN (
    SELECT mating_number
    FROM mating_cages
);

/* add constraint to prevent similar errors. */

ALTER TABLE mice
ADD FOREIGN KEY (mating_number) REFERENCES mating_cages(mating_number);

/* b. some entries in 'mating_cages' refer to non-existent 'mice'. set these cells to null. */

UPDATE mating_cages
SET sire = NULL
WHERE sire NOT IN (
    SELECT id
    FROM mice
);

UPDATE mating_cages
SET dam = NULL
WHERE dam NOT IN (
    SELECT id
    FROM mice
);

/* add constraint to prevent similar errors. */

ALTER TABLE mating_cages
ADD FOREIGN KEY (sire) REFERENCES mice(id);

ALTER TABLE mating_cages
ADD FOREIGN KEY (dam) REFERENCES mice(id);

/* c. some entries in 'mating_cages' refer to 'mice' of the same sex. set these cells to null. */

UPDATE mating_cages
SET sire = NULL, dam = NULL
WHERE hetero(sire, dam) = false;

/* add constraint to prevent similar errors. */

ALTER TABLE mating_cages
ADD CHECK(hetero(sire, dam));