/* the existing database does not have constraints. */

CREATE TABLE mice (
    id text,
    stock text,
    sex text,
    birthday text,
    "mating number" text
);

CREATE TABLE mating_cages (
    "mating number" text,
    stock text,
    sire text,
    dam text,
    "date of mating" text
);

/* this function is used to process erroneous birthday fields. */

CREATE FUNCTION try_date_cast(birthday text)
RETURNS date
LANGUAGE plpgsql
AS $$
	BEGIN
		RETURN birthday::date;
	EXCEPTION
		WHEN OTHERS THEN
			RETURN null;
	END;
$$;