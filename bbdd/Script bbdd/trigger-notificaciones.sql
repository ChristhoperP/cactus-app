-- ELIMINACION DE PROMOCIONES ====================================

CREATE OR REPLACE FUNCTION public.notify_deleted_promo()
    RETURNS trigger
    LANGUAGE plpgsql
AS $function$
BEGIN
    PERFORM pg_notify('deleted_promo', row_to_json(OLD)::text);
    RETURN NULL;
END;
$function$;

CREATE TRIGGER deleted_promo_trigger AFTER DELETE ON promocion
FOR EACH ROW EXECUTE PROCEDURE notify_deleted_promo();