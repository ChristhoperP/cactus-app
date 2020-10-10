--Inserts en tipo usuario
INSERT INTO public.tipousuario(
	rol, fecha_inicio, estado)
	VALUES ('admin', current_date, 'activo');

INSERT INTO public.tipousuario(
rol, fecha_inicio, estado)
VALUES ('cliente', current_date, 'activo');